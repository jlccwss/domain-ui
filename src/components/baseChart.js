const baseChart = {
  data: function() {

  },
  mounted() {
    this.myChart = window.echarts.init(this.$refs.chart);
    this.refresh();
  },
  methods: {
    refresh() {
      this.fetchData();
      setTimeout(() => this.refresh(), 5000)
    }
  }
};

export default baseChart;