<!-- <script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
onLaunch(() => {
  console.log("App Launch");
});
onShow(() => {
  console.log("App Show");
});
onHide(() => {
  console.log("App Hide");
});
</script> -->

<script lang="ts">
export default {
  globalData: {
    systemInfo: null,//客户端设备信息
    rpx: 1,
    statusBarHeight :0,
    navHeight :0,
    isIphoneX: false,
    muneButtonObj: {},
  },
  onLaunch() {
    const updateManager = uni.getUpdateManager();
    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      console.info(res.hasUpdate);
    });
    updateManager.onUpdateReady(function (res) {
      uni.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success(res) {
            if (res.confirm) {
                // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                updateManager.applyUpdate();
            }
        }
      });

    });
    console.log(this, "123")
    this.getSystemInfo()
    this.getNavbarHeight()
  },
  methods: {
    getSystemInfo() {
      let t = this;
      uni.getSystemInfo({
      success: function (res) {
        t.globalData.systemInfo = res;
        t.globalData.isIphoneX = (res.model.search('iPhone') != -1)?true:false
        t.globalData.isIos = (res.platform == "ios"?true:false)
        console.info(`用户手机信息为设备型号：${res.model}、操作系统及版本：${res.system}、客户端基础库版本：${res.SDKVersion}、微信版本号：${res.version}、客户端平台：${res.platform}`)
      }
      });
    },
    getNavbarHeight(){
      let muneButtonObj = uni.getMenuButtonBoundingClientRect()
      let res = this.globalData.systemInfo
      let rpx = res.windowWidth/750
      let statusBarHeight  = res.statusBarHeight 
      let navHeight = statusBarHeight + muneButtonObj.height + (muneButtonObj.top-statusBarHeight )*2
      this.globalData.rpx = rpx
      this.globalData.statusBarHeight = statusBarHeight
      this.globalData.navHeight = navHeight
      this.globalData.muneButtonObj = muneButtonObj
    },
  }
}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import './common/common.scss';
</style>
