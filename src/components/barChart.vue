<template>
    <div class="barChart" ref="chart">
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
            left: '3%',
            right: '20%',
            bottom: '3%',
            top: '10%',
            containLabel: true
        },
        color: ['#1890FF', '#6DD400'],
        xAxis: {
          type: 'value',
          splitLine: {
            show: false,
          },
          axisLabel: {
            show: true,
            textStyle: {
                color: '#fff'
            },
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#fff'
            }
          },
        },
        yAxis: {
          type: 'category',
          axisLine: {
            show: false
          },
          axisLabel: {
            show: true,
            textStyle: {
                color: '#fff'
            },
          }, 
          splitLine: {
            show: false,
          },
          data: []
        },
      }
    };
  },
  methods: {
    fetchData() {
      const url = '/apis/stats/7/groups/*/members/*/views/*/' + this.type + '?topn=4';
      $http.get(url).then(res => {
        const arr = res.data[this.type] || [];
        let xAxisData = [];
        const data = arr.reverse().map(item => {
          xAxisData.push(item[0]);
          return {value: item[1],name: item[0]};
        });
        this.option.yAxis.data = xAxisData;
        this.option.series = [{
          type: 'bar',
          barWidth: 24,
          data
        }];
        this.myChart.setOption(this.option);
      });
    }
  }
};
</script>
<style scoped>
.barChart {
  height: 100%;
}
</style>