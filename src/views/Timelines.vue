<template>
  <div class="little">
    <h1 class="little__title">タイムライン管理</h1>
    <div class="little__in">

      <div class="timelines-info" v-if="timelines.length">
        <div class="card" v-for="timeline in timelines" v-bind:key="timeline.id">
          <div class="card-body">
            <h5 class="card-title">{{timeline.account.instance_name}}({{timeline.type}})</h5>
            <input type="button" value="タイムライン削除" v-on:click="deleteTimeline(timeline.id)" class="btn btn-secondary">
          </div>
        </div>
      </div>

      <div class="form-group mt-5">
        <label for="account_id" class="col-form-label">アカウント選択:</label>
        <select v-model="account_id" class="form-control" id="account_id">
          <option v-for="account in accounts" v-bind:key="account.id" v-bind:value="account.id">{{account.instance_name}}</option>
        </select>
      </div>

      <div class="form-group">
        <label for="type" class="col-form-label">タイプ選択:</label>
        <select v-model="type" class="form-control" id="type">
          <option v-for="type in types" v-bind:key="type.id" v-bind:value="type.value">{{type.text}}</option>
        </select>
      </div>

      <div class="form-group">
        <input type="button" value="タイムライン追加" v-on:click="addTimeline" class="form-control btn btn-danger">
      </div>
    </div>
  </div>
</template>

<script>
  import {mapMutations, mapState} from 'vuex';

  export default {
    data: function () {
      return {
        error: null,
        types: [
          {text: 'ホーム タイムライン', value: 'home'},
          {text: 'ローカル タイムライン', value: 'local'},
        ],
      }
    },
    computed: {
      ...mapState({
        timelines: state => state.timelines.timelines,
        accounts: state => state.accounts.accounts
      })
    },
    methods: {
      ...mapMutations({
        deleteTimeline: 'timelines/deleteTimeline'
      }),
      // TODO:タイムライン並び替え
      addTimeline() {
        this.$store.commit('timelines/addTimeline', {account: this.getAccount(this.account_id), type: this.type});
      },
      // TODO:DRYにしたい
      getAccount(account_id) {
        return this.accounts.find((account) => {
          return account.id === account_id;
        });
      }
    },
    created() {
      this.account_id = this.accounts[0].id;
      this.type = this.types[0].value;
    }
  }
</script>

<style scoped lang="scss">
  @import "../assets/stylesheets/module/_mixins.scss";
  .timelines-info {
    @include grid($x: 5, $y: 5, $n: 3, $flow: wrap);
  }
</style>
