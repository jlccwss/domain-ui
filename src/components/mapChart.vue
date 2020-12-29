<template>
    <div class="mapChart" ref="chart">
    </div>
</template>

<script>
import $http from '@/http';
import '@/lib/china';

export default {
  props: ['type'],
  data() {
    return {
      option: {
        geo3D: {
          map: 'china',
          roam: true,
          itemStyle: {
            color: '#05173e',
            opacity: 1,
            borderWidth: 0.8,
            borderColor: 'rgb(62,215,213)'
          }
        },
      }
    };
  },
  mounted() {
    // console.log(this.$refs.chart)
    this.myChart = echarts.init(this.$refs.chart);
    this.myChart.setOption(this.option);
    // this.fetchData();
  },
  methods: {
    fetchData() {
      const url = '/apis/stats/7/groups/*/members/*/views/*/' + this.type + '?topn=10';
      $http.get(url).then(res => {
        const arr = res.data[this.type] || [];
        let xAxisData = [];
        const data = arr.reverse().map(item => {
          xAxisData.push(item[0]);
          return {value: item[1],name: item[0]};
        });
        this.option.xAxis.data = xAxisData;
        this.option.series = [{
          type: 'bar',
          showBackground: true,
          
          data
        }];
        this.myChart.setOption(this.option);
      });
    }
  }
};
</script>
<style scoped>
.mapChart {
  height: 100%;
}
</style>