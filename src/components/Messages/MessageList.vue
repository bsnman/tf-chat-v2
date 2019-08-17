<template>
  <div class="message-list reverse column no-wrap">
    <template v-for="message in messages">
      <MessageItem
        :message="message"
        :key="message.id"
        @onDeleteClick="onDeleteClick"
      />
    </template>
  </div>
</template>

<script>
import MessageItem from "./MessageItem";

export default {
  name: "message-list",
  components: {
    MessageItem
  },
  props: {
    messages: {
      type: Array,
      required: true
    }
  },
  methods: {
    onDeleteClick(message) {
      this.$emit("onDeleteMessage", message);
    }
  }
};
</script>

<style lang="stylus" scoped>
.message-list
  height: 100%
  padding: 20px 25px
  overflow-y: auto
</style>
