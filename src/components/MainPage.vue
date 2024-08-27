<script setup lang="ts">

import { MentorType } from '@/types/MentorType';
import { ref } from 'vue'

const mentors = [
          {
            name: 'Frozen Yogurt',
            cpf: 159,
            email: 159,
          },
          {
            name: 'Frozen Yogurt',
            cpf: 159,
            email: 159,
          },
        ]


interface Props {
  mentores: MentorType[];
}

const props = defineProps<Props>();

</script>


<template>
  <body class="bg-white">

    <v-container class="">
      <h1 class="cadastro-title" >Cadstro de Mentores</h1>
      <v-text-field class="pesquisar" label="Digite nome, cpf ou email" > </v-text-field>

      <div class="container">

        <v-table class="tabela" height="400" fixed-header>
        <thead>
          <tr>
            <th class="text-left">Nome</th>
            <th class="text-left">CPF</th>
            <th class="text-left">Email</th>
            <th class="text-left">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in props.mentores" :key="item.id">
            <td>{{ item.name }}</td>
            <td>{{ item.cpf }}</td>
            <td>{{ item.email }}</td>
            <td><v-btn>teste</v-btn></td>
          </tr>
        </tbody>
      </v-table>

        <v-btn class="button-cadastrar"> Cadastrar Mentor </v-btn>

      </div>



    </v-container>

    <footer>
      <div class="footer-div">
        <h4>Desenvolvido por Gustavo Cortezia</h4>
        <h6>08/2024</h6>
      </div>
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
  width: 90%;
  background-color: white !important;
  border: 2px solid rgb(21, 42, 93);
}

.container{
  display: flex;
  align-items: center;
  flex-direction: column;
}

.pesquisar{
 color:rgb(21, 42, 93) ;
}

.button-cadastrar{
  background-color: rgb(241, 123, 4) !important;
  margin-top: 50px;
  width: 50%;
  margin-bottom: 100px;
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
.footer-div{
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-left: 200px;
}

.text-left{
  /* color: black; */
  background-color: rgb(21, 42, 93) !important;
}

</style>
