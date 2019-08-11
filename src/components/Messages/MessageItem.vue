<template>
  <div class="message-item" :class="[message.isPlaceholder ? 'sending' : '']">
    <q-separator />
    <div class="text-subtitle2">
      {{ message.user.displayName }}
    </div>
    <div class="message-bubble">
      <div class="message-content">
        {{ message.body }}
      </div>
    </div>
    &nbsp;
    <Time
      style="font-size: 0.8em; color: #aaa"
      :date="message.createdAt"
      :options="{ includeTime: true }"
    />
  </div>
</template>

<script>
export default {
  name: "message-item",
  props: {
    message: {
      type: Object,
      required: true
    }
  }
};
</script>

<style lang="stylus" scoped>
.message-item
  &:last-child
    padding-top: 20px
  margin-bottom: 10px

  &.sending
    opacity: 0.7

.message-bubble
  margin-top: 10px
  display: inline-block
  padding: 10px 15px
  border-radius: 8px
  background: $primary

.message-details
  font-size: 0.8em

.message-content
  color: white
</style>
