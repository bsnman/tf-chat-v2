<template>
  <div class="channel-info">
    <q-list class="user-list">
      <q-item-label header>Channel</q-item-label>

      <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-icon name="fas fa-hashtag" />
        </q-item-section>
        <q-item-section>
          <div>
            <q-item-label>
              {{ channel.title }}
            </q-item-label>
            <small>
              <a @click="copyToClipboard(channel.id)">
                {{ channel.id }}
              </a>
            </small>
          </div>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import { Notify } from "quasar";

export default {
  name: "channel-info",
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  methods: {
    copyToClipboard(id) {
      this.$copyText(id).then(res => {
        Notify.create({
          message: "Channel Id copied to clipboard"
        });
      });
    }
  }
};
</script>
