<template>
  <div class="Inspection">
    <top :top_data="top_data"></top>
    <div class="center">
      <div class="box">
        <div class="t_box">
          <table>
            <thead>
              <tr>
                <th>多选</th>
                <th>序列</th>
                <th>打包批次</th>
                <th>打包负责人</th>
                <th @click="OrderClick">
                  打包时间
                  <em :class="{'order':order}"></em>
                </th>
                <th>机械包余量</th>
                <th>备注</th>
                <th>详情</th>
              </tr>
            </thead>
          </table>
          <div class="scorll">
            <table>
              <tbody>
                <tr v-for="(item,index) in inspection_arr" :key="index">
                  <td>
                    <div :class="{'check':item.state==1}" @click="InspectionClick(index)"></div>
                  </td>
                  <td>{{item.index}}</td>
                  <td>{{item.batch}}</td>
                  <td>{{item.conscientious}}</td>
                  <td>{{item.time}}</td>
                  <td>{{item.num}}</td>
                  <td>{{item.mark}}</td>
                  <td @click="Details(item,index)"><img src="../assets/images/详情.png" alt=""></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div class="foot">
      <div class="f_l">工号：001 姓名：王家骥</div>
      <div class="f_c">待灭菌数据包括:500，选中:300 (合格：48；不合格：2)</div>
      <div class="f_r">
        <div @click="Change">检查</div>
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
        <div class="box">
          <div class="t_box">
            <table>
              <thead>
                <tr>
                  <th>灭菌批次号</th>
                  <th>器械包名称</th>
                  <th>数量</th>
                  <th>合格</th>
                  <th colspan='2'>不合格</th>
                  <th>备注</th>
                </tr>
                <tr>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th class="te">数量</th>
                  <th class="te">操作</th>
                  <th></th>
                </tr>
              </thead>
            </table>
            <div class="scorll">
              <table>
                <tbody>
                  <tr v-for="(item,index) in num_arr" :key="index">
                    <td>{{item.index}}</td>
                    <td>{{item.name}}</td>
                    <td>{{item.num}}</td>
                    <td>{{item.qualifiednum}}</td>
                    <td class="te">{{item.unqualifiednum}}</td>
                    <td class="te" @click="errorshow=true"><img src="../assets/images/损失.png" alt=""></td>
                    <td>{{item.mark}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="s_title" v-if="errorshow">不合格列表 <div @click.stop="show1=true">新增</div></div>
        <div class="box1 box" v-if="errorshow">
          <div class="t_box">
            <table>
              <thead>
                <tr>
                  <th>数量</th>
                  <th>原因</th>
                  <th>操作</th>
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
                    <td>{{item.operation}}</td>
                    <td @click="Del(index)"><img src="../assets/images/删除.png" alt=""></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="s_btn">
            <div @click.stop="show=false">取消</div>
            <div @click.stop="show2=true">预览条形码</div>
            <div>打印条形码</div>
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
                新增不合格
            </div>
            <div class="s_center">
                <div class="div">
                    <input type="number" placeholder="数量" v-model="num">
                </div>
                <div class="div" @click.stop="zshow=true">
                    {{operation}}
                    <div class="ul" v-if="zshow">
                        <div class="li" @click.stop="operation=item;zshow=false" v-for="(item,index) in operation_arr" :key="index">{{item}}</div>
                    </div>
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
    <div class="show" v-if="show2" @click="show1=false">
      <div class="show_box5">
        <div class="ul">
          <div class="li">
            <div class="title">物品名称：</div>
            <div class="text">蛀牙包</div>
          </div>
          <div class="li">
              <div class="title">打包负责人：</div>
              <div class="text">001</div>
          </div>
          <div class="li">
              <div class="title">质检负责人：</div>
              <div class="text">002</div>
          </div>
          <div class="li">
              <div class="title">灭菌时间：</div>
              <div class="text">02-03-20 12:00</div>
          </div>
          <div class="li">
              <div class="title">失效时间：</div>
              <div class="text">02-03-23 12:00</div>
          </div>
          <div class="li">
              <div class="title">灭菌炉号：</div>
              <div class="text">01</div>
          </div>
          <div class="li">
              <div class="title">灭菌批次号：</div>
              <div class="text">MJL-01-001</div>
          </div>
          <div class="li">
              <div class="title">灭菌时间：</div>
              <div class="text">02-03-20 12:00</div>
          </div>
          <div class="li">
              <div class="title">数量：</div>
              <div class="text">40</div>
          </div>
          <div class="li">
              <div class="title">二维码码例子：</div>
              <div class="bz"><img src="../assets/images/code.png" alt=""></div>
          </div>
        </div>
        <div class="s_btn" @click.stop="show2=false">打印</div>
      </div>
    </div>
  </div>
</template>

<script>
import top from "@/components/Top";
export default {
  name: "Inspection",
  components: {
    top
  },
  data() {
    return {
      top_data: {
        title: "质检",
        left_state: "1",
        right_state: "1",
        right_arr: [
          { title: "灭菌", path: "/I_pack",quer:'',state:1 },
          { title: "反馈", path: "/Feedback",quer:'质检',state:1 }
        ]
      },
      inspection_arr: [
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
          index: 'XDB001',
          name: "蛀牙包",
          num:99,
          qualifiednum:99,
          unqualifiednum:2,
          mark: ""
        },
        {
          index: 'XDB001',
          name: "蛀牙包",
          num:99,
          qualifiednum:99,
          unqualifiednum:2,
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
      show2:false,
      order: false,
      show:false,
      shownum:0,
      errorshow:false,
      num:'',
      operation:'操作',
      reason:'原因',
      operation_arr:['重洗','重打','重灭'],
      reason_arr:['重洗'],
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
    LossGo() {
      this.$router.push({ path: "/Loss" });
    },
    Change(){
        this.show = true
        this.shownum = 0
    },
    InspectionClick(index) {
      this.inspection_arr[index].state =
        this.inspection_arr[index].state == 1 ? 0 : 1;
    },
    Del(index){
        this.error_arr.splice(index,1)
    },
    Details(item,index){
        this.show = true
        this.shownum = 2
    },
    OrderClick() {
      this.order = !this.order;
      this.order
        ? this.inspection_arr.sort(this.compare("time"))
        : this.inspection_arr.sort(this.compare("time", "1"));
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
.Inspection {
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
              width: 162px;
            }
            th:nth-child(2) {
              width: 168px;
            }
            th:nth-child(3) {
              width: 248px;
            }
            th:nth-child(4) {
              width: 286px;
            }
            th:nth-child(5) {
              width: 274px;
            }
            th:nth-child(6) {
              width: 274px;
            }
            th:nth-child(7) {
              width: 192px;
            }
            th:last-child {
              border-right: none;
              width: 220px;
            }
            td {
              height: 146px;
              border-bottom: 1px solid rgba(203, 203, 203, 1);
              border-right: 1px solid rgba(203, 203, 203, 1);
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
                background: url('../assets/images/勾选.png') center center no-repeat;
                background-size: 100% 100%;
              }
              img {
                  width: 52px;
              }
            }
            td:first-child {
              width: 162px;
            }
            td:nth-child(2) {
              width: 168px;
            }
            td:nth-child(3) {
              width: 248px;
            }
            td:nth-child(4) {
              width: 286px;
            }
            td:nth-child(5) {
              width: 274px;
            }
            td:nth-child(6) {
              width: 274px;
            }
            td:nth-child(7) {
              width: 192px;
            }
            td:last-child {
              border-right: none;
              width: 220px;
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
      width:757px;
      height:726px;
      background: rgba(255, 255, 255, 1);
      position: relative;
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
          .title {
            line-height: 50px;
            font-size:34px;
            font-family:Source Han Sans CN;
            font-weight:500;
            color:rgba(43,43,43,1);
            margin-bottom: 80px;
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
                border:1px solid rgba(120,120,120,1);
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
      .box {
        width: 100%;
        height: 40%;
        border: 1px solid rgba(203, 203, 203, 1);
        overflow: hidden;
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
            width: 140px;
            height: 56px;
            line-height: 56px;
            background: rgba(19, 206, 199, 1);
            box-shadow: 0px 10px 0px 0px rgba(4, 117, 130, 1);
            border-radius: 45px;
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
          width: 50%;
          height: 33%;
          .t_box {
              height:100%;
          }
      }
      .s_btn {
          position: absolute;
          right: 43px;
          bottom: 23px;
      }
      .s_btn div {
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
        margin-left: 40px;
      }
      .s_btn div:active {
        box-shadow: 0px 8px 0px 0px rgba(4, 117, 130, 1) inset;
      }
    }
    .show_box3 {
      width:757px;
      height:626px;
      background: rgba(255, 255, 255, 1);
      position: relative;
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
          .div {
            width: 100%;
            height:64px;
            line-height: 64px;
            text-align: center;
            border:1px solid rgba(120,120,120,1);
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
    .show_box5 {
      width: 613px;
      background-color: #fff;
      padding: 40px;
      display: flex;
      flex-wrap: wrap;
      border-radius: 10px;
      .ul {
        width: 100%;
        height: 800px;
        overflow: auto;
      }
      .li {
          width: 100%;
          display: flex;
          flex-wrap: wrap;
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
          .bz {
            width: 100%;
            margin-top: 20px;
            img {
              display: block;
              margin: 0 auto;
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
        margin-top: 40px;
      }
      .s_btn:active {
        box-shadow:0px 8px 0px 0px rgba(4,117,130,1) inset;
      }
    }
  }
}
</style>
