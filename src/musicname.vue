<template>
    <div id="bigbox" class="w-full h-full">
      <div class="w-full h-1/6  flex justify-center items-center">
        <input v-model="songname"  @keydown.enter="httpgetname" type="text" name="text" class="input text-xl text-black w-3/6 h-2/6 rounded-2xl " placeholder="搜索你想听的歌">
      </div>

      <div class="w-full h-5/6  overflow-y-scroll">
          <ul class="w-full h-full">
            <li v-for="(a,b) in songsnames" :key="songsnames.id" class="w-full h-1/6 ">
              <div class="w-full h-full">
                <div class="w-1/3 h-full  flex justify-center items-center float-left">
                  <span  class="truncate">{{a.name}}</span>
                </div>
                <div class="w-1/3 h-full  flex justify-center items-center float-left">
                  <span v-for="artist in a.ar" class="truncate">{{a.ar.map(artist => artist.name).join('/')}}</span>
                </div>
                <div @click="getsongurl" class="w-full h-full ">
                <div @click="getsongsid(a);" class="w-1/3 h-full  flex justify-center items-center ">
                  <div  @click="" class="loader w-full h-full flex justify-center">
                    <span @click="getsongurl" class="bar"></span>
                    <span @click="getsongurl" class="bar"></span>
                    <span @click="getsongurl" class="bar"></span>
                  </div>
                </div>
              </div>
              </div>
            </li>
          </ul>
    </div>
  </div>
</template>

<script>
import {mixin} from "../mixin";
import {data} from "autoprefixer";

export default {
  name: "musicname",
  data() {
    return {
      songname: '',
      songsnames: '',
      songsid:'',
      songplayurl:'',
      hiddentof:false,
    }
  },
  methods: {
    httpgetname() {
      if (this.songname === '') {
        return
      }
      let httpimg = new XMLHttpRequest();
      httpimg.open('GET', `${this.songname}`, true);
      httpimg.setRequestHeader("Content-type", "application/json");
      httpimg.send();
      httpimg.onreadystatechange = () => {
        if (httpimg.readyState === 4 && httpimg.status === 200) {
          let imgsrc = JSON.parse(httpimg.responseText);
          console.log(imgsrc)
          this.songsnames = imgsrc.result.songs;
        }
      }
    },
    getsongsid(a) {
      this.$bus.$emit('getsongsimg', a);
      this.songsid = a.id;
      console.log(a);
    },
    getsongurl() {
      let songurl = new XMLHttpRequest();
      songurl.open('GET', `${this.songsid}`,true);
      songurl.setRequestHeader("Content-type", "application/json");
      songurl.send();
      songurl.onreadystatechange = () => {
        if (songurl.readyState === 4 && songurl.status === 200) {
          let songurls = JSON.parse(songurl.responseText);
          this.songplayurl = songurls.data[0].url;
          this.$bus.$emit('getsongurl', this.songplayurl);
          this.$bus.$emit('getsongurl', this.songplayurl);
          this.$bus.$emit('musicplayomtioin', this.songplayurl);
        }
      }
    },

  },
  mounted() {
    this.$bus.$on('buttontof', (data) => {
      this.hiddentof = data;
      console.log(data,'button')
      if (data===true)
      {
        let bigbox = document.getElementById('bigbox');
        bigbox.style.opacity = '0';
      }
      else {
        let bigbox = document.getElementById('bigbox');
        bigbox.style.opacity = '1';
      }
    })
  }

}
</script>
<style scoped>
.input {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  font-weight: 500;
  box-shadow: 0 0 .4vw rgba(0, 0, 0, 0.5), 0 0 0 .15vw transparent;
  border: none;
  outline: none;
  padding: 0.4vw;
}

.input:hover {
  box-shadow: 0 0 0 .15vw rgba(135, 207, 235, 0.186);
}

.input:focus {
  box-shadow: 0 0 0 .15vw skyblue;
}

::-webkit-scrollbar {
  display: none;
}

.loader {
  display: flex;
  align-items: center;
}

.bar {
  display: inline-block;
  width: 3px;
  height: 20px;
  background-color: rgba(255, 255, 255, .5);
  border-radius: 10px;
  animation: scale-up4 1s linear infinite;
}

.bar:nth-child(2) {
  height: 35px;
  margin: 0 5px;
  animation-delay: .25s;
}

.bar:nth-child(3) {
  animation-delay: .5s;
}

@keyframes scale-up4 {
  20% {
    background-color: #ffff;
    transform: scaleY(1.5);
  }

  40% {
    transform: scaleY(1);
  }
}
</style>