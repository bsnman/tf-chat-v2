<template>
  <q-drawer v-model="_leftDrawerOpen" bordered content-class="bg-grey-2">
    <q-list>
      <q-item-label header>You</q-item-label>
      <q-item clickable v-ripple tag="a">
        <q-item-section avatar>
          <q-icon name="person" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ currentUser.displayName }}</q-item-label>
          <q-item-label caption>{{ currentUser.userType }}</q-item-label>
        </q-item-section>
      </q-item>

      <q-separator />
      <q-item-label header>Users</q-item-label>

      <q-item clickable v-ripple tag="a">
        <q-item-section avatar>
          <q-icon name="person" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Juan Luna</q-item-label>
          <q-item-label caption>member</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>

    <channel-list />

    <q-list class="logout-button">
      <q-item @click="onLogout" clickable v-ripple tag="a">
        <q-item-section avatar>
          <q-icon name="logout" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Logout</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-drawer>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ChannelList from "@/components/Channels/ChannelList";

export default {
  name: "base-drawer",
  components: {
    ChannelList
  },
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters("currentUser", ["getCurrentUser"]),
    _leftDrawerOpen: {
      get() {
        return this.value;
      },
      set(v) {
        this.$emit("input", v);
      }
    },
    currentUser() {
      return this.getCurrentUser;
    }
  },
  methods: {
    ...mapActions("auth", ["logout"]),
    onLogout() {
      this.logout();
    }
  }
};
</script>

<style lang="stylus" scoped>
.logout-button
  position: absolute
  bottom: 0
  right: 0
  left: 0
</style>
