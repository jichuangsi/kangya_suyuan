<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import equip from './utils/equipInfo'
export default {
  name: 'App',
  mounted() {
    let self = this
    document.addEventListener("deviceready", function () {
      navigator.splashscreen.hide();
      let a = equip()
      let so = cordova.plugins.screenorientation
      setTimeout(function(){
        if(a.sw >= 600){
          self.$router.replace('/Login');
          so.setOrientation('landscape');
        }else{
          self.$router.replace('/MLogin');
          so.setOrientation('portait');
        }
      },500)
      // console.log(device)
      console.log(a)
    }, false);
  },
  methods: {
    isMobile() {
    let os = function (){
      var ua = navigator.userAgent,
      isWindowsPhone = /(?:Windows Phone)/.test(ua),
      isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone,
      isAndroid = /(?:Android)/.test(ua),
      isFireFox = /(?:Firefox)/.test(ua),
      isChrome = /(?:Chrome|CriOS)/.test(ua),
      isTablet = /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua)),
      isPhone = /(?:iPhone)/.test(ua) && !isTablet,
      isPc = !isPhone && !isAndroid && !isSymbian;
      return {
        isTablet: isTablet,
        isPhone: isPhone,
        isAndroid: isAndroid,
        isPc: isPc
      };	
        }();
        
      console.log(navigator.userAgent)
        // console.log(navigator.userAgent)
        // console.log(navigator.userAgent.match)
        if (os.isAndroid || os.isPhone) {
          // 手机
          console.log(55555)
          this.$router.replace('/MLogin');
          // so.setOrientation('portait');
        } else if (os.isTablet) {
          console.log(66666)
          this.$router.replace('/Login');
          // so.setOrientation('landscape');
        } else if (os.isPc) {
          // pc
          console.log(7777)
          this.$router.replace('/Login');
          // so.setOrientation('landscape');
        }
    }
  }
}
</script>

<style>
#app {
}
</style>
