<template>
<div class="bar">
  <button @click="modeTo0">战况</button>
  <button @click="modeTo1">涂色</button>
  <button >设置</button>
</div>
</template>

<script setup>
import { toRefs, defineProps, defineEmits } from 'vue';
let props = defineProps({
  mode: {
    type: Number,

  },
})
let { mode } = toRefs(props);
console.log(mode.value);

let emit = defineEmits(['changeMode'])
let modeTo0 = () => {
  emit("changeMode",0)
}
let modeTo1 = () => {
  emit("changeMode",1)
}




</script>

<style scoped>
.bar {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 0px;
  width: 100%;
  height: 60px;
  background-color: blanchedalmond;
}
</style>