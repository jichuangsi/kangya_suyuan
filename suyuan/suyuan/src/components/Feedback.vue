<template>
  <div class="Feedback">
    <top :top_data="top_data"></top>
    <div class="center">
        <div class="text">
            内容：
        </div>
        <div class="connter">
            <div class="left">
                <textarea placeholder="填写反馈内容"></textarea>
            </div>
            <div class="right">
                <div class="add" @click="show=true">
                    <div v-if="file==''">+</div>
                    <video :src="file" v-if="check_num==0&&file!=''"></video>
                    <img :src="file" v-if="check_num==1&&file!=''" alt="">
                    <video :src="file" v-if="check_num==2&&file!=''"></video>
                </div>
            </div>
        </div>
        <div class="check_box">
            附件： 
            <div class="li" @click="check_num=0;file=''">
                <div class="c_box" :class="{'check':check_num==0}"><span v-if="check_num==0"></span></div>
                视频
            </div>
            <div class="li" @click="check_num=1;file=''">
                <div class="c_box" :class="{'check':check_num==1}"><span v-if="check_num==1"></span></div>
                图片
            </div>
            <div class="li" @click="check_num=2;file=''">
                <div class="c_box" :class="{'check':check_num==2}"><span v-if="check_num==2"></span></div>
                音频
            </div>
        </div>
        <div class="btn">提交</div>
    </div>
    <div class="show" v-if="show" @click="show=false">
        <div class="box" v-if="check_num==0">
            <div class="li" @click.stop="CheckVideo">选择视频</div>
            <div class="li" @click.stop="ShootVideo">拍摄视频</div>
        </div>
        <div class="box" v-if="check_num==1">
            <div class="li" @click.stop="CheckImg">选择图片</div>
            <div class="li" @click.stop="ShootImg">拍摄图片</div>
        </div>
        <div class="box" v-if="check_num==2">
            <!-- <div class="li">选择录音</div> -->
            <div class="li" @click.stop="Sound">录制录音</div>
        </div>
    </div>
    <!-- <div class="shwo1" v-if="uploadbtn">
        <div class="quan"><em></em></div>
    </div> -->
  </div>
</template>

<script>
import top from '@/components/Top'
export default {
  name: 'Feedback',
  components: {
    top
  },
  data () {
    return {
      top_data:{
        title:'回收反馈',
        left_state:'1'
      },
      check_num:0,
      check_text:'视频',
      show:false,
      file:'',
      ready:false,
      uploadbtn:true
    }
  },
  mounted () {
    this.top_data.title = this.$route.query.title + '反馈'
    this.initialize()
  },
  methods: {
    initialize() {
      let _this = this;
      document.addEventListener(
        "deviceready",
        _this.onDeviceReady.bind(this),
        false
      );
    },
    onDeviceReady(val) {
      this.ready = true;
    },
      CheckVideo(){
        let self = this
        self.show = false
        if(self.ready){
        navigator.camera.getPicture(onSuccess, onFail, {
          quality: 50,
          destinationType: Camera.DestinationType.NATIVE_URI,
          sourceType:0,
          mediaType: 1,
          cameraDirection: 0
        });
        function onSuccess(mp4Data) {
        // self.filevideo = 'file://'+ mp4Data
        // self.$refs.sp_video.src = mp4Data
        console.log(mp4Data)
        // self.bottom_check = false
        self.uploadbtn = false
        console.log(device.platform)
        if(device.platform == 'iOS'){
            window.resolveLocalFileSystemURL( 'file://'+ mp4Data, (fileEntry) => {
                fileEntry.file(function (file) {
                    console.log('file://'+ mp4Data)
                    self.file = 'file://'+ mp4Data
                //   self.edit(file,'file://'+ mp4Data)
                });
              }, (err)=>{
                console.log(6666)
                console.log(err)
            })
        }else{
          var permissions = cordova.plugins.permissions
          permissions.checkPermission(
            permissions.WRITE_EXTERNAL_STORAGE,
            function(s) {
              if (!s.hasPermission) {
                //没有权限
                //app申请写入权限
                permissions.requestPermission(
                  permissions.WRITE_EXTERNAL_STORAGE,
                  function(s) {
                    if (s.hasPermission) {
                      //申请成功
                      console.log('request WRITE_EXTERNAL_STORAGE success');
                      window.resolveLocalFileSystemURL('file://'+ mp4Data, (fileEntry) => {
                        fileEntry.file(function (file) {
                            console.log('file://'+ mp4Data)
                    self.file = 'file://'+ mp4Data
                        //   self.edit(file,'file://'+ mp4Data)
                        });

                      }, (err)=>{
                        console.log(6666)
                        console.log(err)
                      })


                    } else {
                      console.log('request WRITE_EXTERNAL_STORAGE fail');
                    }
                  },
                  function(error) {}
                )
              }else{
                console.log('has WRITE_EXTERNAL_STORAGE already');

                window.resolveLocalFileSystemURL('file://'+ mp4Data, (fileEntry) => {
                  fileEntry.file(function (file) {
                            console.log('file://'+ mp4Data)
                    self.file = 'file://'+ mp4Data
                    // self.edit(file,'file://'+ mp4Data)
                  });

                }, (err)=>{
                  console.log(6666)
                  console.log(err)
                })

              }
            },
            function(error) {}
          );

        }
        }
        function onFail(message) {
        console.log(message)
        // self.bottom_check = false
          //Toast("选择视频，原因为: " + message);
        }
        
        }else{
        }
      },
      ShootVideo(){
        let self = this
        self.show = false
        navigator.device.capture.captureVideo(
            onSuccess,// 视频录制功后的处理成
            onFail, // 视频录制失败后的处理
            {
                duration: 60,// 限制录制的视频时间长度，单位：/秒
                limit:1, // 非必填，不写此项时，默认为1
                // 在ios一次只能录一个视频，
                //在Android上，连续录制视频的个数受limit的限制
                quality: 1
            }
        );
        function onSuccess(res){
            // self.filevideo = res[0].fullPath
            // self.$refs.sp_video.src = res[0].fullPath
            // self.bottom_check = false
            self.uploadbtn = false
            console.log(res)

        if(device.platform == 'iOS'){
            console.log(res[0])
            // self.edit(res[0])
             self.file = res[0].localURL
        }else{
          var permissions = cordova.plugins.permissions
          permissions.checkPermission(
            permissions.WRITE_EXTERNAL_STORAGE,
            function(s) {
              if (!s.hasPermission) {
                //没有权限
                //app申请写入权限
                permissions.requestPermission(
                  permissions.WRITE_EXTERNAL_STORAGE,
                  function(s) {
                    if (s.hasPermission) {
                      //申请成功
                      console.log('request WRITE_EXTERNAL_STORAGE success');
                        console.log(res[0])
                            self.file = res[0].fullPath
                    //   self.edit(res[0])
                    } else {
                      console.log('request WRITE_EXTERNAL_STORAGE fail');
                    }
                  },
                  function(error) {}
                )
              }else{
                console.log('has WRITE_EXTERNAL_STORAGE already');
                console.log(res[0])
                            self.file = res[0].fullPath
                // self.edit(res[0])
              }
            },
            function(error) {}
          );
        }
        }


        function onFail(err){
            console.log(err)
            self.bottom_check = false
        }
      },
      CheckImg(){
        let self = this
        self.show = false
        if(self.ready){
        navigator.camera.getPicture(onSuccess, onFail, {
          quality: 50,
          destinationType: Camera.DestinationType.NATIVE_URI,
          sourceType:0,
          mediaType: 0,
          cameraDirection: 0,
          encodingType: Camera.EncodingType.PNG
        });
        function onSuccess(imageData) {
        // self.bottom_check = false
        if(device.platform == 'iOS'){
            self.file = 'cdvfile://localhost/' + imageData
        }else{
            self.file = imageData
        }
        self.uploadbtn = false
        // window.resolveLocalFileSystemURL(imageData, (fileEntry) => {
        // fileEntry.file(function (file) {
        //     console.log(file)
        //     console.log(file.size)
        //     // self.zp_edit(file,imageData)
        //     if(device.platform == 'iOS'){
        //         self.fileimg = file.localURL
        //     }
        //     if(file.size<5048576){
        //     self.zhuan(imageData)
        //     }else{
        //     Toast('图片过大')
        //     }
        // });
        // }, (err)=>{
        //     console.log(6666)
        //     console.log(err)
        // })
        }
        function onFail(message) {
        console.log(message)
        // self.bottom_check = false
          //Toast("选择图片，原因为: " + message);
        }
        }else{
        }
      },
      ShootImg(){
        let self = this
        self.show = false
        if(self.ready){
         let ratio = window.screen.width / window.screen.height;
         let targetHeight = window.screen.height / 0.5;
         let targetWidth = targetHeight * ratio;
        navigator.camera.getPicture(onSuccess, onFail, {
          quality: 100,
          destinationType: Camera.DestinationType.NATIVE_URI,
          mediaType: 0,
          saveToPhotoAlbum: true,
          cameraDirection: 0,
          targetWidth:targetWidth,
          targetHeight:targetHeight,
          encodingType: Camera.EncodingType.PNG
        });
        function onSuccess(imageData) {
        console.log(imageData)
        if(device.platform == 'iOS'){
            self.file = 'cdvfile://localhost/' + imageData
        }else{
            self.file = imageData
        }
        // self.bottom_check = false
        // self.uploadbtn = false
        // window.resolveLocalFileSystemURL(imageData, (fileEntry) => {
        // fileEntry.file(function (file) {
        //     console.log(file)
        //     console.log(file.size)
        //     if(device.platform == 'iOS'){
        //         self.fileimg = file.localURL
        //     }
        //     // self.zp_edit(file,imageData)
        //     if(file.size<5048576){
        //     self.zhuan(imageData)
        //     }else{
        //     Toast('图片过大')
        //     }
        // });
        // }, (err)=>{
        //     console.log(6666)
        //     console.log(err)
        // })
        }
        function onFail(message) {
        console.log(message)
        // self.bottom_check = false
          //Toast("拍照失败，原因为: " + message);
        }
        }else{
        }
      },
      Sound(){
          let self = this
        self.show = false
          navigator.device.capture.captureAudio(onSuccess, onError, {duration: 15});
          function onSuccess(mediaFiles) {
                  var i, path, len;
                  //遍历获取录制的文件（iOS只支持一次录制一个视频或音频）
                  for (i = 0, len = mediaFiles.length; i < len; i += 1) {
                    console.log(mediaFiles);
                     self.file = mediaFiles[i].fullPath;
                  }
               }
 
               //录制失败
               function onError(error) {
                console.log(222)
                  console.log(error);
               }
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.Feedback {
    width: 100%;
    height: 100vh;
    .center {
        padding: 58px 38px;
        .text {
            font-size:38px;
            line-height: 46px;
            font-family:Source Han Sans CN;
            font-weight:400;
            color:rgba(36,37,37,1);
        }
        .connter {
            margin-top: 40px;
            display: flex;
            .left {
                width:1118px;
                height:419px;
                border:1px solid rgba(49,50,50,1);
                overflow: hidden;
                padding: 10px;
                textarea {
                    width: 100%;
                    height: 100%;
                    font-size:34px;
                    line-height: 46px;
                    text-indent: 2em;
                }
            }
            .right {
                padding: 0 40px;
                .add {
                    width:270px;
                    height:270px;
                    background:rgba(214,214,214,1);
                    text-align: center;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    div {
                        color: rgba(194,193,193,1);
                        font-size: 270px;
                        line-height: 270px;
                    }
                    img {
                        width: 100%;
                        max-height: 100%;
                    }
                    video {
                        width: 100%;
                        max-height: 100%;
                    }
                }
            }
        }
        .check_box {
            display: flex;
            font-size:38px;
            font-family:Source Han Sans CN;
            font-weight:400;
            color:rgba(36,37,37,1);
            margin-top: 100px;
            margin-bottom: 100px;
            .li {
                margin-left: 100px;
                display: flex;
                align-items: center;
                .c_box {
                    width:36px;
                    height:36px;
                    border:1px solid rgba(49,50,50,1);
                    border-radius:50%;
                    padding: 7px;
                    margin-right: 10px;
                    span {
                        display: block;
                        width: 100%;
                        height: 100%;
                        background-color: rgba(0,170,164,1);
                        border-radius: 50%;
                    }
                }
                .check {
                    border:1px solid rgba(0,170,164,1);
                }
            }
        }
        .btn {
            width:572px;
            height:100px;
            line-height: 100px;
            text-align: center;
            background:rgba(19,206,199,1);
            box-shadow:0px 8px 0px 0px rgba(4,117,130,1);
            border-radius:50px;
            font-size:38px;
            font-family:Source Han Sans CN;
            font-weight:400;
            color:rgba(255,255,255,1);
            margin: 0 auto;
        }
        .btn:active {
            box-shadow:0px 8px 0px 0px rgba(4,117,130,1) inset;
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
        align-items: flex-end;
        background-color: rgba(0, 0, 0, 0.5);
        .box {
            background-color: #fff;
            width: 100%;
            line-height: 106px;
            text-align: center;
            font-size:32px;
            font-family:Source Han Sans CN;
            font-weight:400;
            color:rgba(36,37,37,1);
            .li:first-child {
                border-bottom: 1px solid rgba(165,165,165,1);
            }
        }
    }
    .shwo1 {
        position: fixed;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100vh;
        z-index: 9;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(0, 0, 0, 1);
        .quan {
            width: 100px;
            height: 100px;
            border: 5px solid #fff;
            border-radius: 50%;
            position: relative;
            animation: quan 1s linear infinite;
            em {
                display: block;
                width: 30px;
                height: 30px;
                background-color: rgba(0, 0, 0, 1);
                position: absolute;
                left: 0px;
                top: 0px;
            }
        }
    }
}
@keyframes quan {
    0% {
        transform: rotate(0deg);
    }
    100%{
        transform: rotate(360deg);
    }
}
</style>
