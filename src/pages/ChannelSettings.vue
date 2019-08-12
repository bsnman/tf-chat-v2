<template>
  <div class="channel-settings">
    <div class="channel-settings-title">
      <q-input
        :input-style="{ fontSize: '20px' }"
        v-model="singleChannel.title"
      >
        <template v-slot:prepend>
          <q-icon name="fas fa-hashtag" />
        </template>
      </q-input>
    </div>

    <div class="channel-settings-footer flex justify-end">
      <q-btn @click="onSaveClick" color="primary">
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
      singleChannel: {}
    };
  },
  watch: {
    channelId(n, o) {
      if (n) {
        this.loadSingleChannel({ channelId: this.channelId });
      }
    },
    getSingleChannel(n, o) {
      if (n) {
        this.singleChannel = n;
      }
    }
  },
  mounted() {
    if (this.channelId) {
      this.loadSingleChannel({ channelId: this.channelId });
    }
  },
  methods: {
    ...mapActions("channels", ["loadSingleChannel", "updateChannel"]),
    ...mapMutations("channels", ["setSingleChannel"]),
    onSaveClick() {
      this.updateChannel({ payload: this.singleChannel });
    }
  }
};
</script>

.<style lang="stylus" scoped>
.channel-settings
  padding: 20px 25px

.channel-settings-footer
  margin-top: 20px
</style>
