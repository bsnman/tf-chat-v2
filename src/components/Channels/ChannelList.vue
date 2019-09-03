<template>
  <div class="channel-list">
    <q-list>
      <q-separator />

      <q-item-label header class="flex justify-between">
        Joined channels
        <q-btn-dropdown icon="add" flat style="margin: -10px" rounded>
          <q-list>
            <q-item clickable v-close-popup @click="createChannelClick">
              <q-item-section>
                <q-item-label>Create Channel</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable v-close-popup @click="joinChannelClick">
              <q-item-section>
                <q-item-label>Join Channel</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-item-label>

      <q-item
        class="channel-item"
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
            <div class="channel-item-actions">
              <q-btn
                v-if="channel.createdBy.id === currentUser.id"
                @click="onSettingsClick(channel)"
                icon="settings"
                round
                flat
              />
            </div>
          </div>
        </q-item-section>
      </q-item>
    </q-list>

    <ModalJoinChannel v-model="showModalJoinChannel" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import _ from "lodash";
import ModalJoinChannel from "../Modals/ModalJoinChannel";

export default {
  name: "channel-list",
  components: {
    ModalJoinChannel
  },
  computed: {
    ...mapGetters("channels", ["getMyJoinedChannels"]),
    ...mapGetters("currentUser", ["getCurrentUser"]),
    myJoinedChannels() {
      return this.getMyJoinedChannels;
    },
    currentUser() {
      return this.getCurrentUser;
    },
    channelId() {
      return this.$route.params.channelId;
    }
  },
  data() {
    return {
      showModalJoinChannel: false
    };
  },
  created() {
    this.loadMyJoinedChannels().then(res => {
      if (res[0] && res[0].id && !this.channelId) {
        this.toChannel(res[0]);
      }
    });
  },
  methods: {
    ...mapActions("channels", ["loadMyJoinedChannels"]),
    onChannelClick(channel) {
      this.toChannel(channel);
    },
    onSettingsClick(channel) {
      event.stopPropagation();
      this.toChannelSettings(channel);
    },
    toChannel(channel) {
      this.$router.push({ path: `/chat/${channel.id}` });
    },
    toChannelSettings(channel) {
      this.$router.push({ path: `/channel/${channel.id}/settings` });
    },
    createChannelClick() {},
    joinChannelClick() {
      this.showModalJoinChannel = !this.showModalJoinChannel;
    }
  }
};
</script>

<style lang="stylus" scoped>
.selected
  background: $secondary

.channel-list
  .channel-item
    &:hover
      .channel-item-actions
        visibility: inherit

  .channel-item-actions
    visibility: hidden
</style>
