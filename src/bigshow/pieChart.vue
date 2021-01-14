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
        // tooltip: {
        //   trigger: 'item',
        //   formatter: '{a} <br/>{b}: {c} ({d}%)'
        // },
        legend: {
          orient: 'vertical',
          icon: 'circle',
          itemHeight: 10,
          right: 10,
          textStyle: {
            color: '#fff'
          },
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
        let sum = arr.reduce((sum, item) => sum + item[1], 0);
        const data = arr.map(item => {
          let num = (item[1]/sum*100).toFixed(2);
          let name = item[0] + '  |  ' + num +  '%';
          legendData.push(name);
          return {value: item[1],name};
        });
        this.option.legend.data = legendData;
        this.option.series = [{
          name: this.type,
          type: 'pie',
          label: {
            show: false,
            position: 'center'
          },
          right: '30%',
          emphasis: {
              label: {
                  show: true,
                  formatter: function(e) {
                    let name = e.data.name.split(' ')[0];
                    return '{des|' + name + '}\n{title|' + e.data.value +'}';
                  },
                  fontSize: '30',
                  color: '#fff',
                  rich: {
                    des: {
                      fontSize: '14'
                    },
                    title: {
                      fontSize: '30',
                    }
                  }
              }
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