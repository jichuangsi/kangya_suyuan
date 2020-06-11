<template>
  <div class="Recovery">
    <top :top_data="top_data"></top>
    <div class="center">
      <div class="box">
        <div class="t_box">
          <table>
            <thead>
              <tr>
                <th>多选</th>
                <th>序列</th>
                <th>回收单位</th>
                <th @click="OrderClick">
                  回收包数量
                  <em :class="{'order':order}"></em>
                </th>
                <th>合计</th>
              </tr>
            </thead>
          </table>
          <div class="scorll">
            <table>
              <tbody>
                <tr v-for="(item,index) in recovery_arr" :key="index">
                  <td>
                    <div :class="{'check':item.state==1}" @click="RecoveryClick(index)"></div>
                  </td>
                  <td>{{item.index}}</td>
                  <td>{{item.unit}}</td>
                  <td @click="Show2">{{item.num}}</td>
                  <td>{{item.text}}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="b_box">
          <div class="sx">
            <div :class="{'check':sxstate==1}" @click="SxClick"></div><span @click="Show2">回收失效包合计：3</span>
          </div>
        </div>
      </div>
    </div>
    <div class="foot">
      <div class="f_l">工号：001 姓名：王家骥</div>
      <div class="f_c">回收器械共:500，选中:300，损/失:2，合计:100</div>
      <div class="f_r">
        <div @click="LossGo">报损/报失</div>
        <div @click="Change">检查</div>
      </div>
    </div>
    <div class="show" v-if="show" @click="show=false">
      <div class="show_box1" v-if="shownum == 0">
          <div class="b_box">
              <div class="b_l">
                  回收列表
              </div>
              <div class="b_r">
                  <div>医用镊子*99</div>
                  <div>医用镊子*99</div>
                  <div>医用镊子*99</div>
                  <div>医用镊子*99</div>
              </div>
          </div>
          <div class="b_box">
              <div class="b_l">
                  损失列表
              </div>
              <div class="b_r">
                  <div>医用镊子*99</div>
                  <div>医用镊子*99</div>
                  <div>医用镊子*99</div>
                  <div>医用镊子*99</div>
              </div>
          </div>
          <div class="b_btn">
            <div>确定</div>
            <div @click="show = false">取消</div>
          </div>
      </div>
      <div class="show_box2" v-if="shownum == 1">
        <div class="box">
          <div class="t_box">
            <table>
              <thead>
                <tr>
                  <th>消毒包序号</th>
                  <th>消毒包名称</th>
                  <th @click.stop="TimeClick">
                    使用日期
                    <em :class="{'order':timeorder}"></em>
                  </th>
                  <th>详情</th>
                </tr>
              </thead>
            </table>
            <div class="scorll">
              <table>
                <tbody>
                  <tr v-for="(item,index) in num_arr" :key="index">
                    <td>{{item.index}}</td>
                    <td>{{item.name}}</td>
                    <td>{{item.time}}</td>
                    <td>{{item.text}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="confirm">确定</div>
      </div>
    </div>
  </div>
</template>

<script>
import top from "@/components/Top";
export default {
  name: "Recovery",
  components: {
    top
  },
  data() {
    return {
      top_data: {
        title: "回收",
        left_state: "1",
        right_state: "1",
        right_arr: [
          { title: "消毒包", path: "/R_disinfect",quer:'',state:1 },
          { title: "反馈", path: "/Feedback",quer:'回收',state:1 }
        ]
      },
      recovery_arr: [
        {
          state: 0,
          index: 1,
          unit: "诊室1",
          num: 20,
          text: "医用剪刀*10 医用镊子*10"
        },
        {
          state: 1,
          index: 1,
          unit: "诊室1",
          num: 10,
          text: "医用剪刀*10 医用镊子*10"
        }
      ],
      num_arr: [
        {
          index: 'XDB001',
          name: "蛀牙包",
          time: '02-09-23 12:00',
          text: "医用剪刀*10 医用镊子*10"
        },
        {
          index: 'XDB001',
          name: "蛀牙包",
          time: '02-09-23 13:00',
          text: "医用剪刀*10 医用镊子*10"
        }
      ],
      sxstate: 1,
      order: false,
      show:false,
      shownum:0,
      timeorder:false
    };
  },
  mounted() {},
  methods: {
    LossGo() {
      this.$router.push({ path: "/Loss" });
    },
    Change(){
        this.show = true
        this.shownum = 0
    },
    Show2(){
        this.show = true
        this.shownum = 1
    },
    RecoveryClick(index) {
      this.recovery_arr[index].state =
        this.recovery_arr[index].state == 1 ? 0 : 1;
    },
    SxClick() {
      this.sxstate = this.sxstate == 1 ? 0 : 1;
    },
    OrderClick() {
      this.order = !this.order;
      this.order
        ? this.recovery_arr.sort(this.compare("num"))
        : this.recovery_arr.sort(this.compare("num", "1"));
    },
    TimeClick(){
      this.timeorder = !this.timeorder;
      this.timeorder
        ? this.num_arr.sort(this.compare("time"))
        : this.num_arr.sort(this.compare("time", "1"));
    },
    compare(attr, rev) {
      //第二个参数没有传递 默认升序排列
      if (rev == undefined) {
        rev = 1;
      } else {
        rev = -1;
      }
      return function(a, b) {
        a = a[attr];
        b = b[attr];
        if (a < b) {
          return rev * -1;
        }
        if (a > b) {
          return rev * 1;
        }
        return 0;
      };
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.Recovery {
  width: 100%;
  height: 100vh;
  .center {
    width: 100%;
    height: calc((100% - 100px) - 110px);
    padding: 40px;
    padding-bottom: 10px;
    .box {
      width: 100%;
      height: 100%;
      border: 1px solid rgba(203, 203, 203, 1);
      .t_box {
        width: 100%;
        height: 80%;
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
              width: 207px;
            }
            th:nth-child(2) {
              width: 240px;
            }
            th:nth-child(3) {
              width: 380px;
            }
            th:nth-child(4) {
              width: 390px;
            }
            th:last-child {
              border-right: none;
              width: 622px;
            }
            td {
              height: 146px;
              border-right: 1px solid rgba(203, 203, 203, 1);
              border-bottom: 1px solid rgba(203, 203, 203, 1);
              text-align: center;
              line-height: 46px;
              padding: 40px;
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
                background: url('../assets/images/勾选.png') center center no-repeat;
                background-size: 100% 100%;
              }
            }
            td:first-child {
              width: 198px;
            }
            td:nth-child(2) {
              width: 240px;
            }
            td:nth-child(3) {
              width: 380px;
            }
            td:nth-child(4) {
              width: 390px;
            }
            td:last-child {
              border-right: none;
              width: 622px;
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
      .b_box {
        width: 100%;
        height: 20%;
        border-top: 1px solid rgba(203, 203, 203, 1);
        position: relative;
        .sx {
          position: absolute;
          left: 75px;
          bottom: 35px;
          display: flex;
          align-items: center;
          font-size: 36px;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: rgba(49, 50, 50, 1);
          div {
            width: 54px;
            height: 54px;
            border: 1px solid rgba(190, 190, 190, 1);
            margin-right: 20px;
          }
          .check {
            width: 64px;
            height: 58px;
            // border: 1px solid rgba(9, 200, 193, 1);
            border: none;
            background: url('../assets/images/勾选.png') center center no-repeat;
            background-size: 100% 100%;
          }
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
    .show_box1 {
      width: 673px;
      height: 800px;
      background: rgba(255, 255, 255, 1);
      padding: 63px 62px 30px 53px;
      position: relative;
      .b_box {
          width: 100%;
          display: flex;
          justify-content: space-between;
            margin-bottom: 100px;
          .b_l {
            // width:143px;
            height:34px;
            font-size:36px;
            font-family:Source Han Sans CN;
            font-weight:400;
            color:rgba(0,170,164,1);
          }
          .b_r {
            width:388px;
            height:244px;
            border:1px solid rgba(49,50,50,1);
            overflow-y: auto;
            padding: 13px 22px;
            div {
                font-size:34px;
                line-height: 46px;
                font-family:Source Han Sans CN;
                font-weight:400;
                color:rgba(49,50,50,1);
            }
          }
      }
      .b_btn {
          position: absolute;
          right: 62px;
          bottom: 30px;
          display: flex;
          div {
            width:180px;
            height:74px;
            background:rgba(19,206,199,1);
            box-shadow:0px 8px 0px 0px rgba(4,117,130,1);
            border-radius:37px;
            font-size:36px;
            font-family:Source Han Sans CN;
            font-weight:400;
            color:rgba(255,255,255,1);
            line-height: 74px;
            text-align: center;
            margin-right: 60px;
          }
          div:last-child {
              margin-right: 0px;
          }
          div:active {
            box-shadow:0px 8px 0px 0px rgba(4,117,130,1) inset;
          }
      }
    }
    .show_box2 {
      width: 80%;
      height: 80%;
      background-color: #fff;
      padding: 20px;
      .box {
        width: 100%;
        height: calc((100% - 120px));
        border: 1px solid rgba(203, 203, 203, 1);
        .t_box {
          width: 100%;
          height: 80%;
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
                width: 207px;
              }
              th:nth-child(2) {
                width: 240px;
              }
              th:nth-child(3) {
                width: 380px;
              }
              th:nth-child(4) {
                width: 390px;
              }
              th:last-child {
                border-right: none;
                width: 622px;
              }
              td {
                height: 146px;
                border-right: 1px solid rgba(203, 203, 203, 1);
                border-bottom: 1px solid rgba(203, 203, 203, 1);
                text-align: center;
                line-height: 46px;
                // padding: 40px;
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
                  background: url('../assets/images/勾选.png') center center no-repeat;
                  background-size: 100% 100%;
                }
              }
              td:first-child {
                width: 207px;
              }
              td:nth-child(2) {
                width: 240px;
              }
              td:nth-child(3) {
                width: 380px;
              }
              td:nth-child(4) {
                width: 390px;
              }
              td:last-child {
                border-right: none;
                width: 622px;
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
        .b_box {
          width: 100%;
          height: 20%;
          border-top: 1px solid rgba(203, 203, 203, 1);
          position: relative;
          .sx {
            position: absolute;
            left: 75px;
            bottom: 35px;
            display: flex;
            align-items: center;
            font-size: 36px;
            font-family: Source Han Sans CN;
            font-weight: 400;
            color: rgba(49, 50, 50, 1);
            div {
              width: 54px;
              height: 54px;
              border: 1px solid rgba(190, 190, 190, 1);
              margin-right: 20px;
            }
            .check {
              width: 64px;
              height: 58px;
              // border: 1px solid rgba(9, 200, 193, 1);
              border: none;
              background: url('../assets/images/勾选.png') center center no-repeat;
              background-size: 100% 100%;
            }
          }
        }
      }
      .confirm {
        width: 250px;
        height: 90px;
        background: rgba(19, 206, 199, 1);
        box-shadow: 0px 10px 0px 0px rgba(4, 117, 130, 1);
        border-radius: 45px;
        font-size: 36px;
        color: rgba(255, 255, 255, 1);
        text-align: center;
        line-height: 90px;
        float: right;
        margin-top: 20px;
      }
      .confirm:active {
        box-shadow: 0px 8px 0px 0px rgba(4, 117, 130, 1) inset;
      }
    }
  }
}
</style>
