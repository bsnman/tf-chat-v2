<template>
  <q-list>
    <q-item
      v-for="channel in myJoinedChannels"
      :key="channel.id"
      @click="onChannelClick(channel)"
      clickable
      v-ripple
      tag="a"
      :class="[channel.id === channelId ? 'selected' : '']"
    >
      <q-item-section avatar>
        <q-icon name="fas fa-hashtag" />
      </q-item-section>
      <q-item-section>
        <q-item-label>
          {{ channel.title }}
        </q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import _ from "lodash";

export default {
  name: "channel-list",
  computed: {
    ...mapGetters("channels", ["getMyJoinedChannels"]),
    myJoinedChannels() {
      return this.getMyJoinedChannels;
    },
    channelId: {
      get() {
        return this.$route.query.channelId;
      },
      set(v) {
        const query = _.clone(this.$route.query);

        query.channelId = v;

        this.$router.push({ query });
      }
    }
  },
  created() {
    this.loadMyJoinedChannels().then(res => {
      if (res[0] && res[0].id && !this.channelId) {
        this.channelId = res[0].id;
      }
    });
  },
  methods: {
    ...mapActions("channels", ["loadMyJoinedChannels"]),
    onChannelClick(channel) {
      this.channelId = channel.id;
    }
  }
};
</script>

<style lang="stylus" scoped>
.selected
  background: $secondary
</style>
