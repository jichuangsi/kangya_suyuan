<template>
  <div class="Login" @click="go">
      <img class="topimg" src="../assets/images/组 1.png" alt="">
      <div class="code">
        <img class="codeimg" src="../assets/images/code.png" alt="">
        请用微信扫码登录
      </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {
    go(){
      this.$router.push({path:'/Index'})
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.Login {
    width: 100%;
    height: 100vh;
    .topimg {
        width: 100%;
    }
    .code {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        font-size:34px;
        font-family:Source Han Sans CN;
        font-weight:500;
        color:rgba(0,0,0,1);
        margin-top: 60px;
    }
    .codeimg {
        width: 60.8%;
        margin-bottom: 50px;
    }
} 
</style>
