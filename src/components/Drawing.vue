<template>
  <div>
    <p class="canvas">
      <canvas id="canvas" width="400" height="300"></canvas>
    </p>
    <p>
      <input type="button" value="お絵かきをクリア" v-on:click="clear">
      <input type="button" value="お絵かき画像アップ" v-on:click="drew">
    </p>
  </div>
</template>

<script>
  import { fabric } from 'fabric';

  export default {
    data: function () {
      return {
        canvas: null
      }
    },
    methods: {
      clear() {
        this.canvas.clear();
        this.fill();
      },
      fill() {
        const rect = new fabric.Rect({
          top : 0,
          left : 0,
          width : 500,
          height : 300,
          fill : '#ffffff'
        });
        this.canvas.add(rect);
      },
      setup() {
        this.canvas.isDrawingMode = true;  // お絵かきモードの有効化
        this.canvas.freeDrawingBrush.color = "#000000"; // 描画する線の色
        this.canvas.freeDrawingBrush.width = 5;  // 描画する線の太さ
        this.fill();
      },
      drew() {
        this.$emit('drew', document.getElementById('canvas'));
        this.clear();
        this.fill();
      }
    },
    mounted() {
      this.canvas = new fabric.Canvas('canvas');
      this.setup();
    }
  }
</script>

<style scoped lang="scss">
  .canvas {
    padding-left: 50px;
  }

  #canvas {
    border: 1px solid #000;
  }
</style>
