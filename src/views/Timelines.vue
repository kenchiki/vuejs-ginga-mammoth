<template>
  <div class="accounts container">
    <h1 class="container__title">タイムライン管理</h1>
    <div class="container__in">
      <div class="wysiwyg">
        <ul class="timelines" v-if="timelinesWithAccount.length">
          <li v-for="timeline in timelinesWithAccount" v-bind:key="timeline.id">
            {{timeline.account.instance_name}}:{{timeline.type}}
          </li>
        </ul>
        <p>
          <select v-model="account_id">
            <option v-for="account in accounts" v-bind:key="account.id" v-bind:value="account.id">{{account.instance_name}}</option>
          </select>
        </p>
        <p>
          <select v-model="type">
            <option v-for="type in types" v-bind:key="type.id" v-bind:value="type.value">{{type.text}}</option>
          </select>
        </p>
        <p>
          <input type="button" value="タイムライン追加" v-on:click="addTimeline">
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
      }),
      // TODO:mixinsにしたい
      timelinesWithAccount() {
        return this.timelines.map((timeline) => {
          timeline.account = this.accounts.find((account) => {
            return account.id === timeline.account_id;
          });
          return timeline;
        });
      }
    },
    methods: {
      addTimeline() {
        this.$store.commit('timelines/addTimeline', {account_id: this.account_id, type: this.type});
      }
    },
    created() {
      this.account_id = this.accounts[0].id;
      this.type = this.types[0].value;
    }
  }
</script>
