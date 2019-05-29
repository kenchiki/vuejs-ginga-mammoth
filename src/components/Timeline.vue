<template>
  <div class="timeline">
    <h2 class="timeline__title">{{timeline.account.instance_name}}({{timeline.type}})</h2>
    <ul class="timeline__list" v-if="statuses.length">
      <li v-for="status in statuses" v-bind:key="status.id" class="timeline__status">
        <div class="timeline__status_thumb">
          <img v-bind:src="status.account.avatar" alt="">
        </div>
        <dl class="timeline__status_card">
          <dt class="timeline__status_title">{{ status.account.display_name }}</dt>
          <dd v-html="status.content" class="timeline__status_content"></dd>
          <ul class="timeline__medias" v-if="status.media_attachments.length">
            <li v-for="media in status.media_attachments" v-bind:key="media.id">
              <a v-bind:href="media.preview_url" target="_blank"><img v-bind:src="media.preview_url" alt=""></a>
            </li>
          </ul>
        </dl>
      </li>
    </ul>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    props: ['timeline'],
    data: function () {
      return {
        statuses: [],
        socket: null
      }
    },
    methods: {
      getStreamingType() {
        if (this.timeline.type === 'home') {
          return 'user';
        }
        if (this.timeline.type === 'local') {
          return 'public:local';
        }
      },
      async fetchHome() {
        const response = await axios.get(`${this.timeline.account.mastodon_url}/api/v1/timelines/home`, {
          headers: {'Authorization': `Bearer ${this.timeline.account.token}`}
        });
        return response.data;
      },
      async fetchLocal() {
        const response = await axios.get(`${this.timeline.account.mastodon_url}/api/v1/timelines/public`, {
          params: {local: true},
          headers: {'Authorization': `Bearer ${this.timeline.account.token}`}
        });
        return response.data;
      },
      async fetchStatuses() {
        // TODO:エラー処理
        if (this.timeline.type === 'home') {
          this.statuses = await this.fetchHome();
        }
        if (this.timeline.type === 'local') {
          this.statuses = await this.fetchLocal();
        }
      },
      connectSocket() {
        this.socket = new WebSocket(`${this.timeline.account.streaming_url}/api/v1/streaming/?stream=${this.getStreamingType()}&access_token=${this.timeline.account.token}`);
        this.socket.addEventListener('message', (event) => {
          const response = JSON.parse(event.data);
          const payload = JSON.parse(response.payload);
          if (response.event === 'update') {
            this.statuses.unshift(payload);
          }
        });
      },
      disconnectSocket() {
        this.socket.close();
        this.socket = null;
      },
    },
    async created() {
      await this.fetchStatuses();
      this.connectSocket();
    },
    destroyed() {
      this.disconnectSocket();
    }
  }
</script>

<style scoped lang="scss">
  @import "../assets/stylesheets/module/_mixins.scss";

  .timeline {
    background: #fff;
    width: 100%;
    height: 100%;
    overflow-y: scroll;

    &__title {
      background: #223;
      color: #fff;
      padding: 10px;
      font-size: 1.8rem;
    }

    &__status {
      padding: 10px;
      border-bottom: 1px solid #ccc;
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;

      & > * {
        flex-shrink: 0;
      }
    }

    &__status_thumb {
      width: 40px;

      img {
        width: 100%;
      }
    }

    &__status_card {
      margin-left: 10px;
      flex: 1;
    }

    &__status_title {
      font-size: 1.4rem;
    }

    &__status_content {
      font-size: 1.4rem;
    }

    &__medias {
      @include grid($x: 5, $y: 5, $n: 2, $flow: wrap);

      img {
        width: 100%;
      }
    }
  }
</style>
