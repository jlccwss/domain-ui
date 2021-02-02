
<template>
    <div class="main">
      <div class="bg">
        <div class="content">
          <div class="title">无法访问此页面</div>
          <div class="des">
            <div>请试试以下办法：</div>
            <div>· 检查网络连接</div>
            <div>· 检查代理服务器和防火墙</div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>
<style scoped lang="scss">
.main {
  width: 100%;
  height: 100%;
  padding: 40px;
}
.bg {
  width: 100%;
  height: 100%;
  background-image: url(./../assets/404.png);
  background-size: contain;
  background-repeat: no-repeat;
}

.content {
  margin-left: 50%;
  text-align: left;
  padding-top: 20%;
  height: 100%;
}
.title {
  font-size: 44px;
  color: #262626;
  font-weight: bold;
}

.des {
  text-align: left;
  div {
    font-size: 22px;
  }
  color: #62616B;
  letter-spacing: 0;
  line-height: 54px;
}
</style>