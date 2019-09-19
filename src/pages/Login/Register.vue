<template>
  <q-page class="register flex flex-center">
    <q-card>
      <q-card-section>
        <q-img
          class="third-logo"
          src="../assets/logo.png"
          width="150"
          height="150"
        />
        <p class="text-h6">
          Register
        </p>
        <q-form ref="register-form" class="register-form" @submit="onRegister">
          <q-input
            v-model="registerForm.firstName"
            label="First Name"
            lazy-rules
            :rules="[
              val => (val && val.length > 0) || 'Please enter your firstname'
            ]"
          />

          <q-input
            v-model="registerForm.lastName"
            label="Last Name"
            lazy-rules
            :rules="[
              val =>
                (val && val.trim().length > 0) || 'Please enter your lastname'
            ]"
          />

          <q-input
            v-model="registerForm.email"
            label="Email"
            lazy-rules
            :rules="[
              val => (val && val.length > 0) || 'Please enter your email',
              val => isValidEmail || 'Please enter a valid email'
            ]"
          />

          <q-input
            v-model="registerForm.password"
            label="Password"
            type="password"
            lazy-rules
            :rules="[
              val => (val && val.length > 0) || 'Please enter your password'
            ]"
          />

          <q-input
            v-model="registerForm.confirmPassword"
            label="Confirm Password"
            type="password"
            lazy-rules
            :rules="[
              val => (val && val.length > 0) || 'Please confirm your password',
              val => val == registerForm.password || 'Password not the same'
            ]"
          />
          <div>
            <p>
              <router-link to="/register">
                I already have an account
              </router-link>
            </p>
          </div>
          <div style="display: flex; justify-content: flex-end">
            <q-btn
              @click="registerAsGuest"
              label="Guest"
              :disable="isRegistering"
            />
            <q-btn
              label="register"
              type="submit"
              color="primary"
              style="margin-left: 10px;"
              :loading="isRegistering"
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "register",
  data() {
    return {
      registerForm: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
      },
      isRegistering: false
    };
  },
  computed: {
    isValidEmail() {
      return this.$utils.strings.validateEmail(this.registerForm.email);
    }
  },
  mounted() {},
  methods: {
    ...mapActions("auth", ["register", "authenticateGuest"]),
    onRegister() {
      const { registerForm } = this;

      registerForm.firstName = registerForm.firstName.trim();
      registerForm.lastName = registerForm.lastName.trim();

      this.isRegistering = true;

      this.register(this.registerForm).finally(() => {
        this.isRegistering = false;
      });
    },
    registerAsGuest() {
      console.log("register as guest");
    }
  }
};
</script>

<style lang="stylus" scoped>
.register
  padding: 10px

.register-form
  width: 350px

@media (max-width $breakpoint-xs-max)
  .register-form
    width: 85vw

  .third-logo
    height: 55vw
</style>
