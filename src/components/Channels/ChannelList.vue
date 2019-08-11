<template>
  <q-list>
    <q-separator />
    <q-item-label header>Joined Channels</q-item-label>

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
        <div class="row items-center justify-between">
          <q-item-label>
            {{ channel.title }}
          </q-item-label>
          <q-btn
            v-if="channel.createdBy.id === currentUser.id"
            @click.prevent="onSettingsClick(channel)"
            icon="settings"
            flat
          />
        </div>
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
    ...mapGetters("currentUser", ["getCurrentUser"]),
    myJoinedChannels() {
      return this.getMyJoinedChannels;
    },
    currentUser() {
      return this.getCurrentUser;
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
    },
    onSettingsClick(channel) {}
  }
};
</script>

<style lang="stylus" scoped>
.selected
  background: $secondary
</style>
