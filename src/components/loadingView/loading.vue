<template>
  <div class="loading">
    <img src="../../assets/iamge/loading.png" />
  </div>
</template>

<script>
console.log(process.env.VUE_APP_MODE);

</script>

<style scoped>
.loading {
  background-color: rgb(255, 255, 255);
  width: 60vmin;
  height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

img {
  width: 100%;
}

</style>