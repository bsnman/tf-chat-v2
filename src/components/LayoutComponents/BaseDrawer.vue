<template>
  <q-drawer v-model="_leftDrawerOpen" bordered content-class="bg-grey-2">
    <q-list>
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

      <q-separator />
      <q-item-label header>Channels</q-item-label>

      <q-item clickable v-ripple tag="a">
        <q-item-section avatar>
          <q-icon name="chat" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Room 1</q-item-label>
          <q-item-label caption>2 users</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>

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
import { mapActions } from "vuex";

export default {
  name: "base-drawer",
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    _leftDrawerOpen: {
      get() {
        return this.value;
      },
      set(v) {
        this.$emit("input", v);
      }
    }
  },
  methods: {
    ...mapActions("auth", ["logout"]),
    onLogout() {
      console.log("hello");
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
