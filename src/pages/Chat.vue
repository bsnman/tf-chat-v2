<template>
  <q-page class="flex">
    <div class="chat-list flex column no-wrap">
      <MessageList :messages="messages" @onDeleteMessage="onDeleteMessage" />
      <MessageInput @onSendMessage="onSendMessage" />
    </div>
    <div class="members-list gt-xs">
      <UserList :users="members" />
    </div>
  </q-page>
</template>

<script>
import VueCookie from "vue-cookie";
import { mapActions, mapGetters } from "vuex";
import MessageList from "../components/Messages/MessageList";
import UserList from "../components/Users/UserList";
import MessageInput from "../components/Messages/MessageInput";
import * as queries from "../graphql/queries";

export default {
  name: "chat",
  components: {
    MessageList,
    UserList,
    MessageInput
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters("channels", [
      "getChannelMessagesCursor",
      "getChannelMembersCursor",
      "getChannelMessages",
      "getChannelMembers"
    ]),
    channelId() {
      return this.$route.params.channelId;
    },
    messages() {
      return this.getChannelMessages || [];
    },
    members() {
      return this.getChannelMembers || [];
    },
    cursorMessages() {
      return this.getChannelMessagesCursor;
    },
    cursorMembers() {
      return this.getChannelMembersCursor;
    }
  },
  watch: {
    channelId(n, o) {
      if (n) {
        this.loadChannelMessages({ channelId: this.channelId });
        this.loadChannelMembers({ channelId: this.channelId });
        this.onChannelMessageMutation({ channelId: this.channelId });
      }
    }
  },
  mounted() {
    if (this.channelId) {
      this.loadChannelMessages({ channelId: this.channelId });
      this.loadChannelMembers({ channelId: this.channelId });
      this.onChannelMessageMutation({ channelId: this.channelId });
    }
  },
  methods: {
    ...mapActions("channels", [
      "loadChannelMessages",
      "loadChannelMembers",
      "onChannelMessageMutation"
    ]),
    ...mapActions("messages", ["sendMessage", "deleteMessage"]),
    loadChannelMessagesNextPage() {
      if (this.channelId) {
        this.loadChannelMessages({
          channelId: this.channelId,
          cursor: this.cursorMessages
        });
      }
    },
    loadChannelMembersNextPage() {
      if (this.channelId) {
        this.loadChannelMembers({
          channelId: this.channelId,
          cursor: this.cursorMembers
        });
      }
    },
    onSendMessage({ body }) {
      const payload = {
        channelId: this.channelId,
        body
      };

      this.sendMessage(payload);
    },
    onDeleteMessage(message) {
      this.deleteMessage({ messageId: message.id });
    }
  }
};
</script>

<style lang="stylus" scoped>
.chat-list
  height: calc(100vh - 50px)
  max-width: calc(100% - 300px)
  flex-grow: 1

@media (max-width $breakpoint-xs-max)
  .chat-list
    max-width: 100%

.members-list
  width: 300px
  border-left: 1px solid $separator-color
</style>
