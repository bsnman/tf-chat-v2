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
import _ from "lodash";

export default {
  name: "channel-list",
  computed: {
    ...mapGetters("channels", ["getMyJoinedChannels"]),
    myJoinedChannels() {
      return this.getMyJoinedChannels;
    }
  },
  created() {
    this.loadMyJoinedChannels().then(res => {
      console.log(res);
      if (res[0] && res[0].id) {
        const query = _.clone(this.$route.query);

        query.channelId = res[0].id;

        this.$router.push({ query });
      }
    });
  },
  methods: {
    ...mapActions("channels", ["loadMyJoinedChannels"])
  }
};
</script>
