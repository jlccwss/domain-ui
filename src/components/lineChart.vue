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
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
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
          symbolSize: 10,
          data: []
        }]
      }
    };
  },
  methods: {
    fetchData() {
      const url = '/apis/stats/6/groups/*/members/*/views/*/' + this.type;
      let date = new Date();
      let time = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
      $http.get(url).then(res => {
        let val = res.data[this.type] || 0;
        this.option.xAxis.data.push(time);
        this.option.series[0].data.push(val);
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