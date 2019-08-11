<template>
  <q-page class="flex flex-center">
    <q-card>
      <q-card-section>
        <q-img src="../assets/logo.png" width="150" height="150" />
        <p class="text-h6">
          Login
        </p>
        <q-form ref="login-form" class="login-form" @submit="onLogin">
          <q-input
            v-model="loginForm.email"
            label="Email"
            lazy-rules
            :rules="[
              val => (val && val.length > 0) || 'Please enter your email',
              val => isValidEmail || 'Please enter a valid email'
            ]"
          />

          <q-input
            v-model="loginForm.password"
            label="Password"
            type="password"
            lazy-rules
            :rules="[
              val => (val && val.length > 0) || 'Please enter your password'
            ]"
          />
          <div>
            <p>
              No account yet?,
              <router-link to="/register"> Register here </router-link>
            </p>
          </div>
          <div style="display: flex; justify-content: flex-end">
            <q-btn @click="loginAsGuest" label="Guest" />
            <q-btn
              label="Login"
              type="submit"
              color="primary"
              style="margin-left: 10px;"
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        email: "",
        password: ""
      }
    };
  },
  computed: {
    isValidEmail() {
      return this.$utils.strings.validateEmail(this.loginForm.email);
    }
  },
  mounted() {
    console.log(this.$utils);
  },
  methods: {
    onLogin() {
      console.log("login");
    },
    loginAsGuest() {
      console.log("login as guest");
    }
  }
};
</script>

<style lang="stylus" scoped>
.login-form
  width: 350px
</style>
