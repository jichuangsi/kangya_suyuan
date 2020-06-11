<template>
  <div class="G_into">
    <top :top_data="top_data" @LossShow="LossShow"></top>
    <div class="center">
       <div class="resume">
           <div class="t">
               <div>病人简历：</div>
               <div>取消关联</div>
           </div>
           <div class="b">
               <div class="l">
                   <div>姓名：</div>
                   <div>{{item.name}}</div>
               </div>
               <div class="r">
                   <div>病历号：</div>
                   <div>{{item.index}}</div>
               </div>
           </div>
       </div>
       <div class="G_title">
           消毒包列表：
       </div>
      <div class="box">
        <div class="t_box">
          <table>
            <thead>
              <tr>
                <th>消毒包序列号</th>
                <th>消毒包名</th>
                <th>灭菌日期</th>
                <th>失效日期</th>
                <th>详情</th>
                <th>删除</th>
              </tr>
            </thead>
          </table>
          <div class="scorll">
            <table>
              <tbody>
                <tr v-for="(item,index) in guidance_arr" :key="index">
                  <td>{{item.index}}</td>
                  <td>{{item.name}}</td>
                  <td>{{item.startime}}</td>
                  <td>{{item.endtime}}</td>
                  <td @click="Details(item,index)">
                    <img src="../assets/images/详情.png" alt />
                  </td>
                  <td @click="Del(index)">
                    <img src="../assets/images/删除.png" alt />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div class="foot">
      <div class="f_l">工号：001 姓名：王家骥</div>
    </div>
    <div class="show" v-if="show" @click="show=false">
      <div class="show_box1">
        <div class="li">
            <div class="title">门诊名：</div>
            <div class="text">大一门诊</div>
        </div>
        <div class="li">
            <div class="title">门诊编号：</div>
            <div class="text">001</div>
        </div>
        <div class="li">
            <div class="title">消毒包序列号：</div>
            <div class="text">XDB001</div>
        </div>
        <div class="li">
            <div class="title">消毒包名：</div>
            <div class="text">蛀牙包</div>
        </div>
        <div class="li">
            <div class="title">消毒包内容：</div>
            <div class="text">
                <div>医用剪刀*1</div>
                <div>医用剪刀*1</div>
            </div>
        </div>
        <div class="li">
            <div class="title">灭菌负责人：</div>
            <div class="text">王佳佳</div>
        </div>
        <div class="li">
            <div class="title">质检负责人：</div>
            <div class="text">王佳佳</div>
        </div>
        <div class="li">
            <div class="title">灭菌时间：</div>
            <div class="text">02-03-20 12:00</div>
        </div>
        <div class="li">
            <div class="title">失效时间：</div>
            <div class="text">02-03-20 12:00</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import top from "@/components/Top";
import {register} from '@/api/api'
export default {
  name: "G_into",
  components: {
    top
  },
  data() {
    return {
      top_data: {
        title: "导诊",
        left_state: "1",
        right_state: "2",
        right_arr: [
          { title: "扫码", state: 2 },
        ]
      },
      guidance_arr: [
        {
          index: "BL0011",
          name: "蛀牙包",
          startime: "02-02-03 12:00",
          endtime: "02-02-03 12:00"
        },
        {
          index: "BL0011",
          name: "蛀牙包2",
          startime: "02-02-03 12:00",
          endtime: "02-02-03 12:00"
        }
      ],
      item:'',
      show:false,
    };
  },
  mounted() {
    console.log(this.$route.query.item)
    this.item = this.$route.query.item
    this.top_data.title=this.$route.query.item.unit+'-床位'+this.$route.query.item.bednum
  },
  methods: {
    LossShow(val) {
      cordova.plugins.barcodeScanner.scan(
      function (result) {
          alert("We got a barcode\n" +
                "Result: " + result.text + "\n" +
                "Format: " + result.format + "\n" +
                "Cancelled: " + result.cancelled);
      }, 
      function (error) {
          alert("Scanning failed: " + error);
      }
   );
    },
    Details(item,index){
        this.show = true
    },
    Del(index){
        this.guidance_arr.splice(index,1)
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.G_into {
  width: 100%;
  height: 100vh;
  .center {
    width: 100%;
    height: calc((100% - 100px) - 110px);
    padding: 40px;
    padding-bottom: 10px;
    .resume {
        width: 100%;
        height: 210px;
        overflow: hidden;
        border:2px solid rgba(203,203,203,1);
        margin-bottom: 100px;
        .t {
            width:100%;
            height:105px;
            background:rgba(19,206,199,1);
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding-left: 37px;
            div:first-child {
                font-size:38px;
                font-family:Source Han Sans CN;
                font-weight:400;
                color:rgba(254,255,255,1);
            }
            div:last-child {
                width:250px;
                height:80px;
                line-height: 80px;
                text-align: center;
                background:rgba(255,255,255,1);
                box-shadow:0px 10px 0px 0px rgba(4,117,130,1);
                border-radius:40px;
                font-size:36px;
                font-family:Source Han Sans CN;
                font-weight:400;
                color:rgba(55,55,55,1);
            }
            div:last-child:active{
                box-shadow:0px 10px 0px 0px rgba(4,117,130,1) inset;
            }
        }
        .b {
            width:100%;
            height:105px;
            background:#fff;
            font-size:34px;
            font-family:Source Han Sans CN;
            font-weight:400;
            color:rgba(55,55,55,1);
            display: flex;
            align-items: center;
            .l {
                flex: 1;
                height: 100%;
                border-right: 1px solid rgba(203,203,203,1);
                display: flex;
                align-items: center;
                text-indent: 37px;
            }
            .r {
                flex: 1;
                height: 100%;
                display: flex;
                align-items: center;
                text-indent: 37px;
            }
        }
    }
    .G_title {
        font-size:38px;
        font-family:Source Han Sans CN;
        font-weight:400;
        color:rgba(49,50,50,1);
        margin-bottom: 40px;
    }
    .box {
      width: 100%;
      height: calc((100% - 388px));
      border: 1px solid rgba(203, 203, 203, 1);
      .t_box {
        width: 100%;
        height: 100%;
        position: relative;
        table {
          width: 100%;
          // height: 100%;
          tr {
            width: 100%;
            th {
              height: 100px;
              font-size: 36px;
              font-family: Source Han Sans CN;
              font-weight: 400;
              color: rgba(255, 255, 255, 1);
              background: rgba(0, 170, 164, 1);
              border-right: 1px solid rgba(203, 203, 203, 1);
              text-align: center;
              line-height: 100px;
              // vertical-align: middle;
              em {
                border: 12px solid #fff;
                border-color: #fff transparent transparent transparent;
                display: inline-block;
                margin-left: 10px;
                margin-bottom: -10px;
              }
              .order {
                border-color: transparent transparent #fff transparent;
                margin-bottom: 10px;
              }
            }
            th:first-child {
              width: 324px;
            }
            th:nth-child(2) {
              width: 314px;
            }
            th:nth-child(3) {
              width: 342px;
            }
            th:nth-child(4) {
              width: 350px;
            }
            th:nth-child(5) {
              width: 290px;
            }
            th:last-child {
              border-right: none;
              width: 216px;
            }
            td {
              height: 146px;
              border-right: 1px solid rgba(203, 203, 203, 1);
              border-bottom: 1px solid rgba(203, 203, 203, 1);
              text-align: center;
              line-height: 46px;
              font-size: 34px;
              font-family: Source Han Sans CN;
              font-weight: 400;
              color: rgba(49, 50, 50, 1);
              vertical-align: middle;
              div {
                width: 54px;
                height: 54px;
                border: 1px solid rgba(190, 190, 190, 1);
                margin: 0 auto;
              }
              .check {
                width: 64px;
                height: 58px;
                // border: 1px solid rgba(9, 200, 193, 1);
                border: none;
                background: url("../assets/images/勾选.png") center center
                  no-repeat;
                background-size: 100% 100%;
              }
            }
            td:first-child {
              width: 324px;
            }
            td:nth-child(2) {
              width: 314px;
            }
            td:nth-child(3) {
              width: 342px;
            }
            td:nth-child(4) {
              width: 350px;
            }
            td:nth-child(5) {
              width: 290px;
              img {
                width: 52px;
              }
            }
            td:last-child {
              border-right: none;
              width: 216px;
              img {
                width: 40px;
              }
            }
          }
        }
        .scorll {
          width: 100%;
          height: calc((100% - 100px));
          overflow: auto;
          position: relative;
        }
      }
    }
  }
  .foot {
    width: 100%;
    height: 110px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 7px 0px rgba(4, 49, 51, 0.15);
    padding: 0 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    div {
      display: inline-block;
      font-size: 34px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: rgba(49, 50, 50, 1);
      div {
        width: 250px;
        height: 90px;
        background: rgba(19, 206, 199, 1);
        box-shadow: 0px 10px 0px 0px rgba(4, 117, 130, 1);
        border-radius: 45px;
        font-size: 36px;
        color: rgba(255, 255, 255, 1);
        text-align: center;
        line-height: 90px;
      }
      div:active {
        box-shadow: 0px 8px 0px 0px rgba(4, 117, 130, 1) inset;
      }
    }
  }
  .show {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100vh;
    z-index: 9;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
    
    .show_box {
      width: 1021px;
      height: 877px;
      background: rgba(255, 255, 255, 1);
      // padding: 40px;
      .s_b_top {
        width:100%;
        height:88px;
        background:rgba(19,206,199,1);
        font-size:38px;
        font-family:Source Han Sans CN;
        font-weight:500;
        color:rgba(255,255,255,1);
        text-align: center;
        line-height: 92px;
      }
      .s_b_center{
        display: flex;
        padding: 40px;
        padding-bottom: 0px;
        flex-wrap: wrap;
        .s_li {
            width: 100%;
            margin-bottom: 40px;
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            .s_title {
                width: 100%;
                font-size:36px;
                font-family:Source Han Sans CN;
                font-weight:400;
                color:rgba(0,170,164,1);
                margin-bottom: 20px;
            }
            .s_left {
                width: 200px;
                font-size:36px;
                font-family:Source Han Sans CN;
                font-weight:400;
                color:rgba(0,170,164,1);
            }
            .s_right {
                flex:1;
                font-size:34px;
                font-family:Source Han Sans CN;
                font-weight:400;
                color:rgba(49,50,50,1);
                display: flex;
                align-items: center;
                .check_box {
                    display: flex;
                    align-items: center;
                    margin-right: 40px;
                    white-space: nowrap;
                    .quan {
                        width:34px;
                        height:34px;
                        border:1px solid rgba(137,137,137,1);
                        border-radius:50%;
                        padding: 6px;
                        overflow: hidden;
                        margin-right: 8px;
                        em {
                            display: block;
                            width:100%;
                            height:100%;
                            background:rgba(54,213,207,1);
                            border-radius:50%;
                        }
                        input {
                            font-size:34px;
                            font-family:Source Han Sans CN;
                            color:rgba(49,50,50,1);
                        }
                    }
                    .check_q {
                        border-color:rgba(54,213,207,1);
                    }
                    .kuang {
                        width:50px;
                        height:50px;
                        border:1px solid rgba(120,120,120,1);
                    }
                    .check_k {
                        width: 60px;
                        height: 50px;
                        // border: 1px solid rgba(9, 200, 193, 1);
                        border: none;
                        background: url('../assets/images/勾选.png') center center no-repeat;
                        background-size: 100% 100%;
                    }
                }
                .check_box:last-child {
                    margin-right: 0px;
                }
                .check_time {
                    width:260px;
                    height:64px;
                    border:1px solid rgba(120,120,120,1);
                    border-radius:10px;
                    padding: 0px 24px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    flex-wrap: wrap;
                    // em {
                    //     display: inline-block;
                    //     width: 20px;
                    //     height: 20px;
                    //     border:1px solid rgba(49,50,50,1);
                    //     border-color: transparent transparent rgba(49,50,50,1) rgba(49,50,50,1);
                    //     transform: rotate(-45deg);
                    // }
                }
                .zhi {
                    margin: 0px 20px;
                }
                .ipt {
                    display: flex;
                    align-items: center;
                    div {
                        width: 120px;
                    }
                    input {
                        width:200px;
                        height:64px;
                        border:1px solid rgba(120,120,120,1);
                        border-radius:10px;
                        font-size: 34px;
                        text-align: center;
                    }
                }
                .sel {
                    width:200px;
                    height:64px;
                    line-height: 64px;
                    border:1px solid rgba(120,120,120,1);
                    border-radius:10px;
                    display: flex;
                    flex-wrap: wrap;
                    align-items: center;
                    justify-content: space-between;
                    padding: 0px 18px;
                    position: relative;
                    z-index: 8;
                    em {
                        display: inline-block;
                        width: 20px;
                        height: 20px;
                        border:1px solid rgba(49,50,50,1);
                        border-color: transparent transparent rgba(49,50,50,1) rgba(49,50,50,1);
                        transform: rotate(-45deg);
                    }
                    .ul {
                        width: 100%;
                        background-color: #fff;
                        border:1px solid rgba(120,120,120,1);
                        .li {
                            text-indent: 20px;
                        }
                    }
                }
                .iptbox {
                    flex: 1;
                    height:74px;
                    border:1px solid rgba(120,120,120,1);
                    border-radius:10px;
                    overflow: hidden;
                    input {
                        font-size: 34px;
                        width: 100%;
                        height: 100%;
                        text-align: center;
                    }
                }
            }
        }
      }
      .s_b_btn {
        width: 100%;
        padding: 0px 40px;
        display: flex;
        justify-content: center;
      }
      .s_b_btn div {
        width:180px;
        height:74px;
        background:rgba(19,206,199,1);
        box-shadow:0px 8px 0px 0px rgba(4,117,130,1);
        border-radius:37px;
        font-size:36px;
        font-family:Source Han Sans CN;
        font-weight:400;
        color:rgba(255,255,255,1);
        text-align: center;
        line-height: 74px;
      }
      .s_b_btn div:last-child {
          margin-left: 60px;
      }
      .s_b_btn .relation {
        width:670px;
        height:100px;
        line-height: 100px;
        background:rgba(19,206,199,1);
        box-shadow:0px 15px 0px 0px rgba(4,117,130,1);
        border-radius:10px;
        margin: 0 auto;
      }
      .s_b_btn div:active {
        box-shadow:0px 8px 0px 0px rgba(4,117,130,1) inset;
      }
      .s_b_btn .relation:last-child {
        margin: 0 auto;
        margin-top: 40px;
      }
    }
    .show_box1 {
      width: 613px;
      background-color: #fff;
      padding: 40px;
      display: flex;
      flex-wrap: wrap;
      .li {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size:34px;
          font-family:Source Han Sans CN;
          font-weight:400;
          color:rgba(93,93,93,1);
          margin-bottom: 40px;
          .title {
            font-size:36px;
            color:rgba(0,170,164,1);
          }
      }
    }
  }
}
</style>
