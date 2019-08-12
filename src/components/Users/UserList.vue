<template>
  <q-list class="user-list">
    <q-item-label header>Members</q-item-label>

    <template v-for="user in users">
      <q-item clickable v-ripple :key="user.id">
        <q-item-section avatar>
          <q-icon name="person" />
        </q-item-section>
        <q-item-section>
          <div class="row items-center justify-between">
            <q-item-label>
              {{ user.displayName }}
            </q-item-label>
            <small v-if="user.userType == 'ADMIN'">{{ user.userType }}</small>
          </div>
          <small style="color: #aaa">{{ user.email }}</small>
        </q-item-section>
      </q-item>
    </template>
  </q-list>
</template>

<script>
export default {
  name: "user-list",
  props: {
    users: {
      type: Array,
      required: true
    }
  }
};
</script>
