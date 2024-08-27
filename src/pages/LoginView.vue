<script setup lang="ts">
import { login } from '@/services/api';
import { resetStorage } from '@/services/authentication';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

  // export default {
  //   data: () => ({
  //     form: false,
  //     email: null,
  //     password: null,
  //     loading: false,
  //   }),

  //   methods: {
  //     onSubmit () {
  //       if (!this.form) return

  //       this.loading = true

  //       setTimeout(() => (this.loading = false), 2000)
  //     },
  //     required (v) {
  //       return !!v || 'Campo obrigatório'
  //     },
  //   },
  // }


  const email = ref<string>('');
  const password = ref<string>('');
  const router = useRouter();

  async function handleLogin() {

    console.log("Email:", email);
console.log("Password:", password);
    const responseLogin = await login(email.value, password.value)

    if (responseLogin) {
    console.log("teste3");
    router.push('/')
  }
}

//   const handleLogin = async () => {
//     console.log('teste');

//     resetStorage();
//     error.value = '';

//     const response = await login(email.value, password.value);
//     console.log('teste');

//     console.log('teste');
//   if (response.status === 200) {
//     localStorage.setItem('token', response.data.data.token);
//     localStorage.setItem('userData', JSON.stringify(response.data.data.user));
//     router.push('/');
//   }
//   error.value = response.data.msg;
// };
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
              placeholder="Enter your password"
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
