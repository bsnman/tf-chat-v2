<template>
  <div class="channel-settings">
    <div class="channel-settings-footer flex justify-between align-center">
      <div class="text-subtitle2" style="line-height: 45px">
        Channel Settings
      </div>
      <q-btn @click="onCloseClick" icon="close" flat round> </q-btn>
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
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import _ from "lodash";

export default {
  name: "channel-settings",
  computed: {
    ...mapGetters("channels", ["getSingleChannel"]),
    channelId() {
      return this.$route.params.channelId;
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
    channelId(n, o) {
      this.loadChannel();
    },
    getSingleChannel(n, o) {
      if (n) {
        this.singleChannel = _.clone(n);
      }
    }
  },
  mounted() {
    this.loadChannel();
  },
  methods: {
    ...mapActions("channels", ["loadSingleChannel", "updateChannel"]),
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
    onCloseClick() {
      this.$router.push({ path: `/chat/${this.channelId}` });
    }
  }
};
</script>

.<style lang="stylus" scoped>
.channel-settings
  padding: 0px 25px

.channel-settings-footer
  margin-top: 20px
</style>
