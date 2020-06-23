<template>
  <div class="Top">
    <div class="back" v-if="top_data.left_state==1" @click="back">
      <img src="../assets/images/返回.png" alt="">
    </div>
    <div class="title">{{top_data.title}}</div>
    <div class="right" v-if="top_data.right_state==1">
      <img :src="item.title" alt="" v-for="(item,index) in top_data.right_arr" v-if="item.state==3" :key="index" @click="Showsx()">
      <div v-for="(item,index) in top_data.right_arr" v-if="item.state==2" :key="index" @click="Showxz()">{{item.title}}</div>
      <div v-for="(item,index) in top_data.right_arr" v-if="item.state==1" :key="index" @click="RightGo(item.path,item.quer)">{{item.title}}</div>
    </div>
    <div class="right" v-if="top_data.right_state==2">
      <div v-for="(item,index) in top_data.right_arr" :key="index" @click="Showxz()">{{item.title}}</div>
    </div>
    <div class="right" v-if="top_data.right_state==3">
      <img :src="item.title" alt="" v-for="(item,index) in top_data.right_arr" :key="index" @click="Showsx(index)">
    </div>
  </div>
</template>

<script>
export default {
  name: 'Top',
  props:{
    top_data:{
  	    type:Object,
  		default: function(){
              return {}
          }
  	}
  },
  data () {
    return {
    }
  },
  mounted () {
    
  },
  methods: {
    back(){
      this.$router.go(-1)
    },
    RightGo(url,text){
      this.$router.push({path:url,query:{title:text}})
    },
    Showxz(){
      this.$emit('LossShow', '1')
    },
    Showsx(index){
      this.$emit('LossShow', index)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.Top {
    width: 100%;
    height: 88px;
    background: rgba(19,206,199,1);
    position: relative;
    .back {
      position: absolute;
      left: 31px;
      top: 19px;
      width: 55px;
      height: 50px;
      // border: 1px solid burlywood;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .title {
      font-size: 38px;
      width: 100%;
      line-height: 88px;
      text-align: center;
      font-family:Adobe Heiti Std;
      color: #fff;
      letter-spacing: 6px;
    }
    .right {
      position: absolute;
      top: 7px;
      right: 31px;
      display: flex;
      align-items: center;
      div {
        display: inline-block;
        text-align: center;
        line-height: 71px;
        padding: 0px 57px;
        height:71px;
        background:rgba(255,255,255,1);
        box-shadow:0px 8px 0px 0px rgba(4,117,130,1);
        border-radius:37px;
        font-size:34px;
        font-family:Source Han Sans CN;
        font-weight:500;
        color:rgba(49,50,50,1);
        margin-left: 44px;
      }
      div:last-child {
        margin-right: 0px;
      }
      div:active {
        box-shadow:0px 6px 0px 0px rgba(4,117,130,1) inset;
      }
      img {
        width: 64px;
        height: 64px;
        margin-left: 44px;
      }
    }
}
</style>
