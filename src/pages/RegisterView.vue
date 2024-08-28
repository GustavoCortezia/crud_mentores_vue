<script setup lang="ts">
import router from '@/router';
import { register } from '@/services/api';
import { ref } from 'vue';

  const enabled = ref<boolean>(false);
  const email = ref<string>('');
  const password = ref<string>('');
  const error = ref<boolean>(false);
  const name = ref<string>('');
  const role = ref<string>('');
  const roleinput = ref<string>('');

  async function handleRegister() {
    if(!enabled.value){
      role.value = "user";
    } else if(enabled.value){
      if(roleinput.value === "12345"){
        role.value = "admin"
      }
    }
    const responseLogin = await register(name.value, email.value, password.value, role.value)

    if (responseLogin) {
    router.push('/login')
  }
  else {
    error.value = true;
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
            v-model="name"
            class="mb-2"
            label="Name"
            clearable
          ></v-text-field>

          <v-text-field
            v-model="email"
            class="mb-2"
            label="Email"
            clearable
          ></v-text-field>

          <v-text-field
          class="mb-4"
            type="password"
            v-model="password"
            label="Password"
            clearable
          ></v-text-field>

          <div class="d-flex pa-4">
            <v-text-field
            :disabled="!enabled"
            v-model="roleinput"
            label="Access Key"
            hide-details
            ></v-text-field>
            <v-checkbox-btn
                label="Cadastrar como Admin"
              v-model="enabled"
              class="pe-2 ml-5"
            ></v-checkbox-btn>
      </div>

          <br>

          <div>
            <p class="error mb-5 mt-n10" v-if="error">Email ou senha inválidos!</p>
          </div>

          <v-btn
            color="rgb(241, 123, 4)"
            size="large"
            variant="elevated"
            block
            @click="handleRegister"
          >
            Cadastrar
          </v-btn>
          <div class="div-btn">
            <v-btn class="btn-login mt-10" color="rgb(21, 42, 93)" @click="router.push('/login')" >Log in</v-btn>
          </div>
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
    height: 800px;
    width: 900px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }

  .form{
    width: 90%;
  }

  .error{
    color: red
  }

  .btn-login{
    width: 20% !important;
  }

  .div-btn{
    display: flex;
    justify-content: center;
  }
</style>

