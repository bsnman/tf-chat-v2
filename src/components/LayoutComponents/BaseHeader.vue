<template>
  <q-header elevated>
    <q-toolbar>
      <q-btn flat dense round @click="$emit('click')" aria-label="Menu">
        <q-icon name="menu" />
      </q-btn>

      <q-toolbar-title>
        Thirdfloor Chat
      </q-toolbar-title>

      <div>v1.0</div>
    </q-toolbar>
  </q-header>
</template>

<script>
export default {
  name: "base-header",
  methods: {}
};
</script>
