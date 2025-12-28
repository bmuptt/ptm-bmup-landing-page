<template>
  <div class="hero-3d-container">
    <ClientOnly>
      <TresCanvas clear-color="#F5F5F5" shadows alpha @loop="onCanvasLoop">
        <TresPerspectiveCamera
          :position="[0, 0, 4]"
          :fov="45"
          :look-at="[0, 0, 0]"
        />
        
        <TresAmbientLight :intensity="0.8" />
        <TresDirectionalLight
          :position="[2, 2, 4]"
          :intensity="1.2"
          cast-shadow
        />

        <TresMesh ref="sphereRef">
          <TresSphereGeometry :args="[1.2, 64, 64]" />
          <TresMeshStandardMaterial
            color="#FFFFFF"
            :roughness="0.3"
            :metalness="0.0"
            :map="ballTexture"
          />
        </TresMesh>
      </TresCanvas>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { shallowRef, onMounted } from 'vue'
import { CanvasTexture, SRGBColorSpace, ClampToEdgeWrapping, type Texture, type Object3D } from 'three'

const sphereRef = shallowRef<Object3D | null>(null)
const ballTexture = shallowRef<Texture | null>(null)

function onCanvasLoop({ elapsed }: { elapsed: number }) {
  if (sphereRef.value) {
    const base = 0.1
    const amp = 0.28
    const speed = 1.8
    const s = Math.abs(Math.sin(elapsed * speed))
    const y = base + amp * s
    sphereRef.value.position.y = y
    const near = y - base < 0.03
    if (near) {
      const t = 1 - (y - base) / 0.03
      const sx = 1 + 0.008 * t
      const sy = 1 - 0.012 * t
      sphereRef.value.scale.set(sx, sy, sx)
    } else {
      sphereRef.value.scale.set(1, 1, 1)
    }
    sphereRef.value.rotation.y = elapsed * 0.6
    sphereRef.value.rotation.x = Math.sin(elapsed * 0.2) * 0.1
  }
}

function drawStar(ctx: CanvasRenderingContext2D, cx: number, cy: number, spikes: number, outerRadius: number, innerRadius: number, color: string) {
  let rot = Math.PI / 2 * 3
  let x = cx
  let y = cy
  const step = Math.PI / spikes
  ctx.beginPath()
  ctx.moveTo(cx, cy - outerRadius)
  for (let i = 0; i < spikes; i++) {
    x = cx + Math.cos(rot) * outerRadius
    y = cy + Math.sin(rot) * outerRadius
    ctx.lineTo(x, y)
    rot += step
    x = cx + Math.cos(rot) * innerRadius
    y = cy + Math.sin(rot) * innerRadius
    ctx.lineTo(x, y)
    rot += step
  }
  ctx.lineTo(cx, cy - outerRadius)
  ctx.closePath()
  ctx.fillStyle = color
  ctx.fill()
}

function createBallTexture(): CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = 1024
  canvas.height = 512
  const ctx = canvas.getContext('2d')!

  ctx.fillStyle = '#FFFFFF'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  ctx.strokeStyle = 'rgba(0,0,0,0.06)'
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(0, canvas.height / 2)
  ctx.lineTo(canvas.width, canvas.height / 2)
  ctx.stroke()

  function drawLabel(centerX: number, centerY: number) {
    const starSpacing = 42
    const baseX = centerX - starSpacing
    for (let i = 0; i < 3; i++) {
      drawStar(ctx, baseX + i * starSpacing, centerY - 60, 5, 16, 7, '#E53935')
    }
    ctx.fillStyle = '#D32F2F'
    ctx.font = 'bold 64px system-ui, -apple-system, Segoe UI, Roboto'
    ctx.textAlign = 'center'
    ctx.fillText('BMUP', centerX, centerY)
    ctx.fillStyle = '#333333'
    ctx.font = 'bold 28px system-ui, -apple-system, Segoe UI, Roboto'
    ctx.fillText('3-STAR 40+', centerX, centerY + 40)
  }

  drawLabel(canvas.width * 0.25, canvas.height * 0.5)
  drawLabel(canvas.width * 0.75, canvas.height * 0.5)

  const texture = new CanvasTexture(canvas)
  texture.colorSpace = SRGBColorSpace
  texture.wrapS = ClampToEdgeWrapping
  texture.wrapT = ClampToEdgeWrapping
  texture.needsUpdate = true
  return texture
}

onMounted(() => {
  ballTexture.value = createBallTexture()
})
</script>

<style scoped>
.hero-3d-container {
  width: 100%;
  height: 400px;
  position: relative;
}

@media (max-width: 600px) {
  .hero-3d-container {
    height: 300px;
  }
}
</style>
