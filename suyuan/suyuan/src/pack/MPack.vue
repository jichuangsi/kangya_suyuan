<template>
  <div class="Pack">
    <top :top_data="top_data"></top>
    <div class="center">
      <div class="box">
        <div class="t_box">
          <table>
            <thead>
              <tr>
                <!-- <th>多选</th>
                <th>序列</th> -->
                <th>清洗批次</th>
                <!-- <th>清洗负责人</th>
                <th @click="OrderClick">
                  清洗时间
                  <em :class="{'order':order}"></em>
                </th> -->
                <th>器械总量</th>
                <th>备注</th>
                <th>详情</th>
              </tr>
            </thead>
          </table>
          <div class="scorll">
            <table>
              <tbody>
                <tr v-for="(item,index) in pack_arr" :key="index">
                  <!-- <td>
                    <div :class="{'check':item.state==1}" @click="PackClick(index)"></div>
                  </td>
                  <td>{{item.index}}</td> -->
                  <td>
                    <div :class="{'check':item.state==1}" @click="PackClick(index)"></div>
                    <span>{{item.batch}}</span>
                  </td>
                  <!-- <td>{{item.conscientious}}</td> -->
                  <!-- <td>{{item.time}}</td> -->
                  <td>{{item.num}}</td>
                  <td>{{item.mark}}</td>
                  <td @click="Details(item,index)"><img src="../assets/images/详情.png" alt=""></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="foot">
        <div class="f_li">负责员工号：<span>001</span></div>
        <div class="f_li">负责员工姓名：<span>王家骥</span></div>
        <div class="f_li">待回收器械：<span>500</span></div>
        <div class="f_li">选中器械：<span>300</span></div>
        <div class="f_li">报损/报失器械：<span>2</span></div>
        <div class="f_li">合计回收器械：<span>500</span></div>
        <div class="f_btn">
          <div @click="Change">打包</div>
        </div>
      </div>
    </div>
    <div class="show" v-if="show" @click="show=false">
      <div class="show_box1" v-if="shownum == 0" @click.stop="">
          <div class="s_top">
              人员切换
          </div>
          <div class="s_center">
              <div class="title">
                  经检查质检人员需与之前步骤参与人员不同 请输入以下信息进行人员切换：
              </div>
              <div class="li">
                  <div>工号：</div> <input type="text" v-model="jobnumber">
              </div>
              <div class="li">
                  <div>密码：</div> <input type="password" v-model="psw">
              </div>
          </div>
          <div class="s_btn" @click.stop="shownum = 1">
              确定
          </div>
      </div>
      <div class="show_box2" v-if="shownum == 1" @click.stop="">
        <div class="title_bli">
          <div>负责员工号：</div>
          <div>001</div>
        </div>
        <div class="title_bli">
          <div>负责员工姓名：</div>
          <div>王佳佳</div>
        </div>
        <div class="box">
          <div class="t_box">
            <table>
              <thead>
                <tr>
                  <!-- <th>序号</th> -->
                  <th>器械名称</th>
                  <th>总量</th>
                  <th>损失</th>
                  <th>损失详情</th>
                  <!-- <th>备注</th> -->
                </tr>
              </thead>
            </table>
            <div class="scorll">
              <table>
                <tbody>
                  <tr v-for="(item,index) in num_arr" :key="index">
                    <!-- <td>{{item.index}}</td> -->
                    <td>{{item.name}}</td>
                    <td>{{item.num}}</td>
                    <td @click="errorshow=true"><img src="../assets/images/损失.png" alt=""></td>
                    <td>{{item.details}}</td>
                    <!-- <td>{{item.mark}}</td> -->
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="s_title" v-if="errorshow">损失列表 <div @click.stop="show1=true">新增</div></div>
        <div class="box1 box" v-if="errorshow">
          <div class="t_box">
            <table>
              <thead>
                <tr>
                  <th>数量</th>
                  <th>原因</th>
                  <th>删除</th>
                </tr>
              </thead>
            </table>
            <div class="scorll">
              <table>
                <tbody>
                  <tr v-for="(item,index) in error_arr" :key="index">
                    <td>{{item.num}}</td>
                    <td>{{item.reason}}</td>
                    <td @click="Del(index)"><img src="../assets/images/删除.png" alt=""></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="s_btn">
            <!-- <span>共选择器械包：198   损失/重洗：3</span> -->
            <div @click.stop="show=false">确定</div>
            <div @click.stop="show=false">取消</div>
            <!-- <div>预览条形码</div>
            <div>打印条形码</div> -->
        </div>
      </div>
      <div class="show_box4" v-if="shownum == 2" @click.stop="">
        <div class="box">
          <div class="t_box">
            <table>
              <thead>
                <tr>
                  <th>序号</th>
                  <th>消毒包名称</th>
                  <th>数量</th>
                  <th>备注</th>
                </tr>
              </thead>
            </table>
            <div class="scorll">
              <table>
                <tbody>
                  <tr v-for="(item,index) in details_arr" :key="index">
                    <td>{{item.index}}</td>
                    <td>{{item.num}}</td>
                    <td>{{item.name}}</td>
                    <td>{{item.mark}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="s_btn">
            <span>共选择消毒包：50</span>
            <div @click.stop="show=false">确定</div>
        </div>
      </div>
    </div>
    <div class="show" v-if="show1" @click="show1=false">
        <div class="show_box3" @click.stop="">
            <div class="s_top">
                新增损失/重洗
            </div>
            <div class="s_center">
                <div class="div">
                    <input type="number" placeholder="数量" v-model="num">
                </div>
                <div class="div" @click.stop="zshow1=true">
                    {{reason}}
                    <div class="ul" v-if="zshow1">
                        <div class="li" @click.stop="reason=item;zshow1=false" v-for="(item,index) in reason_arr" :key="index">{{item}}</div>
                    </div>
                </div>
            </div>
            <div class="s_btn" @click.stop="show1=false">确定</div>
        </div>
    </div>
  </div>
</template>

<script>
import top from "@/components/MTop";
export default {
  name: "Pack",
  components: {
    top
  },
  data() {
    return {
      top_data: {
        title: "打包",
        left_state: "1",
        right_state: "1",
        right_arr: [
          // { title: "清洗", path: "/P_clean",quer:'',state:1 },
          { title: "反馈", path: "/MFeedback",quer:'打包',state:1 }
        ]
      },
      pack_arr: [
        {
          state: 0,
          index: 1,
          batch: "HS001",
          conscientious: '王家骥',
          time:'02-03-02 12:00',
          mark:'正常',
          num:298
        },
        {
          state: 0,
          index: 1,
          batch: "HS001",
          conscientious: '王家骥',
          time:'02-03-02 13:00',
          mark:'正常',
          num:298
        }
      ],
      num_arr: [
        {
          state:0,
          index: '1',
          name: "医用剪刀",
          num:99,
          details:'报损*1',
          mark: ""
        },
        {
          state:0,
          index: '1',
          name: "医用剪刀",
          num:99,
          details:'报损*1',
          mark: ""
        }
      ],
      error_arr:[
        {
          num:2,
          reason:'有血迹',
          operation:'重洗',
        },
        {
          num:3,
          reason:'有血迹',
          operation:'重洗',
        }
      ],
      jobnumber:'',
      psw:'',
      show1:false,
      order: false,
      show:false,
      shownum:0,
      errorshow:false,
      num:'',
      reason:'原因',
      reason_arr:['报损','报失','重洗'],
      zshow:false,
      zshow1:false,
      details_arr:[
        {
          index:1,
          num:100,
          name:'蛀牙包',
          mark:'医用剪刀*50',
        },
        {
          index:2,
          num:100,
          name:'蛀牙包',
          mark:'医用剪刀*50',
        }
      ],
    };
  },
  mounted() {},
  methods: {
    Change(){
      this.$router.push({ path: "/MPacking" });
    },
    NumClick(index){
      this.num_arr[index].state =
        this.num_arr[index].state == 1 ? 0 : 1;
    },
    PackClick(index) {
      this.pack_arr[index].state =
        this.pack_arr[index].state == 1 ? 0 : 1;
    },
    Del(index){
        this.error_arr.splice(index,1)
    },
    Details(item,index){
        this.show = true
        this.shownum = 1
    },
    OrderClick() {
      this.order = !this.order;
      this.order
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
.Pack {
  width: 100%;
  height: 100vh;
  .center {
    width: 100%;
    height: calc((100% - 88px));
    padding: 20px;
    padding-bottom: 10px;
    .box {
      width: 100%;
      height: 50%;
      // border: 1px solid rgba(203, 203, 203, 1);
      .t_box {
        width: 100%;
        height: 100%;
        position: relative;
        table {
          width: 100%;
          border: 1px solid rgba(203, 203, 203, 1);
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
              width: 217px;
            }
            th:nth-child(2) {
              width: 185px;
            }
            th:nth-child(3) {
              width: 141px;
            }
            th:last-child {
              border-right: none;
              width: 143px;
            }
            td {
              height: 146px;
              border-bottom: 1px solid rgba(203, 203, 203, 1);
              border-right: 1px solid rgba(203, 203, 203, 1);
              text-align: center;
              line-height: 46px;
              font-size: 30px;
              font-family: Source Han Sans CN;
              font-weight: 400;
              color: rgba(49, 50, 50, 1);
              vertical-align: middle;
              div {
                display: inline-block;
                width: 44px;
                height: 44px;
                border: 1px solid rgba(190, 190, 190, 1);
                margin: 0 auto;
                vertical-align: middle;
              }
              .check {
                width: 54px;
                height: 48px;
                // border: 1px solid rgba(9, 200, 193, 1);
                border: none;
                background: url('../assets/images/勾选.png') center center no-repeat;
                background-size: 100% 100%;
              }
              img {
                  width: 52px;
              }
            }
            td:first-child {
              width: 217px;
            }
            td:nth-child(2) {
              width: 185px;
            }
            td:nth-child(3) {
              width: 141px;
            }
            td:last-child {
              border-right: none;
              width: 143px;
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
    height: 50%;
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
    .show_box1 {
      width:80%;
      // height:726px;
      background: rgba(255, 255, 255, 1);
      position: relative;
      padding-bottom: 40px;
      .s_top {
        width:100%;
        height:88px;
        line-height: 88px;
        text-align: center;
        font-size:40px;
        font-family:Source Han Sans CN;
        font-weight:500;
        color:rgba(255,255,255,1);
        background:rgba(0,170,164,1);
      }
      .s_center {
          padding: 40px;
          padding-bottom: 0px;
          .title {
            line-height: 50px;
            font-size:34px;
            font-family:Source Han Sans CN;
            font-weight:500;
            color:rgba(43,43,43,1);
            margin-bottom: 80px;
            padding-bottom: 0px;
          }
          .li {
            font-size:34px;
            font-family:Source Han Sans CN;
            font-weight:500;
            color:rgba(108,109,109,1);
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto;
            margin-bottom: 50px;
            input {
                width:346px;
                height:64px;
                border:2px solid rgba(120,120,120,1);
                border-radius:10px;
                font-size:34px;
                text-indent: 40px;
                margin-left: 40px;
            }
          }
      }
      .s_btn {
        width:180px;
        height:74px;
        line-height: 74px;
        text-align: center;
        font-size:40px;
        font-family:Source Han Sans CN;
        font-weight:400;
        color:rgba(255,255,255,1);
        background:rgba(19,206,199,1);
        box-shadow:0px 8px 0px 0px rgba(4,117,130,1);
        border-radius:37px;
        margin: 0 auto;
      }
      .s_btn:active {
        box-shadow:0px 8px 0px 0px rgba(4,117,130,1) inset;
      }
    }
    .show_box2 {
      width: 90%;
      height: 90%;
      background-color: #fff;
      padding: 20px;
      position: relative;
      .title_bli {
        display: flex;
        justify-content: space-between;
        font-size:34px;
        line-height: 66px;
        font-family:PingFang SC;
        font-weight:500;
        color:rgba(40,40,40,1);
      }
      .box {
        width: 100%;
        height: 40%;
        border: 1px solid rgba(203, 203, 203, 1);
        overflow: hidden;
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
                width: 210px;
              }
              th:nth-child(2) {
                width: 244px;
              }
              th:nth-child(3) {
                width: 192px;
              }
              th:nth-child(4) {
                width: 196px;
              }
              th:last-child {
                border-right: none;
                width: 248px;
              }
              .te {
                width: 140px;
              }
              td {
                height: 106px;
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
                img {
                    width: 56px;
                }
              }
              td:first-child {
                width: 210px;
              }
              td:nth-child(2) {
                width: 244px;
              }
              td:nth-child(3) {
                width: 192px;
              }
              td:nth-child(4) {
                width: 196px;
              }
              td:last-child {
                border-right: none;
                width: 248px;
              }
              .te {
                width: 140px;
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
      .s_title {
          line-height: 106px;
          font-size:34px;
        font-family:Source Han Sans CN;
        font-weight:400;
        color:rgba(66,66,66,1);
        display: flex;
        align-items: center;
        div {
            width:177px;
            height:64px;
            line-height: 64px;
            background: rgba(19, 206, 199, 1);
            box-shadow: 0px 10px 0px 0px rgba(4, 117, 130, 1);
            border-radius: 10px;
            font-size: 36px;
            color: rgba(255, 255, 255, 1);
            text-align: center;
            float: right;
            margin-left: 40px;
        }
        div:active {
            box-shadow: 0px 8px 0px 0px rgba(4, 117, 130, 1) inset;
        }
      }
      .box1 {
          width: 100%;
          height: 33%;
          .t_box {
              height:100%;
          }
      }
      .s_btn {
          position: absolute;
          right: 43px;
          bottom: 23px;
          display: flex;
          align-items: center;
      }
      .s_btn div {
        width: 181px;
        height: 74px;
        background: rgba(19, 206, 199, 1);
        box-shadow: 0px 10px 0px 0px rgba(4, 117, 130, 1);
        border-radius: 45px;
        font-size: 36px;
        color: rgba(255, 255, 255, 1);
        text-align: center;
        line-height: 90px;
        float: right;
        margin-left: 40px;
      }
      .s_btn div:active {
        box-shadow: 0px 8px 0px 0px rgba(4, 117, 130, 1) inset;
      }
      .s_btn span {
        font-size:36px;
        font-family:Source Han Sans CN;
        font-weight:400;
        color:rgba(49,50,50,1);
      }
    }
    .show_box3 {
      width:80%;
      // height:626px;
      background: rgba(255, 255, 255, 1);
      position: relative;
      padding-bottom: 40px;
      .s_top {
        width:100%;
        height:88px;
        line-height: 88px;
        text-align: center;
        font-size:40px;
        font-family:Source Han Sans CN;
        font-weight:500;
        color:rgba(255,255,255,1);
        background:rgba(0,170,164,1);
      } 
      .s_center {
          padding: 40px;
          padding-bottom: 0px;
          .div {
            width: 100%;
            height:64px;
            line-height: 64px;
            text-align: center;
            border:2px solid rgba(120,120,120,1);
            border-radius:10px;
            margin-bottom: 40px;
            position: relative;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            font-size: 36px;
            font-family: Source Han Sans CN;
            font-weight: 400;
            color: rgba(49, 50, 50, 1);
            input {
                font-size: 34px;
                width: 100%;
                height: 100%;
                text-align: center;
                border-radius:10px;
            }
            .ul {
                width: 100%;
                background-color: #fff;
                z-index: 1;
                border: 1px solid rgba(120,120,120,1);
                border-top: transparent;
            }
          }
      }
      .s_btn {
        width:180px;
        height:74px;
        line-height: 74px;
        text-align: center;
        font-size:40px;
        font-family:Source Han Sans CN;
        font-weight:400;
        color:rgba(255,255,255,1);
        background:rgba(19,206,199,1);
        box-shadow:0px 8px 0px 0px rgba(4,117,130,1);
        border-radius:37px;
        margin: 0 auto;
      }
      .s_btn:active {
        box-shadow:0px 8px 0px 0px rgba(4,117,130,1) inset;
      }
    }
    .show_box4 {
        width:1128px;
        height:582px;
        background:rgba(255,255,255,1);
        padding: 40px;
        .box {
            width: 100%;
            height: 308px;
            border: 1px solid rgba(203, 203, 203, 1);
            overflow: hidden;
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
                    width: 210px;
                }
                th:nth-child(2) {
                    width: 244px;
                }
                th:nth-child(3) {
                    width: 192px;
                }
                th:nth-child(4) {
                    width: 196px;
                }
                th:last-child {
                    border-right: none;
                    width: 248px;
                }
                .te {
                    width: 140px;
                }
                td {
                    height: 106px;
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
                    img {
                        width: 56px;
                    }
                }
                td:first-child {
                    width: 210px;
                }
                td:nth-child(2) {
                    width: 244px;
                }
                td:nth-child(3) {
                    width: 192px;
                }
                td:nth-child(4) {
                    width: 196px;
                }
                td:last-child {
                    border-right: none;
                    width: 248px;
                }
                .te {
                    width: 140px;
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
        .s_btn {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            margin-top: 80px;
            font-size:36px;
            font-family:Source Han Sans CN;
            font-weight:400;
            color:rgba(49,50,50,1);
            div {
                width:180px;
                height:74px;
                line-height: 74px;
                text-align: center;
                font-size:40px;
                font-family:Source Han Sans CN;
                font-weight:400;
                color:rgba(255,255,255,1);
                background:rgba(19,206,199,1);
                box-shadow:0px 8px 0px 0px rgba(4,117,130,1);
                border-radius:37px;
                margin-right: 40px;
                margin-left: 40px;
            }
            div:active {
                box-shadow:0px 8px 0px 0px rgba(4,117,130,1) inset;
            }
        }
    }
  }
}
</style>
