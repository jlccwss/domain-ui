
<template>
    <div class="main flex-col">
      <div class="animation"></div>
      <div class="flex header mb-20">
        <div class="left"></div>
        <div class="title flex flex-auto"><div class="title-img"></div><div class="title-h">域名解析统一管理系统</div></div>
        <div class="right"></div>
      </div>
      <div class="flex flex-auto">
        <div class="left-chart flex-col mr-20">
          <div class="chart flex-col mb-20 flex-auto">
            <chart-boder></chart-boder>
            <div class="sub-title">DNS解析成功率</div>
            <line-chart class="flex-auto" type="解析成功率"></line-chart>
          </div>
          <div class="chart flex-col flex-auto mb-20">
            <chart-boder></chart-boder>
            <div class="sub-title">域名排行TOP</div>
            <bar-chart class="flex-auto" type="域名排行"></bar-chart>
          </div>
          <div class="chart flex-auto flex-col">
            <chart-boder></chart-boder>
            <div class="sub-title">解析状态</div>
            <pie-chart class="flex-auto" type="解析状态"></pie-chart>
          </div>
        </div>
        <div class="flex-col flex-auto mr-20">
          <div class="chart cur-day flex-col mb-20">
            <chart-boder></chart-boder>
            <div class="thrid-title">当日解析量<span class="des">{{time}}</span></div>
            <text-chart class="flex-auto"></text-chart>
          </div>
          <div class="chart flex-col flex-auto">
            <chart-boder></chart-boder>
            <div class="sub-title">域名解析分布<span class="des">计算时间：{{time}}</span></div>
            <map-chart class="flex-auto rotate"></map-chart>
          </div>
        </div>
        <div class="right-chart flex-col">
          <div class="chart flex-col flex-auto mb-20">
            <chart-boder></chart-boder>
            <div class="sub-title">DNS解析流量统计(QPS)</div>
            <line-chart class="flex-auto" type="QPS"></line-chart>
          </div>
          <div class="chart flex-auto mb-20 flex-col">
            <chart-boder></chart-boder>
            <div class="sub-title">IP排行TOP</div>
            <bar-chart class="flex-auto" type="IP排行"></bar-chart>
          </div>
          <div class="chart flex-auto flex-col">
            <chart-boder></chart-boder>
            <div class="sub-title">解析类型</div>
            <pie-chart class="flex-auto" type="解析类型"></pie-chart>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import pieChart from './pieChart.vue';
import barChart from './barChart.vue';
import textChart from './textChart.vue';
import mapChart from './mapChart.vue';
import lineChart from './lineChart.vue';
import chartBoder from './chartBoder.vue';
export default {
  data() {
    return {
      time: ''
    };
  },
  components: {
    pieChart,
    barChart,
    textChart,
    mapChart,
    lineChart,
    chartBoder
  },
  mounted() {
    this.calTime();
  },
  methods: {
    calTime() {
      let date = new Date();
      let month = date.getMonth() + 1;
      if (month < 10) {
        month = '0' + month;
      }
      let day = date.getDate();
      if (day < 10) {
        day = '0' + day;
      }
      let hours = date.getHours();
      if (hours < 10) {
        hours = '0' + hours;
      }
      let minutes = date.getMinutes();
      if (minutes < 10) {
        minutes = '0' + minutes;
      }
      let seconds = date.getSeconds();
      if (seconds < 10) {
        seconds = '0' + seconds;
      }
      this.time = date.getFullYear() + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
      setTimeout(() => this.calTime(), 5000);
    }
  }
};
</script>
<style scoped lang="scss">
.main {
  min-height: 100%;
  background: url('./../assets/bg.gif');
  background-size: cover;
  padding: 10px 10px;
  overflow-x: hidden;
}
.header {
  height: 80px;
}
.left {
  background: url('./../assets/left.svg');
  width: 469px;
}
.title-img {
  background: url('./../assets/title-img.png');
  width: 34px;
  height: 26px;
  background-repeat: no-repeat;
  display: inline-block;
  margin-right: 10px;
}
.right {
  background: url('./../assets/right.svg');
  width: 469px;
}
.title {
  background-image: url('./../assets/title.png');
  background-size:100% 100%;
  text-align: center;
  justify-content: center;
  align-items: center;
  padding-bottom: 5px;
}
.title-h {
  font-size: 30px;
  color: #fff;
}
.right-chart, .left-chart {
  width: 500px;
}
.chart {
  border: 1px solid rgba(0,145,255,0.50);
  box-shadow: inset 0 2px 30px 2px rgba(0,145,255,0.40);
  border-radius: 2px;
  border-radius: 2px;
  position: relative;
}
.mb-20 {
  margin-bottom: 10px;
}
.mr-20 {
  margin-right: 10px;
}
.sub-title {
  font-size: 14px;
  color: #FFF;
  line-height:30px;
  border-bottom: 1px solid rgba(0,145,255,0.44);
  padding-left: 12px;
  text-align: left;
}
.cur-day {
  height: 125px;
  padding: 20px;
}
.thrid-title {
  color: #fff;
  font-size: 14px;
  text-align: left;
}
.des {
  opacity: 0.66;
  color: #fff;
  position: absolute;
  right: 22px;
}
.animation {
  background: url('./../assets/ani.png');
}
</style>