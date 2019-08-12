<template>
  <div class="message-item" :class="[message.isPlaceholder ? 'sending' : '']">
    <q-separator />
    <div class="message-container flex">
      <div class="message-details">
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
          :options="{
            includeTime: true,
            showTimeIfToday: true
          }"
        />
      </div>
      <div class="message-actions" :class="[message.isDeleting ? 'show' : '']">
        <q-btn
          v-if="message.user.id === currentUser.id"
          @click="onDeleteClick"
          :loading="message.isDeleting"
          round
          flat
          icon="delete"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "message-item",
  props: {
    message: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters("currentUser", ["getCurrentUser"]),
    currentUser() {
      return this.getCurrentUser;
    }
  },
  methods: {
    onDeleteClick() {
      this.$emit("onDeleteClick", this.message);
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

.message-container
  &:hover
    .message-actions
      visibility: inherit

.message-details
  flex-grow: 1

.message-actions
  visibility: hidden
  padding-top: 5px

  &.show
    visibility: inherit

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
