<template>
    <div class="pieChart" ref="chart">
      <!-- <div class="total">{{total}}</div> -->
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
      total: 0,
      option: {
        color: ['#8543E0', '#1890FF', '#13C2C2', '#2FC25B ', '#FACC14', '#F04864'],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          right: 10,
          data: []
        },
      },
      series: []
    };
  },
  methods: {
    fetchData() {
      const url = '/apis/stats/8/groups/*/members/*/views/*/' + this.type + '?topn=10';
      $http.get(url).then(res => {
        const arr = res.data[this.type] || [];
        let legendData = [];
        const data = arr.map(item => {
          legendData.push(item[0]);
          return {value: item[1],name: item[0]};
        });
        this.option.legend.data = legendData;
        this.option.series = [{
          name: this.type,
          type: 'pie',
          label: {
            show: false,
            position: 'center'
          },
          radius: ['50%', '70%'],
          data
        }];
        this.myChart.setOption(this.option);
      });
    }
  }
};
</script>
<style scoped>
.pieChart {
  height: 100%;
}
</style>