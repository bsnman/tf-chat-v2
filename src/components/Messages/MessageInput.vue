<template>
  <div class="message-input">
    <q-separator />
    <div class="input-container flex">
      <q-btn icon="add" flat />
      <q-input
        class="input"
        v-model="body"
        @keydown="inputHandler"
        square
        filled
        autogrow
        autofocus
      >
        <template v-slot:append>
          <q-btn @click="onSendMessage" flat round icon="send" />
        </template>
      </q-input>
    </div>
  </div>
</template>

<script>
export default {
  name: "message-input",
  data() {
    return {
      body: ""
    };
  },
  methods: {
    inputHandler(e) {
      if (e.keyCode === 13 && !e.shiftKey) {
        e.preventDefault();
        this.onSendMessage();
      }
    },
    onSendMessage() {
      const message = this.body;
      if (message) {
        this.body = "";
        this.$emit("onSendMessage", { body: message });
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
.input
  flex-grow: 1

.message-input
  .input /deep/
    textarea
      overflow-y: hidden
</style>
