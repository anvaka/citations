<template>
  <div class='chart'>
    <a v-for='(paper, index) in vm.papers' class='bar' :key='index' :href='paper.url' target='_blank' :title='paper.t'>
      <div class='background' :style="{'width': getWidth(paper)}"></div>
      <div class='text'>
        <b>{{index + 1}}.</b> 
        <div class='paper-title-container'>
          <div class='title'>{{paper.t}}</div>
          <div class='info'>
            <span v-if='paper.y'>Published {{paper.y}}.</span><span> Cited {{formatNumber(paper.c)}} times</span>
          </div>
        </div>
      </div>
    </a>
  </div>
</template>
<script>
export default {
  name: 'Chart',
  props: ['vm'],
  methods: {
    getWidth(p) {
      let {min, max} = this.vm;
      return Math.round(100 * (p.c - min) / (max - min)) + '%';
    },
    formatNumber(x) {
      return x.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    }
  }
}
</script>


<style lang="stylus">
.background {
  background-color: #eee;
  width: 100%;
  position: absolute;
  height: 95%;
}
.bar {
  position: relative;
  display: flex;
  align-content: center;
  text-decoration: none;

  border 1px solid transparent;
  &:hover {
    border 1px solid;
    color: highlight-color;
  }
  .text {
    display: flex;
    flex-direction: row;
    color: #333;
    z-index: 2;
    min-height: 24px;
    width: 100%;
    b {
      padding: 0 8px;
    }
    .paper-title-container {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      .title {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
    .info {
      font-size: 8px;
      padding: 4px 0;
    }
  }
}
.chart {
  position: absolute;
  top: 90px;
  bottom: 0;
  max-width: 600px;
  overflow-y: scroll; /* has to be scroll, not auto */
    -webkit-overflow-scrolling: touch;
 }
</style>