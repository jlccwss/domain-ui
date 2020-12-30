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
    this.myChart = echarts.init(this.$refs.chart);
    console.log(this.$$refs.chart);
    this.fetchData();
  },
  methods: {
    fetchData() {
      const url = '/apis/stats/11/groups/*/members/*/views/*';
      $http.get(url).then(res => {
        let data = res.data['省级统计'] || [];
        console.log(data);
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