<template>
  <q-layout view="lHh Lpr lFf">
    <base-header @click="leftDrawerOpen = !leftDrawerOpen" />

    <base-drawer v-model="leftDrawerOpen" />

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapActions } from "vuex";
import BaseHeader from "../components/LayoutComponents/BaseHeader";
import BaseDrawer from "../components/LayoutComponents/BaseDrawer";

export default {
  name: "my-layout",
  components: {
    BaseHeader,
    BaseDrawer
  },
  data() {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop
    };
  },
  created() {
    this.loadCurrentUser();
  },
  methods: {
    ...mapActions("currentUser", ["loadCurrentUser"])
  }
};
</script>

<style></style>
