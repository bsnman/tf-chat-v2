<template>
  <q-dialog v-model="showModal" class="modal-join-channel">
    <q-card class="join-channel-card">
      <div class="text-subtitle2">
        Join Channel
      </div>
      <q-card-section>
        <q-input
          v-model="channelId"
          label="Channel Id"
        >
        </q-input>
      </q-card-section>
      <q-card-actions class="flex justify-end">
        <q-btn flat v-close-popup >
          Close
        </q-btn>
        <q-btn color="primary" flat >
          Join
        </q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: "modal-join-channel",
  props: {
    value: Boolean
  },
  computed: {
    showModal: {
      get() {
        return this.value
      },
      set(v) {
        this.$emit("input", v);
      }
    }
  },
  data() {
    return {
      channelId: ""
    }
  },
}
</script>

<style lang="stylus" scoped>
.join-channel-card
  padding: 20px 25px
  width: 350px
</style>

