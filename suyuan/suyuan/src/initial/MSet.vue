<template>
  <div class="Set">
    <top :top_data="top_data"></top>
    <div class="center">
      <div class="li" @click="SetBluetoothGo"><img src="../assets/images/蓝牙设备.png" alt=""></div>
      <div class="li" @click="show=true"><img src="../assets/images/数据缓存.png" alt=""></div>
    </div>
    <div class="show" v-if="show" @click="show=false">
      <div class="show_box">
        <div class="checkbox">
          <div class="check_li" v-for="(item,index) in cache_arr" :key="index" @click.stop="CacheCheck(index)">
            <div class="text">{{item.title}}</div>
            <div class="choice" :class="{'check':item.state==1}"></div>
          </div>
        </div>
        <div class="show_btn" @click="ShowBtn">
          更新
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import top from '@/components/MTop'
export default {
  name: 'Set',
  components: {
    top
  },
  data () {
    return {
      top_data:{
        title:'系统',
        left_state:'1'
      },
      cache_arr:[
        {title:'数据员工',state:1},
        {title:'器械数据',state:1},
        {title:'器械包数据',state:0}
      ],
      show:false
    }
  },
  mounted () {
  },
  methods: {
    CacheCheck(index){
      console.log(index)
      this.cache_arr[index].state=this.cache_arr[index].state==1?0:1
    },
    ShowBtn(){
      this.show = false
    },
    SetBluetoothGo(){
      this.$router.push({path:'/MSetBluetooth'})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.Set {
  .center {
    width: 100%;
    padding: 20px;
    display: flex;
    // flex-wrap: wrap;
    justify-content: space-between;
    .li {
        width: 44.53%;
      img {
        width: 100%;
        box-shadow: 20px 20px 20px rgba(0,0,0,0.2);
        border-radius: 10px;
      }
    }
    .li:active{
      background-color: bisque;
      // box-shadow: 0px 0px 0px rgba(0,0,0,0.6);
      box-shadow: rgba(0,0,0,0.2) 0px 0px 30px 5px inset;
    }
    .blank {
      visibility: hidden;
      height: 0px;
    }
  }
  .show{
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100vh;
    z-index: 9;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0,0,0,0.5);
    .show_box {
      width:573px;
      height:572px;
      background:rgba(255,255,255,1);
      padding: 40px;
      .checkbox {
        width: 100%;
        height: 296px;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        justify-content: space-between;
        .check_li {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .text {
            width: 100%;
            font-size:36px;
            font-weight:500;
            color:rgba(93,93,93,1);
          }
          .choice{
            width:64px;
            height:64px;
            border:1px solid rgba(137,137,137,1);
          }
          .check {
            width:64px;
            height:64px;
            border: none;
            background: url('../assets/images/勾选.png') center center no-repeat;
            background-size: 100%;
          }
        }
      }
      .show_btn {
        width:250px;
        height:90px;
        background:rgba(19,206,199,1);
        box-shadow:0px 10px 0px 0px rgba(4,117,130,1);
        border-radius:45px;
        font-size:40px;
        font-family:Source Han Sans CN;
        font-weight:500;
        color:rgba(255,255,255,1);
        margin: 0 auto;
        margin-top: 82px;
        text-align: center;
        line-height: 90px;
      }
    }
  }
}
</style>
