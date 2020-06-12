<template>
  <div class="Index">
    <top :top_data="top_data" @LossShow="LossShow"></top>
    <!-- <div @click="go">回收</div> -->
    <div class="center">
      <div class="box">
        <div class="recovery" @click="go('recovery')">
          <img v-show="false" src="../assets/images/组16.png">
        </div>
        <div class="clean" @click="go('clean')">
          <img v-show="false" src="../assets/images/组17.png">
        </div>
        <div class="pack" @click="go('pack')">
          <img v-show="false" src="../assets/images/组18.png">
        </div>
        <div class="guidance" @click="go('guidance')">
          <img v-show="false" src="../assets/images/组21.png">
        </div>
        <div class="inspection" @click="go('inspection')">
          <img v-show="false" src="../assets/images/组20.png">
        </div>
        <div class="sterilization" @click="go('sterilization')">
          <img v-show="false" src="../assets/images/组19.png">
        </div>
      </div>
      <div class="messages_box">
        <div class="recovery_box m_box">
          <div class="b_top">
            <div>应收器</div>
            <div>实收器</div>
            <div>已清洗</div>
            <div>损耗</div>
          </div>
          <div class="b_bottom">
            <div>298</div>
            <div>298</div>
            <div>200</div>
            <div>2</div>
          </div>
        </div>
        <div class="clean_box m_box">
          <div class="b_top">
            <div>应收器</div>
            <div>实收器</div>
            <div>已清洗</div>
            <div>损耗</div>
          </div>
          <div class="b_bottom">
            <div>298</div>
            <div>298</div>
            <div>200</div>
            <div>2</div>
          </div>
        </div>
        <div class="pack_box m_box">
          <div class="b_top">
            <div>应收器</div>
            <div>实收器</div>
            <div>已清洗</div>
            <div>损耗</div>
          </div>
          <div class="b_bottom">
            <div>298</div>
            <div>298</div>
            <div>200</div>
            <div>2</div>
          </div>
        </div>
        <div class="guidance_box m_box">
          <div class="b_top">
            <div>应收器</div>
            <div>实收器</div>
            <div>已清洗</div>
            <div>损耗</div>
          </div>
          <div class="b_bottom">
            <div>298</div>
            <div>298</div>
            <div>200</div>
            <div>2</div>
          </div>
        </div>
        <div class="inspection_box m_box">
          <div class="b_top">
            <div>应收器</div>
            <div>实收器</div>
            <div>已清洗</div>
            <div>损耗</div>
          </div>
          <div class="b_bottom">
            <div>298</div>
            <div>298</div>
            <div>200</div>
            <div>2</div>
          </div>
        </div>
        <div class="sterilization_box m_box">
          <div class="b_top">
            <div>应收器</div>
            <div>实收器</div>
            <div>已清洗</div>
            <div>损耗</div>
          </div>
          <div class="b_bottom">
            <div>298</div>
            <div>298</div>
            <div>200</div>
            <div>2</div>
          </div>
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
  .center {
    width: 100%;
    height: calc((100% - 100px));
    background: url('../assets/images/首页.png') center center no-repeat;
    background-size: 100%;
    position: relative;
    .box {
      // width: 66%;
      // height: 66%;
      // position: absolute;
      // left: 50%;
      // top: 50%;
      // transform: translate(-50%,-50%);
      // display: flex;
      // flex-wrap: wrap;
      // align-content: space-between;
      div {
        width: 190px;
        height: 190px;
        // border: 1px solid #0094ff;
        position: absolute;
        z-index: 9;
        

      }
        .recovery {
          left: 27.5%;
          top: 25.5%;
          background: url('../assets/images/组6.png') center center no-repeat;
          background-size: 100%;
        }
        .recovery:active {
          background: url('../assets/images/组16.png') center center no-repeat;
          background-size: 100%;
        }
        .clean {
          left: 46%;
          top: 15.5%;
          background: url('../assets/images/组7.png') center center no-repeat;
          background-size: 100%;
        }
        .clean:active {
          background: url('../assets/images/组17.png') center center no-repeat;
          background-size: 100%;
        }
        .pack {
          left: 61.5%;
          top: 34.5%;
          background: url('../assets/images/组8.png') center center no-repeat;
          background-size: 100%;
        }
        .pack:active {
          background: url('../assets/images/组18.png') center center no-repeat;
          background-size: 100%;
        }
        .sterilization {
          left: 61%;
          top: 63.5%;
          background: url('../assets/images/组9.png') center center no-repeat;
          background-size: 100%;
        }
        .sterilization:active {
          background: url('../assets/images/组19.png') center center no-repeat;
          background-size: 100%;
        }
        .inspection {
          left: 42.5%;
          bottom: 9.5%;
          background: url('../assets/images/组10.png') center center no-repeat;
          background-size: 100%;
        }
        .inspection:active {
          background: url('../assets/images/组20.png') center center no-repeat;
          background-size: 100%;
        }
        .guidance {
          left: 25.5%;
          top: 56.5%;
          background: url('../assets/images/组11.png') center center no-repeat;
          background-size: 100%;
        }
        .guidance:active {
          background: url('../assets/images/组21.png') center center no-repeat;
          background-size: 100%;
        }
    }
    .messages_box {
      .m_box {
        width: 442px;
        height: 90px;
        border-radius: 10px;
        border:1px solid rgba(0,170,164,1);
        overflow: hidden;
        position: absolute;
        .b_top {
          width: 100%;
          height:49px;
          background:rgba(26,193,187,1);
          font-size:26px;
          font-family:Source Han Sans CN;
          font-weight:500;
          color:rgba(255,255,255,1);
          display: flex;
          div {
            flex:1;
            display: flex;
            justify-content: center;
            align-items: center;
            border-right: 1px solid rgba(0,170,164,1);
          }
          div:last-child {
            border: none;
          }
        }
        .b_bottom {
          width: 100%;
          height:49px;
          background:rgba(255,255,255,1);
          font-size:26px;
          font-family:Source Han Sans CN;
          font-weight:500;
          color:rgba(53,53,53,1);
          display: flex;
          div {
            flex:1;
            display: flex;
            justify-content: center;
            align-items: center;
            border-right: 1px solid rgba(0,170,164,1);
          }
          div:last-child {
            border: none;
          }
        }
      }
    }
    .recovery_box {
      left: 0.5%;
      top: 27.5%;
    }
    .clean_box {
      left: 38%;
      top: 2.5%;
    }
    .pack_box {
      left: 73.5%;
      top: 33.5%;
    }
    .sterilization_box {
      left: 74%;
      top: 68.5%;
    }
    .inspection_box {
      left: 38%;
      bottom: 1.5%;
    }
    .guidance_box {
      left: 0.5%;
      top: 58.5%;
    }
  }
} 
</style>
