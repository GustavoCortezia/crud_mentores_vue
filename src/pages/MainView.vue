<script lang="ts" setup>
import MainPage from '@/components/MainPage.vue';
import { logout } from '@/services/api';
import { getUserToken, resetStorage } from '@/services/authentication';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const drawer = ref<boolean>(false);
const router = useRouter();

//Logout
async function handleLogout() {
  const response = await logout();
  if (response.status === 200) {
    console.log("teste");
    resetStorage();
    router.push('/login');
  } else {
    alert("Erro ao deslogar")
  }
}

function forceLogin(){
  if(!getUserToken()){
    router.push('/login')
  }
}

onMounted(() => {
  forceLogin();
});

  </script>

<template>
  <v-app>

    <!-- Barra Lateral -->
    <v-navigation-drawer class="side-bar" v-model="drawer" temporary :width="300" :elevation="3">
      <div class="img-div">
        <img class="logo-growdev pa-6 mt-8" src="../assets/logo-growdev.png" height="140px">
      </div>

      <div class="link-div">
        <v-list-item class="link" link title="Mentores"></v-list-item>
      </div>

      <div class="profile-div mt-n15">
        <img class="profile-img rounded-circle mt-n15" src="../assets/image.png" width="60px">
      </div>

      <div class="logout-div">
        <v-btn class="btn-logout" @click="handleLogout">Logout</v-btn>
      </div>

    </v-navigation-drawer>

    <!-- Barra no topo -->
    <v-app-bar  :elevation="1" class="nav-bar">
      <div class="d-flex justify-center align-center h-100">
        <v-btn color="white ml-5" @click.stop="drawer = !drawer" icon="mdi-menu"></v-btn>
      </div>
    </v-app-bar>

  <MainPage/>

  </v-app>
</template>


<style scoped>
.side-bar {
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    height: 100% !important;
    overflow: hidden !important;
  }

  @media (max-width: 776px) {
    .side-bar {
      width: 200px;
    }
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
    width: 50%;
    display: flex;
    justify-content:center;
    margin-top: 50px;
    color: rgb(21, 42, 93);
    border-bottom: 1px solid rgb(21, 42, 93);
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
    font-size: 0.8rem;
    padding: 0.5rem 1rem;
    border: 1px solid rgb(241, 123, 4);
  }

  .link-div{
    display: flex;
    justify-content: center;
  }

  .btn-logout:hover{
    background-color: white;
    color: rgb(241, 123, 4);
    border: 1px solid rgb(241, 123, 4);
  }
</style>
