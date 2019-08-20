<template>
  <q-page class="login flex flex-center">
    <q-card>
      <q-card-section>
        <q-img class="third-logo" src="../assets/logo.png" width="150" height="150" />
        <p class="text-h6">
          Login
        </p>
        <q-form ref="login-form" class="login-form" @submit="onLogin">
          <q-input
            v-model="loginForm.email"
            label="Email"
            lazy-rules
            :rules="[
              val => (val && val.trim().length > 0) || 'Please enter your email',
              val => isValidEmail || 'Please enter a valid email'
            ]"
          />

          <q-input
            v-model="loginForm.password"
            label="Password"
            type="password"
            lazy-rules
            :rules="[
              val => (val && val.trim().length > 0) || 'Please enter your password'
            ]"
          />
          <div>
            <p>
              No account yet?,
              <router-link to="/register"> Register here </router-link>
            </p>
          </div>
          <div style="display: flex; justify-content: flex-end">
            <q-btn @click="loginAsGuest" label="Guest" :disable="isLoggingIn" />
            <q-btn
              label="Login"
              type="submit"
              color="primary"
              style="margin-left: 10px;"
              :loading="isLoggingIn"
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
  name: "login",
  data() {
    return {
      loginForm: {
        email: "",
        password: ""
      },
      isLoggingIn: false
    };
  },
  computed: {
    isValidEmail() {
      return this.$utils.strings.validateEmail(this.loginForm.email);
    }
  },
  mounted() {},
  methods: {
    ...mapActions("auth", ["authenticate", "authenticateGuest"]),
    onLogin() {
      this.isLoggingIn = true;

      this.authenticate(this.loginForm).finally(() => {
        this.isLoggingIn = false;
      });
    },
    loginAsGuest() {
      console.log("login as guest");
    }
  }
};
</script>

<style lang="stylus" scoped>
.login
  padding: 10px

.login-form
  width: 350px

@media (max-width $breakpoint-xs-max)
  .login-form
    width: 85vw

  .third-logo
    height: 55vw
</style>
