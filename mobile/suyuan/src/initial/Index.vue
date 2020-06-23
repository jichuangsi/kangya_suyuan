<template>
  <div class="Index">
    <!-- <top :top_data="top_data" @LossShow="LossShow"></top> -->
    <!-- <div @click="go">回收</div> -->
    <div class="center">
      <div class="box">
        <div class="recovery boxli" @click="go('recovery')">
          <img src="../assets/images/回收.png" alt="">
          <div>回收</div>
        </div>
        <div class="clean boxli" @click="go('clean')">
          <img src="../assets/images/清洗.png" alt="">
          <div>清洗</div>
        </div>
        <div class="pack boxli" @click="go('pack')">
          <img src="../assets/images/打包.png" alt="">
          <div>打包</div>
        </div>
        <div class="sterilization boxli" @click="go('sterilization')">
          <img src="../assets/images/灭菌.png" alt="">
          <div>灭菌</div>
        </div>
        <div class="inspection boxli" @click="go('inspection')">
          <img src="../assets/images/质检.png" alt="">
          <div>质检</div>
        </div>
        <div class="guidance boxli" @click="go('guidance')">
          <img src="../assets/images/导诊.png" alt="">
          <div>导诊</div>
        </div>
        <div class="set boxli" @click="go('set')">
          <img src="../assets/images/系统.png" alt="">
          <div>系统</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import top from '@/components/Top'
export default {
  name: 'Index',
  components: {
    top
  },
  data () {
    return {
      top_data: {
        title: "",
        left_state: "",
        right_state: "3",
        right_arr: [
          { title: require("../assets/images/操作-刷新.png"),state:3 },
          { title: require("../assets/images/设置.png"),state:3 }
        ]
      },
    }
  },
  mounted () {
  },
  methods: {
    go(text){
      this.$router.push({path:'/'+text})
    },
    LossShow(val){
      console.log(val)
      if(val == 1){
      this.$router.push({path:'/Set'})
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.Index {
  width: 100%;
  height: 100vh;
  background: url('../assets/images/背景.png');
  .center {
    .box {
      width: 100%;
      padding: 0px 30px;
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      position: fixed;
      top: 50%;
      transform: translateY(-50%);
      .boxli {
        width: 324px;
        height: 244px;
        margin-right: 40px;
        margin-bottom: 40px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size:38px;
        font-family:PingFang SC;
        font-weight:bold;
        color:rgba(255,255,255,1);
        position: relative;
        box-shadow:0px 0px 10px 0px rgba(4,117,130,0.2);
        img {
          width: 100%;
        }
        div {
          position: absolute;
          bottom: 33px;
          left: 50%;
          transform: translateX(-50%);
        }
      }
      .boxli:nth-child(2n){
        margin-right: 0px;
      }
      .boxli:last-child{
        margin-bottom: 0px;
      }
      .boxli:active {
        box-shadow:0px 0px 10px 0px rgba(4,117,130,0.2) inset;
      }
    }
  }
} 
</style>
