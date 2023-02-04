<template>
  <div class="w-full h-full  flex justify-center items-center">
    <div class="w-full h-full  flex justify-center items-center">
      <span class="text-5xl font-black text-white">{{ nowgeci }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "singergeci",
  data() {
    return {
      songsid: '',
      allgeci: '',
      nowtiem: '',
      parsedLyrics: '',
      nowgeci: ''
    }
  },
  methods: {},
  mounted() {
    this.$bus.$on('getsongsimg', (data) => {
      let timer = null
      console.log(data.id)
      this.songsid = data.id;
      let geci = new XMLHttpRequest();
      let geciall = '';
      geci.open('GET', `${this.songsid}`, true);
      geci.setRequestHeader("Content-type", "application/json");
      geci.send();
      geci.onreadystatechange = () => {
        if (geci.readyState === 4 && geci.status === 200) {
          let gecis = JSON.parse(geci.responseText);
          console.log(gecis.lrc.lyric);
          this.allgeci = gecis.lrc.lyric;
          geciall = gecis.lrc.lyric; //这里是歌词
          const lyrics = gecis.lrc.lyric;
          console.log(lyrics,'geci')
          const lines = lyrics.split('\n');
          const parsedLyrics = [];
          let lineNumber = 0;
          for (const line of lines) {
            console.log(line)
            const match = line.match(/\[(\d{2}):(\d{2})\.\d{1,3}\]\s*(.*)/);
            console.log(match,'match');
            if (match) {
              let minutes = match[1];
              let seconds = match[2];
              let milliseconds = match[3];
              parsedLyrics.push({
                lineNumber: lineNumber++,
                time: `${minutes}:${seconds}`,
                text: match[3]
              });
            }
          }
          console.log(parsedLyrics, 'parsedLyrics')
          this.parsedLyrics = parsedLyrics;
          console.log(this.parsedLyrics, 'this.parsedLyrics')
          clearInterval(timer);
          //歌词根据时间显示
          timer = setInterval(() => {
            let nowtime = this.nowtiem;
            let nowtime1 = nowtime.split(':');
            let nowtime2 = nowtime1[0] * 60 + nowtime1[1] * 1;
            for (let i = 0; i < this.parsedLyrics.length; i++) {
              let time = this.parsedLyrics[i].time;
              let time1 = time.split(':');
              let time2 = time1[0] * 60 + time1[1] * 1;
              if (nowtime2 === time2) {
                this.nowgeci = this.parsedLyrics[i].text;
              }
            }
          }, 100);
        }
      };
    });
    this.$bus.$on('nowtime', (data) => {
      this.nowtiem = data;
    });
  }
}
</script>

<style scoped>

</style>