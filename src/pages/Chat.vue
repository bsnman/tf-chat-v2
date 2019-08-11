<template>
  <q-page class="flex flex-center"> Chat {{ token }} </q-page>
</template>

<script>
import VueCookie from "vue-cookie";

export default {
  name: "Chat",
  data() {
    return {};
  },
  computed: {
    cons() {
      return this.$utils.cons;
    },
    token() {
      return this.$cookie.get(this.$utils.cons.COOKIE.USER_TOKEN);
    }
  },
  mounted() {
    console.log(this.$apolloProvider.defaultClient)
  }
};
</script>
