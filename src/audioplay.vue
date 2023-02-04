<template>
  <div class="w-full h-full">
    <audio id="audioctrl" :src="audio"></audio>
    <div class="w-full h-1/2  flex justify-center items-center float-left 2xl:w-full xl:w-full lg:w-full md:w-full sm:w-full">
      <ul id="alltof" class="wrapper">
        <li  id="start" @click="clickstart" class="icon twitter">
          <span class="tooltip">播放</span>
          <span><i class="fab fa-twitter"></i></span>
        </li>
        <li id="stop" @click="clickstop" class="icon instagram">
          <span class="tooltip">暂停</span>
          <span><i class="fab fa-instagram"></i></span>
        </li>
      </ul>
    </div>


    <div class="w-full h-1/2  float-left block  flex justify-center">
      <div class="w-2/12  h-full float-left flex items-center justify-start 2xl:justify-center xl:justify-center lg:justify-start md:justify-start sm:justify-start ">
        <span v-model="nowtime" id="nowmusictime"></span>
      </div>

      <div class="w-8/12 h-full float-left flex items-center">
        <div id="centerdiv" class="h-1/6 flex justify-center bg-white rounded-2xl"></div>
      </div>

      <div class="w-2/12 h-full float-left flex items-center justify-end 2xl:justify-center xl:justify-center lg:justify-end md:justify-end sm:justify-end ">
        <span id="musictime"></span>
      </div>
    </div>

  </div>
</template>

<script>
// <audio id="audioctrl" :src="audio" controls="controls"></audio>
// <button @click="start" id="start">播放</button>
// <button @click="stop" id="stop">暂停</button>
export default {
  name: "audioplay",
  data() {
    return {
      playid: '',
      songplayurl: '',
      audio: '',
      tof: '',
      musictime: '',
      number: 1,
      nowtime: '',
      buttontof: false
    }
  },
  methods: {
    start() {
      this.tof = true;
      this.$bus.$emit('tof', this.tof);
      console.log(this.tof, 'tof')
    },
    stop() {
      this.tof = false;
      this.$bus.$emit('tof', this.tof);
    },
    clickstart() {
      this.tof = true;
      this.$bus.$emit('tof', this.tof);
      console.log(this.tof, 'tof')
      this.buttontof = true;
      this.$bus.$emit('buttontof', this.buttontof);
      setInterval(()=>{
        this.$bus.$emit('nowtime', this.nowtime);
      })
    },
    clickstop() {
      this.tof = false;
      this.$bus.$emit('tof', this.tof);
      this.buttontof = false;
      this.$bus.$emit('buttontof', this.buttontof);
      this.$bus.$emit('nowtime', this.nowtime);
    }
  },
  mounted() {
    this.$bus.$on('getsongsimg', (data) => {
      this.playid = data.id
    })
    this.$bus.$on('getsongurl', (data) => {
      this.songplayurl = data;
    })
    this.$bus.$on('musicplayomtioin', (data) => {
      console.log(data)
      //转化为字符串
      this.audio = data;
    })
  },
  beforeUpdate() {
    let audio = document.getElementById('audioctrl');
    let start = document.getElementById('start');
    let stop = document.getElementById('stop');
    let musictime = document.getElementById('musictime');
    let centerdiv = document.getElementById('centerdiv');
    let nowmusictime = document.getElementById('nowmusictime');
    let outime = this.nowtime;
    // console.log('musicimg的this', this)
    start.onclick = function () {
      audio.play();
    }
    stop.onclick = function () {
      audio.pause();
    }
    audio.onloadedmetadata = () => {
      let musictime1 = Math.floor(audio.duration / 60);
      let musictime2 = Math.floor(audio.duration % 60);
      musictime.innerText = `${String(musictime1).padStart(2, "0")}:${String(musictime2).padStart(2, "0")}`;
    }
    audio.ontimeupdate = () => {
      let nowmusictime1 = Math.floor(audio.currentTime / 60);
      let nowmusictime2 = Math.floor(audio.currentTime % 60);
      let uptime = `${String(nowmusictime1).padStart(2, "0")}:${String(nowmusictime2).padStart(2, "0")}`
      nowmusictime.innerText = uptime;
      centerdiv.style.width = `${audio.currentTime / audio.duration * 100}%`;
      this.nowtime = uptime;
    }
  }

}


</script>

<style scoped>
.wrapper {
  display: inline-flex;
  list-style: none;
  height: 120px;
  width: 100%;
  padding-top: 40px;
  font-family: "Poppins", sans-serif;
  justify-content: center;
}

.wrapper .icon {
  position: relative;
  background: #fff;
  border-radius: 50%;
  margin: 10px;
  width: 50px;
  height: 50px;
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.wrapper .tooltip {
  position: absolute;
  top: 0;
  font-size: 14px;
  background: #fff;
  color: #fff;
  padding: 5px 8px;
  border-radius: 5px;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
  opacity: 0;
  pointer-events: none;
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.wrapper .tooltip::before {
  position: absolute;
  content: "";
  height: 8px;
  width: 8px;
  background: #fff;
  bottom: -3px;
  left: 50%;
  transform: translate(-50%) rotate(45deg);
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.wrapper .icon:hover .tooltip {
  top: -45px;
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
}

.wrapper .icon:hover span,
.wrapper .icon:hover .tooltip {
  text-shadow: 0px -1px 0px rgba(0, 0, 0, 0.1);
}

.wrapper .facebook:hover,
.wrapper .facebook:hover .tooltip,
.wrapper .facebook:hover .tooltip::before {
  background: #1877F2;
  color: #fff;
}

.wrapper .twitter:hover,
.wrapper .twitter:hover .tooltip,
.wrapper .twitter:hover .tooltip::before {
  background: #1DA1F2;
  color: #fff;
}

.wrapper .instagram:hover,
.wrapper .instagram:hover .tooltip,
.wrapper .instagram:hover .tooltip::before {
  background: #E4405F;
  color: #fff;
}


</style>