<template>
    <div class="lineChart" ref="chart">
    </div>
</template>

<script>
import $http from '@/http';
import baseChart from './baseChart';
export default {
  props: ['type'],
  mixins: [baseChart],
  data() {
    return {
      option: {
        grid: {
          top: 20
        },
        tooltip: {
            trigger: 'item'
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            axisLabel: {
              rotate: 60
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: 'rgba(255, 255, 255, 0.3)'
              }
            },
            data: []
        },
        yAxis: {
            type: 'value',
            splitLine: {
              show: true,
              lineStyle: {
                color: 'rgba(255, 255, 255, 0.3)'
              }
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: 'rgba(255, 255, 255, 0.3)'
              }
            },
        },
        series: [{
          type: 'line',
          smooth: false,
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.6)'
          },
          itemStyle: {
            normal: {
              color: '#D4D0F3'
            }
          },
          symbolSize: 5,
          data: []
        }]
      }
    };
  },
  methods: {
    fetchData() {
      const url = '/apis/stats/6/groups/*/members/*/views/*/' + this.type;
      let date = new Date();
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
      let time = hours + ':' + minutes + ':' + seconds;
      $http.get(url).then(res => {
        let val = res.data[this.type] || 0;
        let xData = this.option.xAxis.data;
        let sData = this.option.series[0].data;
        if (xData.length === 20) {
          xData.shift();
          sData.shift();
        }
        xData.push(time);
        sData.push(val);
        this.myChart.setOption(this.option);
      });
    }
  }
};
</script>
<style scoped>
.lineChart {
  height: 100%;
}
</style>