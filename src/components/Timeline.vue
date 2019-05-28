<template>
  <div>
    <h2>{{timeline.account.instance_name}}:{{timeline.type}}</h2>
    <ul class="statuses" v-if="statuses.length">
      <li class="statuses__item" v-for="status in statuses" v-bind:key="status.id">
        <dl class="statuses__card">
          <dt class="statuses__title">{{ status.account.display_name }}</dt>
          <dd v-html="status.content"></dd>
          <ul class="statuses__medias" v-if="status.media_attachments.length">
            <li v-for="media in status.media_attachments" v-bind:key="media.id">
              <img v-bind:src="media.preview_url" alt="">
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
        if(this.timeline.type === 'home') {
          return 'user';
        }
        if(this.timeline.type === 'local') {
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
        if(this.timeline.type === 'home') {
          this.statuses = await this.fetchHome();
        }
        if(this.timeline.type === 'local') {
          this.statuses = await this.fetchLocal();
        }
      },
       connectSocket() {
         this.socket = new WebSocket(`${this.timeline.account.streaming_url}/api/v1/streaming/?stream=${this.getStreamingType()}&access_token=${this.timeline.account.token}`);
         this.socket.addEventListener('message', (event)=> {
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
