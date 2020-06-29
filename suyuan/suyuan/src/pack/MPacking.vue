<template>
  <div class="Packing">
    <top :top_data="top_data" @LossShow="LossShow"></top>
    <div class="center">
      <div class="box">
        <div class="t_box">
          <table>
            <thead>
              <tr>
                <!-- <th>多选</th>
                <th>序列</th> -->
                <th>器械包</th>
                <th @click="OrderClick">
                  包总量
                  <em :class="{'order':order}"></em>
                </th>
                <th>规格说明</th>
                <th>详情</th>
              </tr>
            </thead>
          </table>
          <div class="scorll">
            <table>
              <tbody>
                <tr v-for="(item,index) in packing_arr" :key="index">
                  <!-- <td>
                    <div :class="{'check':item.state==1}" @click="PackingClick(index)"></div>
                  </td>
                  <td>{{item.index}}</td> -->
                  <td>
                    <div :class="{'check':item.state==1}" @click="PackingClick(index)"></div>
                    <span>{{item.unit}}</span>
                  </td>
                  <td @click="Show2">{{item.num}}</td>
                  <td>{{item.text}}</td>
                  <td @click="show=true;shownum=1"><img src="../assets/images/详情.png" alt=""></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="foot">
        <div class="f_li">负责员工号：<span>001</span></div>
        <div class="f_li">负责员工姓名：<span>王家骥</span></div>
        <div class="f_li">待打包器械：<span>500</span></div>
        <div class="f_li">待打包器械：<span>300</span></div>
        <div class="f_btn">
        <div @click="Change">提交选中</div>
        <div @click="DelCheck">删除选中</div>
        </div>
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
                  <!-- <th>序号</th> -->
                  <th>器械名称</th>
                  <th>数量</th>
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
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="confirm">确定</div>
      </div>
      <div class="show_box3" v-if="shownum == 2" @click.stop="">
        <div class="s_b_top">
          录入器械包
        </div>
        <div class="s_b_center" >
          <div class="sel" @click.stop="shownum = 3">
            {{sort}}
            <em></em>
          </div>
          <div class="sel" @click.stop="">
            数量
            <input type="number" style="text-align:right;" v-model="num">
          </div>
          <div class="li">
              <div class="l">合计：</div>
              <div class="r">医用镊子*50</div>
          </div>
          <div class="li">
              <div class="l">规格：</div>
              <div class="r">医用镊子*1</div>
          </div>
        </div>
        <div class="s_b_btn">
          <div @click="show = false">确定</div>
        </div>
      </div>
      <div class="show_box4" v-if="shownum == 3" @click.stop="">
        <div class="left">
          <div :class="{'check':index==sort_num}" @click.stop="sort_num=index" v-for="(item,index) in sort_arr" :key="index">{{item}}</div>
        </div>
        <div class="right">
          <div v-for="(item,index) in sort_child_arr" :key="index" @click.stop="sort=item;shownum = 2">{{item}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import top from "@/components/MTop";
export default {
  name: "Packing",
  components: {
    top
  },
  data() {
    return {
      top_data: {
        title: "打包中",
        left_state: "1",
        right_state: "2",
        right_arr: [
          { title: "器械包",state:2 }
        ]
      },
      packing_arr: [
        {
          state: 0,
          index: 1,
          unit: "拔牙包",
          num: 20,
          text: "医用剪刀*10 医用镊子*10"
        },
        {
          state: 0,
          index: 2,
          unit: "拔牙包",
          num: 10,
          text: "医用剪刀*10 医用镊子*10"
        },
        {
          state: 0,
          index: 3,
          unit: "拔牙包",
          num: 10,
          text: "医用剪刀*10 医用镊子*10"
        },
        {
          state: 0,
          index: 4,
          unit: "拔牙包",
          num: 10,
          text: "医用剪刀*10 医用镊子*10"
        }
      ],
      num_arr: [
        {
          index: 'XDB001',
          name: "蛀牙包",
          num:'99'
        },
        {
          index: 'XDB001',
          name: "蛀牙包",
          num:'99'
        }
      ],
      sxstate: 1,
      order: false,
      show:false,
      shownum:0,
      timeorder:false,
      showsort:false,
      num:'50',
      sort:'医用镊子',
      sort_num:0,
      sort_arr:['镊子','钳子','剪刀','内腔','外腔'],
      sort_child_arr:[
        '医用镊子','医用镊子','医用镊子','医用镊子','医用镊子',
      ],
    };
  },
  mounted() {},
  methods: {
    DelCheck() {
        for(let i =0;i<this.packing_arr.length;i++){
            if(this.packing_arr[i].state == 1){
                this.packing_arr.splice(i,1)
            }
        }
    },
    LossShow(){
        this.show = true
        this.shownum = 2
    },
    Change(){
        this.show = true
        this.shownum = 0
    },
    Show2(){
        this.show = true
        this.shownum = 1
    },
    PackingClick(index) {
      this.packing_arr[index].state =
        this.packing_arr[index].state == 1 ? 0 : 1;
    },
    SxClick() {
      this.sxstate = this.sxstate == 1 ? 0 : 1;
    },
    OrderClick() {
      this.order = !this.order;
      this.order
        ? this.packing_arr.sort(this.compare("num"))
        : this.packing_arr.sort(this.compare("num", "1"));
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
.Packing {
  width: 100%;
  height: 100vh;
  .center {
    width: 100%;
    height: calc((100% - 88px));
    padding: 20px;
    padding-bottom: 10px;
    .box {
      width: 100%;
      height: 60%;
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
              width: 171px;
            }
            th:nth-child(2) {
              width: 154px;
            }
            th:nth-child(3) {
              width: 309px;
            }
            th:last-child {
              border-right: none;
              width: 92px;
            }
            td {
              height: 146px;
              border-right: 1px solid rgba(203, 203, 203, 1);
              border-bottom: 1px solid rgba(203, 203, 203, 1);
              text-align: center;
              line-height: 46px;
              // padding: 40px;
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
              width: 171px;
            }
            td:nth-child(2) {
              width: 154px;
            }
            td:nth-child(3) {
              width: 309px;
            }
            td:last-child {
              border-right: none;
              width: 92px;
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
    height: 40%;
    background: rgba(255, 255, 255, 1);
    // box-shadow: 0px 0px 7px 0px rgba(4, 49, 51, 0.15);
    border-top: 1px solid rgba(190, 190, 190, 1);
    // padding: 0 40px; 
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
        position: absolute;
        right: 0px;
        bottom: 35px;
        text-align: right;
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
        margin-left: 40px;
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
                width: 250px;
              }
              th:last-child {
                border-right: none;
                width: 250px;
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
                width: 250px;
              }
              td:last-child {
                border-right: none;
                width: 250px;
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
    .show_box3 {
      width: 573px;
    //   height: 572px;
      background: rgba(255, 255, 255, 1);
      padding-bottom: 40px;
      .s_b_top {
        width:100%;
        height:92px;
        background:rgba(0,170,164,1);
        font-size:38px;
        font-family:Source Han Sans CN;
        font-weight:400;
        color:rgba(255,255,255,1);
        text-align: center;
        line-height: 92px;
      }
      .s_b_center{
        display: flex;
        padding: 40px;
        padding-bottom: 0px;
        flex-wrap: wrap;
        .sel{
          width:100%;
          height:74px;
          border:2px solid rgba(120,120,120,1);
          border-radius:10px;
          font-size:34px;
          font-family:Source Han Sans CN;
          font-weight:400;
          color:rgba(49,50,50,1);
          line-height: 74px;
          padding-left: 37px;
          padding-right: 30px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          margin-bottom: 40px;
          position: relative;
          em {
            width:15px;
            height:15px;
            border:1px solid rgba(49,50,50,1);
            border-color: transparent transparent rgba(49,50,50,1) rgba(49,50,50,1);
            transform: rotate(-45deg);
          }
          input {
            font-size:34px;
            width: 60%;
          }
          .show_ul {
            width: 100%;
            border: 1px solid rgba(49,50,50,1);
            background-color: #fff;
          }
          .show_li {
            text-indent: 1em;
          }
        }
        .li {
          width:100%;
        //   height:74px;
          line-height: 46px;
          font-size:34px;
          font-family:Source Han Sans CN;
          font-weight:400;
          color:rgba(49,50,50,1);
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
        }
      }
      .s_b_btn {
        width: 100%;
        padding: 0px 40px;
      }
      .s_b_btn div {
        width:100%;
        height:74px;
        background:rgba(49,213,207,1);
        box-shadow:0px 8px 0px 0px rgba(4,117,130,1);
        border-radius:10px;
        font-size:36px;
        font-family:Source Han Sans CN;
        font-weight:400;
        color:rgba(255,255,255,1);
        text-align: center;
        line-height: 74px;
      }
      .s_b_btn div:active {
        box-shadow:0px 8px 0px 0px rgba(4,117,130,1) inset;
      }
    }
    .show_box4 {
      width: 70%;
      height: 80%;
      background-color: #fff;
      display: flex;
      .left {
        width:171px;
        height:100%;
        background:rgba(210,252,250,1);
        div {
          width:100%;
          height:87px;
          line-height: 87px;
          text-align: center;
          font-size:36px;
          font-family:Source Han Sans CN;
          font-weight:400;
          color:rgba(49,50,50,1);
        }
        .check {
          background:rgba(19,206,199,1);
          color:rgba(254,254,254,1);
        }
      }
      .right {
        flex: 1;
        height:100%;
        background-color: #fff;
        padding: 20px;
        div {
          display: inline-block;
          width:202px;
          height:68px;
          line-height: 68px;
          text-align: center;
          border:2px solid rgba(196,196,196,1);
          border-radius:5px;
          font-size:34px;
          font-family:Source Han Sans CN;
          font-weight:400;
          color:rgba(67,67,67,1);
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          margin-bottom: 20px;
          margin-right: 20px;
        }
      }
    }
  }
}
</style>
