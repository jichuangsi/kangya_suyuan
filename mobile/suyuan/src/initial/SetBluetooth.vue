<template>
  <div class="SetBluetooth">
    <top :top_data="top_data"></top>
    <div class="center">
      <div class="li"><img src="../assets/images/断开设备.png" alt=""></div>
      <div class="li" @click="show=true"><img src="../assets/images/查找设备.png" alt=""></div>
    </div>
    <div class="show" v-if="show" @click="show=false">
      <div class="show_box">
        <div class="checkbox">
          <div class="check_li" v-for="(item,index) in bluetooth_arr" :key="index" @click.stop="BluetoothCheck(index)">
            <div class="choice" :class="{'check':index==bluetooth_index}">
                <div></div>
            </div>
            <div class="text">{{item.title}}</div>
            <div class="text">{{item.name}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import top from '@/components/Top'
export default {
  name: 'SetBluetooth',
  components: {
    top
  },
  data () {
    return {
      top_data:{
        title:'蓝牙设备',
        left_state:'1'
      },
      bluetooth_arr:[
        {title:'设备1',name:'A8:D5:Z1:A3'},
        {title:'设备1',name:'A8:D5:Z1:A3'},
        {title:'设备1',name:'A8:D5:Z1:A3'}
      ],
      bluetooth_index:0,
      show:false
    }
  },
  mounted () {
    
  },
  methods: {
    BluetoothCheck(index){
      console.log(index)
      this.bluetooth_index=index
      this.show = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.SetBluetooth {
  .center {
    width: 100%;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    .li {
      img {
        width: 334px;
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
      //height:572px;
      background:rgba(255,255,255,1);
      padding: 40px;
      .checkbox {
        width: 100%;
        // height: 296px;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        justify-content: space-between;
        .check_li {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 60px;
          .text {
            width: 100%;
            font-size:36px;
            font-weight:500;
            color:rgba(93,93,93,1);
            flex: 1;
          }
          .choice{
            width:34px;
            height:34px;
            border:1px solid rgba(137,137,137,1);
            border-radius: 50%;
            padding: 5px;
            margin-right: 10px;
          }
          .check {
            border:1px solid rgba(9,200,193,1);
            div {
                width: 100%;
                height: 100%;
                background-color: rgba(9,200,193,1);
                border-radius: 50%;
            }
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
