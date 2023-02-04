<template>
  <div class="w-full h-full">
    <div class="w-full h-full z-10 absolute">
      <musicimg></musicimg>
    </div>

    <div class="w-full h-full z-20 absolute">

      <div class="w-full h-5/6  float-left 2xl:w-2/6 xl:w-2/6 lg:w-full md:w-full sm:w-full 2xl:h-5/6 xl:h-5/6 xl:h-5/6 lg:h-5/6 md:h-5/6 sm:h-5/6 absolute z-50">
        <musicname></musicname>
      </div>


      <div class="w-full h-5/6 float-left block relative  absolute z-40">
        <singergeci></singergeci>
      </div>

      <div class="w-full h-1/6 float-left 2xl:w-full xl:w-full lg:w-full md:w-full sm:w-full">
        <audioplay></audioplay>
      </div>

    </div>

  </div>
</template>

<script>
import music from "@/musicimg.vue";
import musicname from "@/musicname.vue";
import audioplay from "@/audioplay.vue";
import singergeci from "@/singergeci.vue";

export default {
  name: 'app',
  components: {
    musicimg: music,
    musicname,
    audioplay,
    singergeci
  }
}
</script>
