<script lang="ts" setup>
import MainPage from '@/components/MainPage.vue';
import router from '@/router';
import { logout } from '@/services/api';
import { resetStorage } from '@/services/authentication';



async function handleLogout() {
  const response = await logout();
  if (response.status === 200) {
    resetStorage();
    router.push('/login');
  } else if (response.status === 400) {
    alert('Falha ao deslogar.');
  } else {
    alert('Ocorreu um erro entre em contato com o suporte.');
  }
}
  </script>

<template>
  <v-app>
    <v-navigation-drawer class="side-bar" :width="250" :elevation="3">
      <div class="img-div">
        <img class="logo-growdev pa-6" src="../assets/logo-growdev.png" alt="" srcset="" height="140px">
      </div>

      <v-divider></v-divider>

      <v-list-item class="link" link title="Mentores"></v-list-item>
      <div class="profile-div">
        <img class="profile-img rounded-circle" src="../assets/image.png" alt="" srcset="" width="60px">
      </div>
      <div class="logout-div">
        <v-btn class="btn-logout" @click="handleLogout">Logout</v-btn>
      </div>
    </v-navigation-drawer>

    <v-app-bar :elevation="1" class="nav-bar">


</v-app-bar>

<MainPage/>

</v-app>
</template>


<style scoped>
  .side-bar{
    background-color: white;

  }

  .nav-bar{
    background-color: rgb(21, 42, 93) !important;
  }

  .logo-growdev {
    padding: 1rem;
  }

  .img-div{
    display: flex;
    justify-content: center;
  }

  .link{
    display: flex;
    justify-content:center;
    margin-top: 50px;
    color: rgb(21, 42, 93);
    border-bottom: 1px solid rgb(21, 42, 93);
    border-top: 1px solid rgb(21, 42, 93);
  }

  .profile-div{
    display: flex;
    align-items:flex-end;
    justify-content:center;
    height: 65%;
  }
  .profile-img{
    border: 3px solid rgb(241, 123, 4) ;
  }

  .logout-div{
    margin-top: 1rem;
    display: flex;
    justify-content: center;
  }

  .btn-logout{
    background-color: rgb(241, 123, 4);

  }
</style>
