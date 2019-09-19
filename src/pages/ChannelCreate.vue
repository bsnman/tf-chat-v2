<template>
  <q-page class="flex">
    <div class="channel-create flex justify-center">
      <q-form class="channel-create-form" @submit="createChannelClick" ref="formCreateChannel">
        <h5>Create Channel</h5>
        <q-item-label>
          <q-input 
            filled
            v-model="roomTitle"
            label="Room Title"
            hint="My amazing room"
            lazy-rules
            :rules="[ 
              val => val && val.length != 0 || 'Channel without a name wont survive in the wild',
              val => val && val.length > 4 || 'Channel name must be atleast 4 characters',
              val => val && val.length < 32 || 'Channel name cannot exceed 32 characters'
            ]"
          />
        </q-item-label>

        <div class="channel-create-action flex justify-end">
          <q-btn label="Create" type="submit" color="primary"/>
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: "channel-create",
  data() {
    return {
      roomTitle: ""
    }
  },
  methods: {
    ...mapActions("channels", [
      "createChannel"
    ]),
    createChannelClick() {

      this.$refs.formCreateChannel.validate()
        .then(success => {
          if(success) {
            let payload = {
              title: this.roomTitle
            }

            this.createChannel(payload)
          }
        })
    },
  }
}
</script>

<style lang="stylus" scoped>

.channel-create
  width: 100%;
  padding: 20px;

.channel-create-form
  width: 500px;
  max-width: 90%;

.channel-create-action 
  margin-top: 20px;
</style>