<template>
<div>
  <div class="barChart" ref="chart">
  </div>
  <div v-if="tooltipShow" :style="{left: left+'px', top: top+ 'px'}" class="tooltip">{{tooltipText}}</div>
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
      left: 0,
      top: 0,
      tooltipText: '',
      tooltipShow: false,
      option: {
        grid: {
            left: '3%',
            right: '20%',
            bottom: '3%',
            top: '10%',
            containLabel: true
        },
        xAxis: {
          type: 'value',
          splitNumber: 4,
          splitLine: {
            show: false,
          },
          axisLabel: {
            show: true,
            textStyle: {
                color: '#fff'
            },
            formatter: function(v) {
              if (v < 10000) {
                return v;
              } 

              if (v < 10000 * 10000) {
                return v/10000 + '万';
              }

              return (v/(10000*10000)).toFixed(2) + '亿';
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
          silent: false,
          triggerEvent:true,
          axisLabel: {
            show: true,
            textStyle: {
                color: '#fff'
            },
            tooltip: {
                show: true
            },
            formatter: function(name) {
                if (name.length < 20) {
                  return name;
                }
                return name.slice(0,20) + '...';
            }
          }, 
          splitLine: {
            show: false,
          },
          data: []
        },
      }
    };
  },
  mounted() {
    this.initEvent();
  },
  methods: {
    initEvent() {
      this.myChart.on('mouseover', params => {
          if (params.componentType === 'yAxis') {
            this.$nextTick(() => {
              this.tooltipShow = true;
              this.tooltipText = params.value;
              this.left = params.event.offsetX;
              this.top = params.event.offsetY;
            });
          }
      });
      this.myChart.on('mouseout', params => {
          if (params.componentType === 'yAxis') {
            this.$nextTick(() => {
              this.tooltipShow = false;
            });
          }
      });
    },
    fetchData() {
      const url = '/apis/stats/7/groups/*/members/*/views/*/' + this.type + '?topn=10';
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
          data,
          barWidth: 17,
          label: {
              show: true,
              position: 'right',
              color: '#fff',
              formatter: function(d) {
                let v = d.value;
                if (v < 10000) {
                  return v;
                } 
                if (v < 10000 * 10000) {
                  return v/10000 + '万';
                }

                return (v/(10000*10000)).toFixed(2) + '亿';
              }
          },
          itemStyle: {
            normal: {
              color: function(params) {
                var colorList = ['#36CFC9', '#F7B500', '#FA6400', '#FF85C0 ', '#096DD9', '#FF4D4F', '#FFEC3D', '#A0D911', '#9254DE', '#32C5FF'];
                return colorList[params.dataIndex] || 'red';
              }
            }
          }
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

.tooltip {
  position: absolute;
  background: #fff;
  border-radius: 3px;
  padding: 3px 5px;
}
</style>