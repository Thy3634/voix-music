<template>
  <canvas ref="wave"></canvas>
</template>
<script lang='ts'>
import { computed, defineComponent, onMounted, Ref, ref } from "vue";
import { usePlayerStore } from "~/stores/player";
import { useSettingStore } from "~/stores/setting";

export default defineComponent({
  name: "Wave",
  mounted() {
    const setting = useSettingStore()
    const strokeColor = computed(() => setting.scheme == "light" ? '0,0,0' : '255, 255, 255')
    const player = usePlayerStore()
    const canvas = this.$refs.wave as HTMLCanvasElement
    canvas.height = screen.height / 6
    canvas.width = screen.width
    const ctx = canvas.getContext('2d')!
    const frequencyData = new Uint8Array(player.als.frequencyBinCount / 8)
    ctx.lineWidth = canvas.width / frequencyData.length * 1.5
    ctx.lineCap = "round"
    const renderFrame = () => {
      requestAnimationFrame(renderFrame)
      player.als.getByteFrequencyData(frequencyData)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (let i = 0; i < frequencyData.length; i++) {
        const frequency = frequencyData[i]
        const height = frequency * canvas.height / 256
        ctx.beginPath()
        ctx.strokeStyle = `rgba(${strokeColor.value}, ${frequency / 128})`
        ctx.moveTo(2 * ctx.lineWidth * (i + 1), canvas.height)
        ctx.lineTo(2 * ctx.lineWidth * (i + 1), height)
        ctx.stroke()
      }
    }
    renderFrame()
  }
});
</script>
<style scoped>
</style>