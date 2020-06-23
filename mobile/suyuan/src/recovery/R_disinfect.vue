<template>
  <div class="R_disinfect">
    <top :top_data="top_data" @LossShow="LossShow"></top>
    <div class="center">
      <div class="box">
        <div class="t_box">
          <table>
            <thead>
              <tr>
                <th>序号</th>
                <th>序列号</th>
                <th>名称</th>
                <th @click="InvalidClick">
                  失效日期
                  <em :class="{'order':invalid}"></em>
                </th>
                <th @click="EffectiveClick">
                  生效日期
                  <em :class="{'order':effective}"></em>
                </th>
                <th>详情</th>
                <th>状态</th>
                <th>回收</th>
                <th>回收号</th>
              </tr>
            </thead>
          </table>
          <div class="scorll">
            <table>
              <tbody>
                <tr v-for="(item,index) in loss_arr" :key="index">
                  <td>{{item.index}}</td>
                  <td>{{item.serial}}</td>
                  <td>{{item.name}}</td>
                  <td>{{item.invaliddata}}</td>
                  <td>{{item.effectivedata}}</td>
                  <td @click="Details(item,index)"><img src="../assets/images/详情.png" alt=""></td>
                  <td>
                    <div class="td_state" @click="show_td = true;td_num=index">
                        {{item.state}}<span></span>
                        <div class="ul" v-if="td_num==index&&show_td">
                            <div class="li" @click.stop="item.state='待用';show_td=false">待用</div>
                            <div class="li" @click.stop="item.state='已用';show_td=false">已用</div>
                            <div class="li" @click.stop="item.state='失效';show_td=false">失效</div>
                        </div>
                    </div>
                  </td>
                  <td>{{item.recovery}}</td>
                  <td>{{item.recoverynum}}</td>
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
      <div class="show_box" v-if="!showsort" @click.stop="">
        <div class="s_b_top">
          高级筛选
        </div>
        <div class="s_b_center" >
            <div class="s_li">
                <div class="s_left">
                    日期类型
                </div>
                <div class="s_right">
                    <div class="check_box" @click.stop="datenum=0">
                        <div class="quan" :class="{'check_q':datenum==0}"><em v-if="datenum==0"></em></div>
                        灭菌日期
                    </div>
                    <div class="check_box" @click.stop="datenum=1">
                        <div class="quan" :class="{'check_q':datenum==1}"><em v-if="datenum==1"></em></div>
                        失效日期
                    </div>
                    <div class="check_box" @click.stop="datenum=2">
                        <div class="quan" :class="{'check_q':datenum==2}"><em v-if="datenum==2"></em></div>
                        使用日期
                    </div>
                </div>
            </div>
            <div class="s_li">
                <div class="s_left">
                    日期范围
                </div>
                <div class="s_right">
                    <div class="check_time">
                        <input type="date" v-model="star_date">
                    </div>
                    <div class="zhi">至</div>
                    <div class="check_time">
                        <input type="date" v-model="end_date">
                    </div>
                </div>
            </div>
            <div class="s_li">
                <div class="s_left">
                    状态
                </div>
                <div class="s_right">
                    <div class="check_box" @click.stop="statenum=0">
                        <div class="kuang" :class="{'check_k':statenum==0}"></div>
                        全部
                    </div>
                    <div class="check_box" @click.stop="statenum=1">
                        <div class="kuang" :class="{'check_k':statenum==1}"></div>
                        已完成
                    </div>
                    <div class="check_box" @click.stop="statenum=2">
                        <div class="kuang" :class="{'check_k':statenum==2}"></div>
                        未开始
                    </div>
                    <div class="check_box" @click.stop="statenum=3">
                        <div class="kuang" :class="{'check_k':statenum==3}"></div>
                        已撤销
                    </div>
                </div>
            </div>
            <div class="s_li">
                <div class="s_left">
                    回收
                </div>
                <div class="s_right">
                    <div class="check_box" @click.stop="rnum=0">
                        <div class="kuang" :class="{'check_k':rnum==0}"></div>
                        全部
                    </div>
                    <div class="check_box" @click.stop="rnum=1">
                        <div class="kuang" :class="{'check_k':rnum==1}"></div>
                        是
                    </div>
                    <div class="check_box" @click.stop="rnum=2">
                        <div class="kuang" :class="{'check_k':rnum==2}"></div>
                        否
                    </div>
                </div>
            </div>
            <div class="s_li">
                <div class="s_left">
                    消毒包号
                </div>
                <div class="s_right">
                    <div class="ipt">
                        <div>XDB</div> <input type="text" v-model="disinfectionnum">
                    </div>
                </div>
            </div>
            <div class="s_li">
                <div class="s_left">
                    回收号
                </div>
                <div class="s_right">
                    <div class="ipt">
                        <div>HS</div> <input type="text" v-model="recoverynum">
                    </div>
                </div>
            </div>
        </div>
        <div class="s_b_btn">
          <div>确定</div>
          <div @click.stop="show=false">取消</div>
        </div>
      </div>
      <div class="show_box1" v-if="showsort">
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
export default {
  name: "R_disinfect",
  components: {
    top
  },
  data() {
    return {
      top_data: {
        title: "消毒包",
        left_state: "1",
        right_state: "3",
        right_arr: [{ title: require("../assets/images/筛选.png"),state:3 }]
      },
      loss_arr: [
        {
          index: 1,
          serial:'XDB001',
          name: "蛀牙刀",
          invaliddata: '02-03-20 12:00',
          effectivedata: '02-03-20 12:00',
          state: "待用",
          recovery:'否',
          recoverynum:'-'
        },
        {
          index: 2,
          serial:'XDB002',
          name: "蛀牙刀",
          invaliddata: '02-03-20 16:00',
          effectivedata: '02-03-20 14:00',
          state: "待用",
          recovery:'否',
          recoverynum:'-'
        }
      ],
      show: false,
      invalid: false,
      effective: false,
      show_td:false,
      td_num:0,
      datenum:0,
      star_date:'02-03-03',
      end_date:'02-03-03',
      statenum:0,
      rnum:0,
      disinfectionnum:'',
      recoverynum:'',
      showsort:false,
    };
  },
  mounted() {},
  methods: {
    LossShow(e) {
      this.show = true;
        this.showsort = false
    },
    Details(item,index){
        this.show = true
        this.showsort = true
    },
    InvalidClick() {
      this.invalid = !this.invalid;
      this.invalid
        ? this.loss_arr.sort(this.compare("invaliddata"))
        : this.loss_arr.sort(this.compare("invaliddata", "1"));
    },
    EffectiveClick() {
      this.effective = !this.effective;
      this.effective
        ? this.loss_arr.sort(this.compare("effectivedata"))
        : this.loss_arr.sort(this.compare("effectivedata", "1"));
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
.R_disinfect {
  width: 100%;
  height: 100vh;
  .center {
    width: 100%;
    height: calc((100% - 100px) - 110px);
    padding: 20px;
    padding-bottom: 10px;
    .box {
      width: 100%;
      height: 100%;
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
              width: 152px;
            }
            th:nth-child(2) {
              width: 180px;
            }
            th:nth-child(3) {
              width: 188px;
            }
            th:nth-child(4) {
              width: 300px;
            }
            th:nth-child(5) {
              width: 300px;
            }
            th:nth-child(6) {
              width: 150px;
            }
            th:nth-child(7) {
              width: 240px;
            }
            th:nth-child(8) {
              width: 180px;
            }
            th:last-child {
              border-right-color: transparent;
              width: 188px;
            }
            td {
              height: 146px;
              border: 1px solid rgba(203, 203, 203, 1);
              text-align: center;
              line-height: 46px;
            //   padding: 40px;
              font-size: 32px;
              font-family: Source Han Sans CN;
              font-weight: 400;
              color: rgba(49, 50, 50, 1);
              vertical-align: middle;
              .td_state {
                width:157px;
                height:70px;
                line-height: 70px;
                text-align: center;
                margin: 0 auto;
                border:1px solid rgba(120,120,120,1);
                border-radius:10px;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-wrap: wrap;
                position: relative;
                span {
                    display: inline-block;
                    width: 20px;
                    height: 20px;
                    border:1px solid rgba(49,50,50,1);
                    border-color: transparent transparent rgba(49,50,50,1) rgba(49,50,50,1);
                    transform: rotate(-45deg);
                    margin-left: 17px;
                }
                .ul {
                    width: 100%;
                    background-color: #fff;
                    border: 1px solid rgba(49,50,50,1);
                    border-top-color: transparent;
                    z-index: 9;
                }
              }
              .check {
                border: 1px solid rgba(9, 200, 193, 1);
              }
              img {
                width: 52px;
                // height: 40px;
              }
            }
            td:first-child {
              width: 160px;
            }
            td:nth-child(2) {
              width: 168px;
            }
            td:nth-child(3) {
              width: 192px;
            }
            td:nth-child(4) {
              width: 300px;
            }
            td:nth-child(5) {
              width: 300px;
            }
            td:nth-child(6) {
              width: 150px;
            }
            td:nth-child(7) {
              width: 230px;
            }
            td:nth-child(8) {
              width: 186px;
            }
            td:last-child {
              border-right-color: transparent;
              width: 198px;
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
    .f_c {
      flex: 1;
      text-align: right;
      padding-right: 30px;
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
      .s_b_btn div:active {
        box-shadow:0px 8px 0px 0px rgba(4,117,130,1) inset;
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
