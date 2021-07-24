<template>
    <div class="textChart flex">
      <div class="num-item" :key="$index" v-for="(num, $index) in total">{{num}}</div>
    </div>
</template>

<script>
import $http from '@/http';
export default {
  data() {
    return {
      total: '0'
    };
  },
  mounted() {
    this.refresh();
  },
  methods: {
    refresh() {
      this.fetchData();
      setTimeout(() => this.refresh(), 5000)
    },
    fetchData() {
      const url = '/apis/dashbaoard/cnt';
      $http.get(url).then(res => {
        if (res.data.qpsTotal) {
          let num = res.data.qpsTotal + '';
          this.$emit('total', res.data);
          if (num.length < 11) {
            num = '0'.repeat(11 - num.length) + num;
          }
          this.total = num;
        } else {
          this.$emit('total', res.data);
          this.total = '00000000000';
        }
      });
    }
  }
};
</script>
<style scoped>
.textChart {
  height: 100%;
  text-align: center;
  justify-content: center;
}
.num-item {
  color: #fff;
  font-size: 36px;
  background-image: linear-gradient(-60deg, rgba(75, 242, 230, .3) 0%, rgba(0, 101, 255, .3) 100%);
  border-radius: 2px;
  margin-right: 6px;
  height: 50px;
  width: 40px;
  line-height: 50px;
}
</style>