  <script lang="ts" setup>
import MainPage from './components/MainPage.vue';

    //
  </script>

<template>
  <v-app>
    <v-navigation-drawer class="side-bar" :width="250" :elevation="3">
      <div class="img-div">
        <img class="logo-growdev pa-6" src="./assets/logo-growdev.png" alt="" srcset="" height="140px">
      </div>

      <v-divider></v-divider>

      <v-list-item class="link" link title="Mentores"></v-list-item>
    </v-navigation-drawer>

    <v-app-bar :elevation="1" class="nav-bar">

  <v-app-bar-title>Application Bar</v-app-bar-title>

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
</style>
