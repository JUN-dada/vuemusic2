  <template>
    <div class="h-screen w-full overflow-hidden bg-blue-200">
      <div class=" w-1/2 h-1/2 float-left overflow-hidden">
        <div class="w-full h-full  justify-center blur-[80px]">
          <img class="rotate-45 scale-[5]" :src=songsidimg>
        </div>
      </div>

      <div class=" w-1/2 h-1/2 float-left ">
        <div class="w-full h-full  justify-center blur-[80px]">
          <img class="rotate-45 scale-[5]" :src=songsidimg>
        </div>
      </div>

      <div class=" w-1/2 h-1/2 float-left ">
        <div class="w-full h-full  justify-center blur-[80px]">
          <img class="rotate-45 scale-[5]" :src=songsidimg>
        </div>
      </div>
      <div class=" w-1/2 h-1/2 float-left">
        <div class="w-full h-full  justify-centerlognum blur-[80px]">
          <img class="rotate-45 scale-[5]" :src=songsidimg>
        </div>
      </div>
    </div>
  </template>

  <script>
  import {data} from "autoprefixer";

  let intervalId = null;
  export default {
    name: "music",
    data() {
      return {
        inputvalue: '',
        songsidimg: '',
        tof: '',
        number: 1
      }
    },
    methods: {
      rotate() {
        // let count = 45;
        // let intervalId = null;
        // let allimg = document.querySelectorAll('img');
        // for (let i = 0; i < allimg.length; i++) {
        //   intervalId = setInterval(() => {
        //     count += 15;
        //     allimg[ i ].style.transform = `rotate(${count}deg) scale(4)`;
        //   }, 1000);
        // }


      }
    }
    ,
    mounted() {
      this.$bus.$on('getsongsimg', (data) => {
        this.songsidimg = data.al.picUrl;
      });
      this.$bus.$on('num+', (data) => {
        this.number = data;
      });
      this.$bus.$on('num-', (data) => {
        this.number = data;
      });
      this.$bus.$on('tof', (data) => {
        this.tof = data;
        console.log(data, 'tof')
        let count = 45;
        console.log(this.number, 'number')
        if (this.tof === true && this.number === 1) {
          console.log('开始旋转')
          let allimg = document.querySelectorAll('img');
          intervalId = setInterval(() => {
            count += 0.5;
            allimg[ 0 ].style.transform = `rotate(${count}deg) scale(4)`;
            allimg[ 1 ].style.transform = `rotate(${count}deg) scale(4)`;
            allimg[ 2 ].style.transform = `rotate(${count}deg) scale(4)`;
            allimg[ 3 ].style.transform = `rotate(${count}deg) scale(4)`;
          }, 1000);
          this.number = 2;
        }
        if (this.tof === false && this.number !== 1) {
          let allimg = document.querySelectorAll('img');
          allimg[ 0 ].style.transform = `rotate(${count}deg) scale(5)`;
          allimg[ 1 ].style.transform = `rotate(${count}deg) scale(5)`;
          allimg[ 2 ].style.transform = `rotate(${count}deg) scale(5)`;
          allimg[ 3 ].style.transform = `rotate(${count}deg) scale(5)`;
          clearInterval(intervalId)
          this.number = 1;
        }
      })
    },
    beforeUpdate() {
      //清除所有定时器
      console.log('数据更新了')
      clearInterval(intervalId);
      let allimg = document.querySelectorAll('img');
      for (let i = 0; i <= allimg.length; i++) {
        allimg[ i ].style.transform = `rotate(45deg) scale(5)`;
        clearInterval(intervalId)
      }
    }
  }


  </script>

  <style scoped>

  </style>



