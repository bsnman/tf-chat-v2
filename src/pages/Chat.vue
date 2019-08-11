<template>
  <q-page class="flex flex-center"> </q-page>
</template>

<script>
import VueCookie from "vue-cookie";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "chat",
  data() {
    return {};
  },
  computed: {
    ...mapGetters("channels", [
      "getChannelMessagesCursor",
      "getChannelMessages"
    ]),
    channelId() {
      return this.$route.query.channelId;
    },
    messages() {
      return this.getChannelMessages;
    },
    cursor() {
      return this.getChannelMessagesCursor;
    }
  },
  watch: {
    channelId(n, o) {
      if (n) {
        this.loadChannelMessages({ channelId: this.channelId });
      }
    }
  },
  mounted() {
    if (this.channelId) {
      this.loadChannelMessages({ channelId: this.channelId });
    }
  },
  methods: {
    ...mapActions("channels", ["loadChannelMessages"]),
    loadNextPage() {
      if (this.channelId) {
        this.loadChannelMessages({
          channelId: this.channelId,
          cursor: this.cursor
        });
      }
    }
  }
};
</script>
