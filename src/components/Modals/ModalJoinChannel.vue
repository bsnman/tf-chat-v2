<template>
  <q-dialog v-model="showModal" class="modal-join-channel">
    <q-card class="join-channel-card">
      <q-form ref="formJoinChannel" @submit="joinChannelClick">
        <div class="text-subtitle2">
          Join Channel
        </div>
        <q-card-section>
          <q-input
            v-model="channelId"
            label="Channel Id"
            hint="Ask your friend to give you the channel id"
            lazy-rules
            :rules="[
              val => (val && val.length != 0) || 'Channel id cannot be empty'
            ]"
          />
        </q-card-section>
        <q-card-actions class="flex justify-end">
          <q-btn flat v-close-popup>
            Close
          </q-btn>
          <q-btn type="submit" color="primary" flat>
            Join
          </q-btn>
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "modal-join-channel",
  props: {
    value: Boolean
  },
  computed: {
    showModal: {
      get() {
        return this.value;
      },
      set(v) {
        this.$emit("input", v);
      }
    }
  },
  data() {
    return {
      channelId: ""
    };
  },
  methods: {
    ...mapActions("channels", ["joinChannel"]),
    joinChannelClick() {
      this.joinChannel({
        channelId: this.channelId
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
.join-channel-card
  padding: 20px 25px
  width: 350px
</style>
