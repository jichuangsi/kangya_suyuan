<template>
  <div class="Loss">
    <top :top_data="top_data" @LossShow="LossShow"></top>
    <div class="center">
      <div class="box">
        <div class="t_box">
          <table>
            <thead>
              <tr>
                <th>序号</th>
                <th>器械名称</th>
                <th @click="OrderClick">
                  器械数量
                  <em :class="{'order':order}"></em>
                </th>
                <th>备注</th>
                <th>删除</th>
              </tr>
            </thead>
          </table>
          <div class="scorll">
            <table>
              <tbody>
                <tr v-for="(item,index) in loss_arr" :key="index">
                  <td>{{item.index}}</td>
                  <td>{{item.unit}}</td>
                  <td @click="show">{{item.num}}</td>
                  <td>{{item.text}}</td>
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
      <div class="f_c">合计:3 报损:1 报失:2</div>
      <div class="f_r">
        <div>确定</div>
      </div>
    </div>
    <div class="show" v-if="show" @click="show=false">
      <div class="show_box" v-if="!showsort" @click.stop="">
        <div class="s_b_top">
          新增报损/报失
        </div>
        <div class="s_b_center" >
          <div class="sel" @click.stop="showsort = true">
            {{sort}}
            <em></em>
          </div>
          <div class="sel" @click.stop="">
            数量
            <input type="number" style="text-align:right;" v-model="num">
          </div>
          <div class="sel" @click.stop="showul = true">
            {{mark}}
            <em></em>
            <div class="show_ul" v-if="showul">
              <div class="show_li" @click.stop="showul = false;mark='报损'">报损</div>
              <div class="show_li" @click.stop="showul = false;mark='报失'">报失</div>
            </div>
          </div>
        </div>
        <div class="s_b_btn">
          <div>确定</div>
        </div>
      </div>
      <div class="show_box1" v-if="showsort" @click.stop="">
        <div class="left">
          <div :class="{'check':index==sort_num}" @click.stop="sort_num=index" v-for="(item,index) in sort_arr" :key="index">{{item}}</div>
        </div>
        <div class="right">
          <div v-for="(item,index) in sort_child_arr" :key="index" @click.stop="sort=item;showsort=false">{{item}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import top from "@/components/Top";
export default {
  name: "Loss",
  components: {
    top
  },
  data() {
    return {
      top_data: {
        title: "报损/报失",
        left_state: "1",
        right_state: "2",
        right_arr: [{ title: "新增报损/报失",state:2 }]
      },
      loss_arr: [
        {
          index: 1,
          unit: "医用剪刀",
          num: 2,
          text: "报失"
        },
        {
          index: 2,
          unit: "医用剪刀",
          num: 1,
          text: "报失"
        }
      ],
      show: false,
      order: false,
      num:0,
      showul:false,
      mark:'备注',
      sort:'器械分类',
      showsort:false,
      sort_arr:['镊子','钳子','剪刀','内腔','外腔'],
      sort_child_arr:[
        '医用镊子','医用镊子','医用镊子','医用镊子','医用镊子',
      ],
      sort_num:0
    };
  },
  mounted() {},
  methods: {
    LossShow(e) {
      this.show = true;
    },
    Del(index){
      this.loss_arr.splice(index,1)
    },
    OrderClick() {
      this.order = !this.order;
      this.order
        ? this.loss_arr.sort(this.compare("num"))
        : this.loss_arr.sort(this.compare("num", "1"));
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
.Loss {
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
              width: 252px;
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
      width: 573px;
      height: 572px;
      background: rgba(255, 255, 255, 1);
      // padding: 40px;
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
          border:1px solid rgba(120,120,120,1);
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
    .show_box1 {
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
          border:1px solid rgba(196,196,196,1);
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
