<script setup lang="ts">

</script>


<template>
  <body class="bg-white">

    <v-container class="">
      <h1 class="cadastro-title" >Cadstro de Mentores</h1>
      <v-text-field label="Digite nome, cpf ou email" > </v-text-field>

      <div class="container">

        <v-data-table-virtual class="tabela"
        height="400"
        item-value="name"
        ></v-data-table-virtual>

        <v-btn class="button-cadastrar"> Cadastrar Mentor </v-btn>

      </div>



    </v-container>

    <footer>

      <h4>Desenvolvido por Gustavo Cortezia</h4>
      <h6>08/2024</h6>

    </footer>
  </body>

  </template>

<style>
.cadastro-title{
  margin-top: 100px;
  margin-bottom: 30px;
  color: rgb(241, 123, 4);
}

.tabela{
  margin-top: 80px;
  background-color: white !important;
  border: 2px solid rgb(241, 123, 4);
}

.container{
  display: flex;
  align-items: center;
  flex-direction: column;
}

.button-cadastrar{
  background-color: rgb(241, 123, 4) !important;
  margin-top: 50px;
  width: 50%;
  margin-bottom: 50px;
}
footer {
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: rgb(21, 42, 93);
}

h4, h6{
  color: white;
}

</style>
