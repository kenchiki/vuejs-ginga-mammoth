<template>
  <div class="little">
    <h1 class="little__title">アカウント管理</h1>
    <div class="little__in">

      <div class="error" v-if="error">
        {{ error.response.data.error }}
      </div>

      <div class="accounts-info" v-if="accounts.length">
        <div class="card" v-for="account in accounts" v-bind:key="account.id">
          <div class="card-body">
            <h5 class="card-title">{{account.instance_name}}</h5>
            <input type="button" value="アカウント削除" v-on:click="deleteAccount(account.id)" class="btn btn-secondary">
          </div>
        </div>
      </div>

      <div class="form-group mt-5">
        <label for="mastodon_url" class="col-form-label">Mastodon URL:</label>
        <input type="text" v-model="mastodon_url" class="form-control" id="mastodon_url" placeholder="https://gingadon.com">
      </div>

      <div class="form-group">
        <input type="button" value="アカウント追加" v-on:click="addAccount" class="form-control btn btn-danger">
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex';

  export default {
    data: function () {
      return {
        error: null,
        mastodon_url: ''
      }
    },
    computed: {
      ...mapState({
        accounts: state => state.accounts.accounts,
      })
    },
    methods: {
      deleteAccount(account_id) {
        this.$store.commit('accounts/deleteAccount', account_id);
        this.$store.commit('timelines/deleteTimelineByAccount', account_id);
      },
      async addAccount() {
        await this.$store.dispatch('accounts/fetchApp', this.mastodon_url);
        this.error = this.$store.state.accounts.error;
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../assets/stylesheets/module/_mixins.scss";

  .accounts-info {
    @include grid($x: 5, $y: 5, $n: 3, $flow: wrap);
  }
</style>
