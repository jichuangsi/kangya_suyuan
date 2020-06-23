<template>
  <div class="I_pack">
    <top :top_data="top_data" @LossShow="LossShow"></top>
    <div class="center">
      <div class="box">
        <div class="t_box">
          <table>
            <thead>
              <tr>
                <th>序号</th>
                <th>序列号</th>
                <th>负责人</th>
                <th @click="TimeClick">
                    日期
                  <em :class="{'order':timeorder}"></em>
                </th>
                <th colspan='3' class="te">消毒包</th>
                <th>质检号</th>
                <th>详情</th>
                <th>状态</th>
              </tr>
              <tr>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th>总量</th>
                <th>不合格</th>
                <th>需质检</th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </thead>
          </table>
          <div class="scorll">
            <table>
              <tbody>
                <tr v-for="(item,index) in pack_arr" :key="index">
                  <td>{{item.index}}</td>
                  <td>{{item.serial}}</td>
                  <td>{{item.conscientious}}</td>
                  <td>{{item.time}}</td>
                  <td>{{item.num}}</td>
                  <td>{{item.unqualified}}</td>
                  <td>{{item.inspection}}</td>
                  <td>{{item.inspectionnumber}}</td>
                  <td @click="Details(item,index)"><img src="../assets/images/详情.png" alt=""></td>
                  <td>
                    <div class="td_state" :class="{'td_red':item.state!='已完成'}" @click="show_td = true;td_num=index">
                        {{item.state}}<span></span>
                        <div class="ul" v-if="td_num==index&&show_td">
                            <div class="li" @click.stop="item.state='已完成';show_td=false">已完成</div>
                            <div class="li" @click.stop="item.state='未完成';show_td=false">未完成</div>
                            <div class="li" @click.stop="item.state='已撤回';show_td=false">已撤回</div>
                        </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div class="foot">
    </div>
    <div class="show" v-if="show" @click="show=false">
      <div class="show_box" v-if="!showsort" @click.stop="">
        <div class="s_b_top">
          高级筛选
        </div>
        <div class="s_b_center" >
            <div class="s_li">
                <div class="s_left">
                    关联日期
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
                    灭菌号
                </div>
                <div class="s_right">
                    <div class="ipt">
                        <div>QX</div> <input type="text" v-model="qxnumber">
                    </div>
                </div>
            </div>
            <div class="s_li">
                <div class="s_left">
                    质检号
                </div>
                <div class="s_right">
                    <div class="ipt">
                        <div>DB</div> <input type="text" v-model="dbnumber">
                    </div>
                </div>
            </div>
            <div class="s_li">
                <div class="s_left">
                    灭菌负责人
                </div>
                <div class="s_right">
                    <div class="sel" @click.stop="selshow=true">
                        {{sterilization}}
                        <em></em>
                        <div class="ul" v-if="selshow">
                            <div class="li" v-for="(item,index) in sterilization_arr" :key="index" @click.stop="sterilization=item;selshow=false">{{item}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="s_b_btn">
          <div>确定</div>
          <div @click.stop="show=false">取消</div>
        </div>
      </div>
      <div class="show_box1" v-if="showsort" @click.stop="">
        <div class="box">
          <div class="t_box">
            <table>
              <thead>
                <tr>
                  <th>打包序号</th>
                  <th>负责人</th>
                  <th>日期</th>
                  <th>器械总量</th>
                  <th>详情</th>
                </tr>
              </thead>
            </table>
            <div class="scorll">
              <table>
                <tbody>
                  <tr v-for="(item,index) in details_arr" :key="index">
                    <td>{{item.index}}</td>
                    <td>{{item.conscientious}}</td>
                    <td>{{item.time}}</td>
                    <td>{{item.num}}</td>
                    <td>{{item.mark}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="s_btn" @click.stop="show=false">确定</div>
      </div>
    </div>
  </div>
</template>

<script>
import top from "@/components/Top";
export default {
  name: "I_pack",
  components: {
    top
  },
  data() {
    return {
      top_data: {
        title: "灭菌",
        left_state: "1",
        right_state: "3",
        right_arr: [
          { title: require("../assets/images/筛选.png"), state: 3 }
        ]
      },
      pack_arr: [
        {
          index:1,
          serial: "BL0011",
          unit: "诊室1",
          conscientious: "王家骥",
          num:298,
          inspection:298,
          unqualified: "1",
          inspectionnumber:'ZJ01',
          time: "02-02-03 12:00",
          state:'已完成'
        },
        {
          index:1,
          serial: "BL0011",
          unit: "诊室1",
          conscientious: "王家骥",
          num:298,
          inspection:298,
          unqualified: "1",
          inspectionnumber:'ZJ01',
          time: "02-02-03 13:00",
          state:'已完成'
        }
      ],
      details_arr:[
        {
          index:'HS001',
          conscientious: "王家骥",
          time: "02-02-03 13:00",
          num:298,
          mark:'蛀牙包*50'
        },
        {
          index:'HS001',
          conscientious: "王家骥",
          time: "02-02-03 13:00",
          num:298,
          mark:'蛀牙包*50'
        }
      ],
      show:false,
      showsort:false,
      sterilization:'王佳佳',
      sterilization_arr:['王佳佳','王家骥'],
      selshow:false,
      timeorder:false,
      show_td:false,
      td_num:0,
      statenum:0,
      qxnumber:'',
      dbnumber:'',
      star_date:'02-03-03',
      end_date:'02-03-03',
    };
  },
  mounted() {
  },
  methods: {
    LossShow(val) {
      this.show=true
      this.showsort = false
    },
    Details(item,index){
      this.show=true
      this.showsort = true
    },
    TimeClick(){
      this.timeorder = !this.timeorder;
      this.timeorder
        ? this.pack_arr.sort(this.compare("time"))
        : this.pack_arr.sort(this.compare("time", "1"));
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
.I_pack {
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
              border-bottom: 1px solid rgba(203, 203, 203, 1);
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
              width: 116px;
            }
            th:nth-child(2) {
              width: 168px;
            }
            th:nth-child(3) {
              width: 178px;
            }
            th:nth-child(4) {
              width: 280px;
            }
            th:nth-child(5) {
              width: 154px;
            }
            th:nth-child(6) {
              width: 154px;
            }
            th:nth-child(7) {
              width: 154px;
            }
            th:nth-child(8) {
              width: 256px;
            }
            th:nth-child(9) {
              width: 144px;
            }
            th:last-child {
              border-right: none;
              width: 218px;
            }
            td {
              height: 146px;
              border-right: 1px solid rgba(203, 203, 203, 1);
              border-bottom: 1px solid rgba(203, 203, 203, 1);
              text-align: center;
              line-height: 46px;
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
              .td_red {
                  color:rgba(227,23,23,1);
                  div {
                      color:rgba(49,50,50,1);
                  }
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
              img {
                width: 74px;
              }
            }
            td:first-child {
              width: 116px;
            }
            td:nth-child(2) {
              width: 164px;
            }
            td:nth-child(3) {
              width: 178px;
            }
            td:nth-child(4) {
              width: 280px;
            }
            td:nth-child(5) {
              width: 154px;
            }
            td:nth-child(6) {
              width: 154px;
            }
            td:nth-child(7) {
              width: 154px;
            }
            td:nth-child(8) {
              width: 256px;
            }
            td:nth-child(9) {
              width: 144px;
            }
            td:last-child {
              border-right: none;
              width: 198px;
            }
            .te {
              width: 498px;
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
        width:1738px;
        height:1136px;
        max-width: 90%;
        max-height: 90%;
        background:rgba(255,255,255,1);
        padding: 40px;
        position: relative;
        .box {
            width: 100%;
            height: 90%;
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
                    width: 280px;
                    }
                    th:nth-child(2) {
                    width: 435px;
                    }
                    th:nth-child(3) {
                    width: 350px;
                    }
                    th:nth-child(4) {
                    width: 523px;
                    }
                    th:last-child {
                    border-right: none;
                    width: 252px;
                    }
                    td {
                    height: 146px;
                    border-right: 1px solid rgba(203, 203, 203, 1);
                    border-bottom: 1px solid rgba(203, 203, 203, 1);
                    text-align: center;
                    line-height: 46px;
                    // padding: 40px;
                    font-size: 32px;
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
                        border: 1px solid rgba(9, 200, 193, 1);
                    }
                    img {
                        width: 40px;
                        height: 40px;
                    }
                    }
                    td:first-child {
                    width: 280px;
                    }
                    td:nth-child(2) {
                    width: 435px;
                    }
                    td:nth-child(3) {
                    width: 350px;
                    }
                    td:nth-child(4) {
                    width: 523px;
                    }
                    td:last-child {
                    border-right: none;
                    width: 232px;
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
        .s_btn {
            width:200px;
            height:74px;
            line-height: 74px;
            text-align: center;
            background:rgba(19,206,199,1);
            box-shadow:0px 8px 0px 0px rgba(4,117,130,1);
            border-radius:37px;
            font-size:36px;
            font-family:Source Han Sans CN;
            font-weight:400;
            color:rgba(255,255,255,1);
            position: absolute;
            right: 40px;
            bottom: 40px;
        }
        .s_btn:active {
            box-shadow:0px 8px 0px 0px rgba(4,117,130,1) inset;
        }
    }
  }
}
</style>
