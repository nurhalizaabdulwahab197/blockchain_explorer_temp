<script>
export default {
  name: 'LoadingPage' // optional: specify the component name
}
</script>
<template><span class="loader"></span></template>

<style scoped>
.loader {
  position: absolute;
  top: 40%;
  left: 50%;
  display: inline-block;
  width: 48px;
  height: 48px;
  border: 5px solid #fff;
  border-bottom-color: transparent;
  border-radius: 50%;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
