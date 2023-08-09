<template>
  <div class="img-demo">
    <input type="file" @change="fileChange"/>
    <img :src="imgSrc" style="width: 200px; height: 200px;">
  </div>
</template>

<script setup>
import {ref} from "vue";

let imgSrc = ref('')
function fileChange(e) {
  var reader = new FileReader()
  reader.readAsDataURL(e.target?.files[0])
  reader.onload = function (e) {
    console.log(e, 'ssss')
    imgSrc.value = e.target.result
  }
}
</script>

<style scoped>

</style>
