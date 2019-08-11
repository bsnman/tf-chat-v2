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
import BaseHeader from "../components/LayoutComponents/BaseHeader";
import BaseDrawer from "../components/LayoutComponents/BaseDrawer";
import { mapActions } from 'vuex'

export default {
  name: "MyLayout",
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
    this.getCurrentUser()
  },
  methods: {
    ...mapActions("currentUser", [
      "getCurrentUser"
    ])
  }
};
</script>

<style></style>
