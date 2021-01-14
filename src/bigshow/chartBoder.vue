<template>
    <div>
      <div class="left-top-b">
        <div class="vertical"></div>
        <div class="horisontal"></div>
      </div>
      <div class="left-bottom-b">
        <div class="horisontal"></div>
        <div class="vertical"></div>
      </div>
      <div class="right-top-b">
        <div class="vertical"></div>
        <div class="horisontal"></div>
      </div>
      <div class="right-bottom-b">
        <div class="horisontal"></div>
        <div class="vertical"></div>
      </div>
    </div>
</template>
<script>
export default {
  
}
</script>
<style scoped lang="scss">
.left-top-b {
  position: absolute;
  top: 0;
  left: 0;
  width: 15px;
  height: 15px;
  .horisontal {
    border-left: 2px transparent solid;
  }
}
.right-top-b {
  position: absolute;
  top: 0;
  right: 0;
  width: 15px;
  height: 15px;
  .horisontal {
    border-right: 2px transparent solid;
  }
}
.left-bottom-b {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 15px;
  height: 15px;
  .horisontal {
    border-left: 2px transparent solid;
  }
}
.right-bottom-b {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 15px;
  height: 15px;
  .horisontal {
    border-right: 2px transparent solid;
  }
}
.vertical {
  background:linear-gradient(to right,#2988E8, #2CC7E3);
  height: 2px;
  width: 100%;
}
.horisontal {
  border-image:linear-gradient(to bottom,#2988E8, #2CC7E3) 0 13;
  height: 13px;
}
</style>