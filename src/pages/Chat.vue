<template>
  <q-page class="flex flex-center">
		Chat
  </q-page>
</template>

<script>
export default {
  name: 'chat',
  mounted() {
    console.log(this.$apollo);
    console.log(this.$apollo.defaultClient);
    console.log(this.$store);
    this.$store.dispatch('auth/authenticate', { email: 'radihjrprgs@gmail.com', password: 'test123' });
  },
  data() {
    return {
    };
  },
};
</script>
