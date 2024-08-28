<script setup lang="ts">
import { login } from '@/services/api';
import { resetStorage } from '@/services/authentication';
import { ref } from 'vue';
import { useRouter } from 'vue-router';



  const email = ref<string>('');
  const password = ref<string>('');
  const router = useRouter();

  async function handleLogin() {
    const responseLogin = await login(email.value, password.value)

    if (responseLogin) {
    router.push('/')
  }
}

</script>

<template>
    <div class="container-div" >
        <v-card class="login-card mx-auto px-6 py-8 bg-white rounded" max-width="900">
          <img class="mb-15" src="../assets/logo-growdev.png" alt="" srcset="" width="200px">

          <v-form
          class="form"
          >
            <v-text-field
              v-model="email"
              class="mb-2"
              label="Email"
              clearable
            ></v-text-field>

            <v-text-field
              type="password"
              v-model="password"
              label="Password"
              clearable
            ></v-text-field>

            <br>

            <v-btn
              color="rgb(241, 123, 4)"
              size="large"
              variant="elevated"
              block
              @click="handleLogin"
            >
              Sign In
            </v-btn>
          </v-form>
        </v-card>
    </div>
</template>


<style scoped>
  .container-div {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(21, 42, 93);
  }

  .login-card {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 600px;
    width: 700px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }

  .form{
    width: 90%;
  }
</style>
