<template>
  <div class="channel-settings">

    <div class="channel-page-content flex justify-end">
      <q-btn @click="onCloseClick" icon="close" flat round> </q-btn>
    </div>

    <q-separator />

    <div 
      v-if="singleChannel.createdBy.id === currentUser.id"
      class="channel-page-content channel-details">
      <div class="channel-settings-header flex justify-between align-center">
        <div class="text-subtitle2" style="line-height: 45px">
          Channel Settings
        </div>
      </div>

      <q-separator />

      <div class="channel-settings-title">
        <q-input
          :input-style="{ fontSize: '20px' }"
          v-model="singleChannel.title"
          label="Room Title"
        >
          <template v-slot:prepend>
            <q-icon name="fas fa-hashtag" />
          </template>
        </q-input>
      </div>

      <div class="channel-settings-footer flex justify-end">
        <q-btn @click="onSaveClick" color="primary" :loading="savingChannel">
          Save
        </q-btn>
      </div>
    </div>

    <q-separator />

    <div class="channel-page-content channel-leave">
      <div class="channel-settings-header flex justify-between align-center">
        <div class="text-subtitle2" style="line-height: 45px">
          Leave Channel
        </div>
        <q-btn @click="onLeavelChannelClick" icon="close" color="red">Leave Channel</q-btn>
      </div>
    </div>
    
    <q-separator />
    
    <div 
      v-if="singleChannel.createdBy.id === currentUser.id"
      class="channel-page-content channel-leave">
      <div class="channel-settings-header flex justify-between align-center">
        <div class="text-subtitle2" style="line-height: 45px">
          Deleted Channel
        </div>
        <q-btn @click="onDeleteChannelClick" icon="close" color="red">Delete Channel</q-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { Notify } from "quasar";

import { mapGetters, mapActions, mapMutations } from "vuex";
import _ from "lodash";

export default {
  name: "channel-settings",
  computed: {
    ...mapGetters("channels", ["getSingleChannel"]),
    ...mapGetters("currentUser", ["getCurrentUser"]),
    channelId() {
      return this.$route.params.channelId;
    },
    currentUser() {
      return this.getCurrentUser
    }
  },
  data() {
    return {
      loadingChannel: false,
      savingChannel: false,
      singleChannel: {}
    };
  },
  watch: {
    channelId: {
      handler(n, o) {
        this.loadChannel();
      },
      immediate: true
    },
    getSingleChannel: {
      handler(n, o) {
        if (n) {
          this.singleChannel = _.clone(n);
        }
      },
      immediate: true
    }
  },
  methods: {
    ...mapActions("channels", ["loadSingleChannel", "updateChannel", "leaveChannel"]),
    ...mapMutations("channels", ["setSingleChannel"]),
    loadChannel() {
      if (this.channelId) {
        this.loadingChannel = true;
        this.loadSingleChannel({ channelId: this.channelId }).finally(() => {
          this.loadingChannel = false;
        });
      }
    },
    onSaveClick() {
      if (this.channelId) {
        this.savingChannel = true;
        this.updateChannel({ payload: this.singleChannel }).finally(() => {
          this.savingChannel = false;
        });
      }
    },
    onLeavelChannelClick() {
      if(this.channelId) {
        this.isLeavingChannel = true

        this.leaveChannel({ channelId: this.channelId })
          .then(res => {

            Notify.create({
              message: "Leave Channel"
            });

            this.$router.push({ path: `/chat` });
          })
      }
    },
    onDeleteChannelClick() {
      if(this.channelId) {
        this.isLeavingChannel = true

        this.leaveChannel({ channelId: this.channelId })
          .then(res => {
            
            Notify.create({
              message: "Channel Deleted"
            });

            this.$router.push({ path: `/chat` });
          })
      }
    },
    onCloseClick() {
      this.$router.push({ path: `/chat/${this.channelId}` });
    }
  }
};
</script>

.<style lang="stylus" scoped>
.channel-settings
  padding: 0px 25px
  display: flex
  flex-direction: column;
  align-items: center;

.channel-page-content
  width: 600px;
  max-width: 90%;
  padding: 20px 0px;

.channel-settings-footer
  margin-top: 20px
</style>
