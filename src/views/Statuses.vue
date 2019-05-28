<template>
  <div class="accounts container">
    <h1 class="container__title">投稿</h1>
    <div class="container__in">
      <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modal-status-window">トゥート</button>
      <ul class="timelines" v-if="timelines.length">
        <li class="timelines__box" is="Timeline" v-for="timeline in timelines" v-bind:key="timeline.id" v-bind:timeline="timeline"></li>
      </ul>
    </div>

    <!--modal-->
    <div class="modal fade" id="modal-status-window" tabindex="-1" role="dialog" aria-labelledby="exampleModalScrollableTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-scrollable" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalScrollableTitle">トゥート</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="error" v-if="error">
              {{ error.response.data.error }}
            </div>
            <div class="form-group">
              <label for="modal-account" class="col-form-label">アカウント選択:</label>
              <select v-model="account_id" class="form-control" id="modal-account">
                <option v-for="account in accounts" v-bind:key="account.id" v-bind:value="account.id">{{account.instance_name}}</option>
              </select>
            </div>

            <div class="form-group">
              <label for="modal-status" class="col-form-label">内容:</label>
              <textarea v-model="status" class="form-control" id="modal-status" rows="5"></textarea>
            </div>

            <div class="form-group">
              <ul class="medias" v-if="medias.length">
                <li v-for="media in medias" v-bind:key="media.id">
                  <img v-bind:src="media.preview_url" alt="">
                </li>
              </ul>
              <label for="modal-file" class="col-form-label">画像:</label>
              <input type="file" @change="uploadFile" class="form-control" id="modal-file">
            </div>

            <div class="form-group">
              <Drawing v-on:drew="uploadCanvas" />
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" v-on:click="createStatus">トゥート！</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">閉じる</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import Timeline from '@/components/Timeline.vue';
  import Drawing from '@/components/Drawing.vue'
  import $ from 'jquery';

  export default {
    data: function () {
      return {
        status: '',
        error: null
      }
    },
    computed: {
      ...mapState({
        timelines: state => state.timelines.timelines,
        accounts: state => state.accounts.accounts,
        medias: state => state.medias.medias
      })
    },
    components: {
      Drawing, Timeline
    },
    methods: {
      getAccount(account_id) {
        return this.accounts.find((account) => {
          return account.id === account_id;
        });
      },
      async createStatus() {
        await this.$store.dispatch('statuses/create', {
          account: this.getAccount(this.account_id),
          status: this.status,
          medias: this.$store.state.medias.medias
        });
        this.error = this.$store.state.statuses.error;
        this.$store.commit('medias/clearMedias');
        this.status = '';

        if(!this.error) {
          $('#modal-status-window').modal('hide');
        }
      },
      async uploadFile(e) {
        e.preventDefault();
        const file = e.target.files[0];
        await this.$store.dispatch('medias/uploadFile', {
          account: this.getAccount(this.account_id),
          file: file
        });
        this.error = this.$store.state.medias.error;
        e.target.value = '';// 未選択状態にする
      },
      async uploadCanvas(canvas) {
        await this.$store.dispatch('medias/uploadCanvas', {
          account: this.getAccount(this.account_id),
          canvas: canvas
        });
        this.error = this.$store.state.medias.error;
      },
    },
    created() {
      this.account_id = this.accounts[0].id;
    }
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

  .medias {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: flex-start;
    list-style: none;

    & > * {
      width: 25%;
    }

    img {
      width: 100%;
    }
  }
</style>
