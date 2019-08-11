<template>
  <q-page class="chat-list">
    <div class="flex column no-wrap" style="height: calc(100vh - 50px);">
      <MessageList :messages="messages" />
      <MessageInput @onSendMessage="onSendMessage" />
    </div>
  </q-page>
</template>

<script>
import VueCookie from "vue-cookie";
import { mapActions, mapGetters } from "vuex";
import MessageList from "@/components/Messages/MessageList";
import MessageInput from "@/components/Messages/MessageInput";

export default {
  name: "chat",
  components: {
    MessageList,
    MessageInput
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters("channels", [
      "getChannelMessagesCursor",
      "getChannelMessages"
    ]),
    channelId() {
      return this.$route.params.channelId;
    },
    messages() {
      return this.getChannelMessages || [];
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
    },
    onSendMessage({ body }) {}
  }
};
</script>

<style lang="stylus" scoped></style>
