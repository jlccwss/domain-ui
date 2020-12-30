<template>
    <div class="mapChart" ref="chart">
    </div>
</template>

<script>
import $http from '@/http';
import '@/lib/china';
const colorMap = ['#115ca1', '#09436d', '#6e4644'];
export default {
  props: ['type'],
  data() {
    return {
      geoCoordMap: {},
      option: {
        tooltip: {
            show: true,
            formatter: function(params) {
                if (params.value.length > 1) {
                    return '&nbsp;&nbsp;' + params.name + '&nbsp;&nbsp;&nbsp;' + params.value[2] + '&nbsp;&nbsp;';
                } else {
                    return '&nbsp;&nbsp;' + params.name + '&nbsp;&nbsp;&nbsp;' + params.value + '&nbsp;&nbsp;';
                }
            },

        },
        geo: {
        map: 'china',
        show: true,
        roam: false,
        label: {
            emphasis: {
                show: false
            }
        },
        aspectScale: 1,
        layoutSize: "100%",
        itemStyle: {
            normal: {
                borderColor: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#00F6FF'
                }, {
                    offset: 1,
                    color: '#53D9FF'
                }], false),
                borderWidth: 3,
                shadowColor: '#032764',
                shadowOffsetY: 25,
                shadowBlur: 2
            }
          }
        },
        series: [
          {
          type: 'map',
          map: 'china',
          aspectScale: 1,
          label: {
              normal: {
                  show: false,
              },
              emphasis: {
                  show: false,
              }
          },
          itemStyle: {
              normal: {
                  areaColor: {
                      type: 'linear',
                      x: 200,
                      y: 200,
                      x2: 800,
                      y2: 800,
                      colorStops: [{
                          offset: 0,
                          color: '#04a2f7' // 0% 处的颜色
                      }, {
                          offset: 1,
                          color: '#05173f' // 100% 处的颜色
                      }],
                      globalCoord: true,
                      global: true
                  },
                  borderColor: '#215495',
                  borderWidth: 1,
              },
              emphasis: {
                  areaColor: {
                      x: 200,
                      y: 200,
                      x2: 800,
                      y2: 800,
                      colorStops: [{
                          offset: 0,
                          color: '#04a2f7' // 0% 处的颜色
                      }, {
                          offset: 1,
                          color: '#05173f' // 100% 处的颜色
                      }],
                  },
              }
          },
      },{
        type: 'scatter',
        coordinateSystem: 'geo',
        rippleEffect: {
            brushType: 'stroke'
        },
        showEffectOn: 'render',
        itemStyle: {
            normal: {
              color: function(item) {
                if (item.value[2] < 3000) {
                  return colorMap[0];
                }

                if (item.value[2] > 6000) {
                  return colorMap[1];
                }

                return colorMap[2];
              },
              borderColor: 'rgba(255, 255, 255, 0.2)',
              borderWidth: 2
            }
        },
        label: {
            normal: {
                show: false,
                color: '#fff',
                fontWeight: 'bold',
                position: 'inside',
                formatter: function(para) {
                    return '{cnNum|' + para.data.value[2] + '}'
                },
            },
        },
        symbol: 'circle',
        symbolSize: function(val) {
            if (val[2] === 0) {
                return 0;
            }
            
            if (val[2] < 3000) {
              return 10;
            }

            if (val[2] > 6000) {
              return 15;
            }

            return 20;
        },
        data: [],
        zlevel: 1,
    }]
      },
    };
  },
  mounted() {
    this.myChart = echarts.init(this.$refs.chart);
    this.calMap();
    this.fetchData();
    var mapFeatures = echarts.getMap('china').geoJson.features;
    var geoCoordMap = {};
    mapFeatures.forEach(v => {
        // 地区名称
        var name = v.properties.name;
        // 地区经纬度
        this.geoCoordMap[name] = v.properties.cp;
    });
  },
  methods: {
    calMap() {
      const h = this.$refs.chart.clientHeight;
      const w = this.$refs.chart.clientWidth;
      let x = 0, y = 0, x2 = 0, y2 = 0;
      if (h > w) {
        x = (h - w)/2;
        y = 0;
        x2 = x + w;
        y2 = w;
      } else {
        x = 0;
        y = (w - h)/2;
        x2 = h;
        y2 = y + h;
      }
      this.option.series[0].itemStyle.normal.areaColor.x = x;
      this.option.series[0].itemStyle.normal.areaColor.x2 = x2;
      this.option.series[0].itemStyle.normal.areaColor.y = y;
      this.option.series[0].itemStyle.normal.areaColor.y2 = y2;
    },
    fetchData() {
      const url = '/apis/stats/11/groups/*/members/*/views/*';
      $http.get(url).then(res => {
        let data = res.data['省级统计'] || [];
        let mapData = data.map(v => {
          return {
            name: v[0],
            value: v[1]
          };
        });
        this.option.series[0].data = mapData;
        this.option.series[1].data = this.convertData(data);
        this.myChart.setOption(this.option);
      });
    },
    convertData(outdata) {
      var res = [];
      for (var i = 0; i < outdata.length; i++) {
          var geoCoord = this.geoCoordMap[outdata[i][0]];
          if (geoCoord) {
              res.push({
                  name: outdata[i][0],
                  value: geoCoord.concat(outdata[i][1]),
              });
          }
      }
      return res;
    }
  }
};
</script>
<style scoped>
.mapChart {
  height: 100%;
}
</style>