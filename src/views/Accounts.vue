<template>
  <div class="accounts container">
    <h1 class="container__title">アカウント管理</h1>
    <div class="container__in">
      <div class="wysiwyg">
        <div class="error" v-if="error">
          {{ error.response.data.error }}
        </div>
        <ul class="accounts" v-if="accounts.length">
          <li v-for="account in accounts" v-bind:key="account.id">
            {{account.instance_name}}
          </li>
        </ul>
        <p>
          <input type="text" v-model="mastodon_url">（テスト用：http://localhost:3000）
        </p>
        <p>
          <input type="button" value="アカウント追加" v-on:click="addAccount">
        </p>

        <p>
          <input type="button" value="全アカウント削除" v-on:click="deleteAllAccounts">
        </p>
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
        accounts: state => state.accounts.accounts
      })
    },
    methods: {
      async addAccount() {
        await this.$store.dispatch('accounts/fetchApp', this.mastodon_url);
        this.error = this.$store.state.accounts.error;
      },
      deleteAllAccounts() {
        this.$store.commit('accounts/clearStorage');
      }
    }
  }
</script>
