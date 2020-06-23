<template>
  <div class="Guidance">
    <top :top_data="top_data" @LossShow="LossShow"></top>
    <div class="center">
      <div class="box">
        <div class="t_box">
          <table>
            <thead>
              <tr>
                <th>病历号</th>
                <!-- <th>姓名</th> -->
                <th>位置</th>
                <!-- <th>床位</th> -->
                <th>关联日期</th>
                <th>进入</th>
              </tr>
            </thead>
          </table>
          <div class="scorll">
            <table>
              <tbody>
                <tr v-for="(item,index) in guidance_arr" :key="index">
                  <td>{{item.index}}</td>
                  <!-- <td>{{item.name}}</td> -->
                  <td>{{item.unit}}{{item.bednum}}</td>
                  <!-- <td>{{item.bednum}}</td> -->
                  <td>{{item.time}}</td>
                  <td @click="Go(item,index)">
                    <img src="../assets/images/进入.png" alt />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>  
      <div class="foot">
        <div class="f_btn" @click="OnShow">
          <div>新增</div>
        </div>
      </div>
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
                    病历号
                </div>
                <div class="s_right">
                    <div class="ipt">
                        <input type="text" v-model="medicalnum">
                    </div>
                </div>
            </div>
            <div class="s_li">
                <div class="s_left">
                    姓名
                </div>
                <div class="s_right">
                    <div class="ipt">
                        <input type="text" v-model="name">
                    </div>
                </div>
            </div>
            <div class="s_li">
                <div class="s_left">
                    负责护士
                </div>
                <div class="s_right">
                    <div class="sel" @click.stop="selshow=true">
                        {{nurse}}
                        <em></em>
                        <div class="ul" v-if="selshow">
                            <div class="li" v-for="(item,index) in nurse_arr" :key="index" @click.stop="nurse=item;selshow=false">{{item}}</div>
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
      <div class="show_box" v-if="showsort">
        <div class="s_b_top">
          新增病人
        </div>
        <div class="s_b_center" >
            <div class="s_li">
                <div class="s_right">
                    <div class="iptbox">
                        <input type="text" v-model="medicalnum" placeholder="病历号">
                    </div>
                </div>
            </div>
            <div class="s_li">
                <div class="s_right">
                    <div class="iptbox">
                        <input type="text" v-model="name" placeholder="姓名">
                    </div>
                </div>
            </div>
            <div class="s_li">
                <div class="s_title">诊室</div>
                <div class="s_right">
                    <div class="check_box" @click.stop="unitnum=0">
                        <div class="quan" :class="{'check_q':unitnum==0}"><em v-if="unitnum==0"></em></div>
                        诊室1
                    </div>
                    <div class="check_box" @click.stop="unitnum=1">
                        <div class="quan" :class="{'check_q':unitnum==1}"><em v-if="unitnum==1"></em></div>
                        诊室2
                    </div>
                    <div class="check_box" @click.stop="unitnum=2">
                        <div class="quan" :class="{'check_q':unitnum==2}"><em v-if="unitnum==2"></em></div>
                        诊室3
                    </div>
                    <div class="check_box" @click.stop="unitnum=3">
                        <div class="quan" :class="{'check_q':unitnum==3}"><em v-if="unitnum==3"></em></div>
                        诊室4
                    </div>
                </div>
            </div>
            <div class="s_li">
                <div class="s_title">床位</div>
                <div class="s_right">
                    <div class="check_box" @click.stop="bednum=0">
                        <div class="quan" :class="{'check_q':bednum==0}"><em v-if="bednum==0"></em></div>
                        床位1
                    </div>
                    <div class="check_box" @click.stop="bednum=1">
                        <div class="quan" :class="{'check_q':bednum==1}"><em v-if="bednum==1"></em></div>
                        床位2
                    </div>
                    <div class="check_box" @click.stop="bednum=2">
                        <div class="quan" :class="{'check_q':bednum==2}"><em v-if="bednum==2"></em></div>
                        床位3
                    </div>
                    <div class="check_box" @click.stop="bednum=3">
                        <div class="quan" :class="{'check_q':bednum==3}"><em v-if="bednum==3"></em></div>
                        床位4
                    </div>
                </div>
            </div>
        </div>
        <div class="s_b_btn">
          <div class="relation" @click.stop="show=false">关联</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import top from "@/components/Top";
export default {
  name: "Guidance",
  components: {
    top
  },
  data() {
    return {
      top_data: {
        title: "导诊",
        left_state: "1",
        right_state: "1",
        right_arr: [
          // { title: require("../assets/images/筛选.png"), state: 3 },
          // { title: "新增", state: 2 },
          { title: "反馈", path: "/Feedback",quer:'导诊', state: 1 }
        ]
      },
      guidance_arr: [
        {
          index: "BL0011",
          unit: "诊室1",
          name: "王家骥",
          bednum: "1",
          time: "02-02-03 12:00"
        },
        {
          index: "BL0011",
          unit: "诊室1",
          name: "王家骥",
          bednum: "1",
          time: "02-02-03 12:00"
        }
      ],
      show:false,
      showsort:false,
      medicalnum:'',
      name:'',
      nurse:'王佳佳',
      nurse_arr:['王佳佳','王家骥'],
      selshow:false,
      unitnum:0,
      bednum:0,
      star_date:'02-03-03',
      end_date:'02-03-03',
    };
  },
  mounted() {
  },
  methods: {
    OnShow() {
      this.show=true,
      this.showsort=true
    },
    Go(item,index){
      this.$router.push({path:'/G_into',query:{item:item}})
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.Guidance {
  width: 100%;
  height: 100vh;
  .center {
    width: 100%;
    height: calc((100% - 88px));
    padding: 20px;
    padding-bottom: 10px;
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
              font-size: 30px;
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
              width: 124px;
            }
            th:nth-child(2) {
              width: 246px;
            }
            th:nth-child(3) {
              width: 205px;
            }
            th:last-child {
              border-right: none;
              width: 110px;
            }
            td {
              height: 146px;
              border-right: 1px solid rgba(203, 203, 203, 1);
              border-bottom: 1px solid rgba(203, 203, 203, 1);
              text-align: center;
              line-height: 46px;
              font-size: 30px;
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
              img {
                width: 45px;
              }
            }
            td:first-child {
              width: 124px;
            }
            td:nth-child(2) {
              width: 246px;
            }
            td:nth-child(3) {
              width: 205px;
            }
            td:last-child {
              border-right: none;
              width: 110px;
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
    height: 10%;
    background: rgba(255, 255, 255, 1);
    // box-shadow: 0px 0px 7px 0px rgba(4, 49, 51, 0.15);
    border-top: 1px solid rgba(190, 190, 190, 1);
    padding: 0 40px;
    // display: flex;
    // flex-wrap: wrap;
    // justify-content: space-between;
    // align-items: center;
    position: relative;
    div {
      width: 100%;
      display: inline-block;
      font-size: 30px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: rgba(49, 50, 50, 1);
      div {
          // width: 181px;
          // height: 74px;
          // background: rgba(19, 206, 199, 1);
          // box-shadow: 0px 10px 0px 0px rgba(4, 117, 130, 1);
          // border-radius: 45px;
          // font-size: 30px;
          // color: rgba(255, 255, 255, 1);
          // text-align: center;
          // line-height: 74px;
      }
      div:active {
        box-shadow: 0px 8px 0px 0px rgba(4, 117, 130, 1) inset;
      }
    }
    .f_li {
      font-size: 34px;
      height: 76px;
      line-height: 76px;
      display: flex;
      justify-content: space-between;
    }
    .f_btn {
      div {
        width: 181px;
        height: 74px;
        background: rgba(19, 206, 199, 1);
        box-shadow: 0px 10px 0px 0px rgba(4, 117, 130, 1);
        border-radius: 45px;
        font-size: 30px;
        color: rgba(255, 255, 255, 1);
        text-align: center;
        line-height: 74px;
        position: absolute;
        right: 30px;
        bottom: 35px;
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
      width: 90%;
      // height: 877px;
      background: rgba(255, 255, 255, 1);
      padding-bottom: 40px;
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
                    margin-right: 20px;
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
