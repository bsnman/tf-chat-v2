<template>
  <q-list>
    <q-item
      v-for="channel in myJoinedChannels"
      :key="channel.id"
      clickable
      v-ripple
      tag="a"
    >
      <q-item-section avatar>
        <q-icon name="fas fa-hashtag" />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ channel.title }}</q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "channel-list",
  computed: {
    ...mapGetters("channels", ["getMyJoinedChannels"]),
    myJoinedChannels() {
      return this.getMyJoinedChannels;
    }
  },
  created() {
    this.loadMyJoinedChannels();
  },
  methods: {
    ...mapActions("channels", ["loadMyJoinedChannels"])
  }
};
</script>
