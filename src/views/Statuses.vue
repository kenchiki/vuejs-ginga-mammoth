<template>
  <div class="accounts container">
    <h1 class="container__title">投稿</h1>
    <div class="container__in">
      <ul class="timelines" v-if="timelines.length">
        <li class="timelines__box" is="Timeline" v-for="timeline in timelines" v-bind:key="timeline.id" v-bind:timeline="timeline"></li>
      </ul>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import Timeline from '@/components/Timeline.vue';

  export default {
    data: function () {
      return {
        error: null,
      }
    },
    computed: {
      ...mapState({
        timelines: state => state.timelines.timelines,
        accounts: state => state.accounts.accounts
      })
    },
    components: {
      Timeline
    },
  }
</script>

<style scoped lang="scss">
  .timelines {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    width: 100%;
    height: 500px;
    overflow-x: scroll;
    overflow-y: hidden;
    &__box {
      width: 300px;
      height: 100%;
      flex-shrink:0;
      overflow-y: scroll;
    }
  }
</style>
