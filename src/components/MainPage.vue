<script setup lang="ts">

import { deleteMentor, getMentor, registerMentor, updateMentor } from '@/services/api';
import { MentorType } from '@/types/MentorType';
import { log } from 'console';
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router';

const dialog = ref<boolean>(false);
const dialogUpdate = ref<boolean>(false);
const dialogDelete = ref<boolean>(false);
const mentores = ref<MentorType[]>([]);
const nome = ref<string>('');
const email = ref<string>('');
const cpf = ref<string>('');
const router = useRouter();
const mentorSelecionado = ref<{ id: number; name: string; email: string; cpf: string } | null>(null);
const search = ref<string>('');


async function handleGetMentor() {
  const response = await getMentor();
  if (response?.data) {
    mentores.value = response.data.mentores;
  }
}

async function handleRegisterMentor() {
  const response = await registerMentor(nome.value, email.value, cpf.value);
  if (response?.data) {
    router.go(0);
  }
}

onMounted(() => {
  handleGetMentor();
});


function selecionarMentorParaEdicao(mentor: MentorType) {
  mentorSelecionado.value = {
    id: parseInt(mentor.id as string),
    name: mentor.name,
    email: mentor.email,
    cpf: mentor.cpf,
  };
  nome.value = mentor.name;
  email.value = mentor.email;
  cpf.value = mentor.cpf;
  dialogUpdate.value = true;
}


function selecionarMentorParaDeletar(mentor: MentorType) {
  mentorSelecionado.value = {
  id: parseInt(mentor.id as string),
    name: mentor.name,
    email: mentor.email,
    cpf: mentor.cpf,
  };
  nome.value = mentor.name;
  email.value = mentor.email;
  cpf.value = mentor.cpf;
  dialogDelete.value = true;
}


async function handleUpdate() {
  if (mentorSelecionado.value) {
    const response = await updateMentor(mentorSelecionado.value.id, nome.value, email.value, cpf.value);
    if (response?.data) {
      router.go(0);
    }
  }
}


async function handleDelete() {
  if (mentorSelecionado.value) {
    console.log('teste');
    const response = await deleteMentor(mentorSelecionado.value.id)
    if (response?.data) {
      router.go(0);
    }
  }
}

//SearchBar

const filteredMentores = computed(() => {
  const query = search.value.toLowerCase();
  return mentores.value.filter(mentor =>
    mentor.name.toLowerCase().includes(query) ||
    mentor.cpf.includes(query) ||
    mentor.email.toLowerCase().includes(query)
  );
});


</script>


<template>
  <body class="bg-white">

    <v-container class="">
      <h1 class="cadastro-title" >Cadstro de Mentores</h1>
      <v-text-field class="pesquisar" label="Digite nome, cpf ou email" v-model="search"> </v-text-field>

      <div class="container">
        <v-table class="tabela" height="400" fixed-header>
      <thead>
        <tr>
          <th class="table-header text-center">Nome</th>
          <th class="table-header text-center">CPF</th>
          <th class="table-header text-center">Email</th>
          <th class="table-header text-center">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="mentor in mentores" :key="mentor.id">
          <td class="table-line text-center">{{ mentor.name }}</td>
          <td class="table-line text-center">{{ mentor.cpf }}</td>
          <td class="table-line text-center">{{ mentor.email }}</td>
          <td class="text-center"><v-btn class="btn-edit mr-5 text-none" width="70px" height="30px" @click="selecionarMentorParaEdicao(mentor)">Editar</v-btn>
            <v-btn class="btn-delete text-none" width="70px" height="30px" @click="selecionarMentorParaDeletar(mentor)">Excluir</v-btn></td>
        </tr>
      </tbody>
    </v-table>

    <!-- // Update modal -->

    <v-dialog v-model="dialogUpdate" width="auto">
      <v-card class="modal bg-white"
        width="1100"
        height="700"
      >

      <v-card-title class="modal-title pa-15">Atualizar Mentor</v-card-title>
      <v-container class="input-container">
        <v-text-field class="input-mentor" label="Nome" v-model="nome"> </v-text-field>

        <v-text-field class="input-mentor"  label="Email" v-model="email"> </v-text-field>

        <v-text-field class="input-mentor"  label="CPF" v-model="cpf"> </v-text-field>

      </v-container>


        <template v-slot:actions>
          <v-btn class="action-btn ms-auto mr-10" text="Salvar" @click="handleUpdate"></v-btn>
          <v-btn class="action-btn ms-auto" text="Cancelar" @click="dialogUpdate = false"></v-btn>
        </template>
      </v-card>
    </v-dialog>

    <!-- //Delete Modal  -->

    <v-dialog v-model="dialogDelete" width="auto">
      <v-card class="modal-delete bg-white"
        width="550"
        height="250"
      >

      <v-card-title class="pa-5">Tem certeza que deseja deletar este mentor?</v-card-title>

        <template v-slot:actions>
          <v-btn class="action-btn ms-auto mr-10" text="Deletar" @click="handleDelete"></v-btn>
          <v-btn class="action-btn ms-auto" text="Cancelar" @click="dialogDelete = false"></v-btn>
        </template>
      </v-card>
    </v-dialog>



    <!-- //Cadastrar Modal -->

    <v-btn @click="dialog = true" class="button-cadastrar"> Cadastrar Mentor </v-btn>

    <v-dialog v-model="dialog" width="auto">
      <v-card class="modal bg-white"
        width="1100"
        height="700"
      >

      <v-card-title class="modal-title pa-15">Cadastrar Mentor</v-card-title>
      <v-container class="input-container">
        <v-text-field class="input-mentor" label="Nome" v-model="nome" > </v-text-field>

        <v-text-field class="input-mentor"  label="Email" v-model="email"> </v-text-field>

        <v-text-field class="input-mentor"  label="CPF" v-model="cpf"> </v-text-field>

      </v-container>

        <template v-slot:actions>
          <v-btn class="action-btn ms-auto mr-10" text="Salvar" @click="handleRegisterMentor"></v-btn>
          <v-btn class="action-btn ms-auto" text="Cancelar" @click="dialog = false"></v-btn>
        </template>
      </v-card>
    </v-dialog>


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
  border: 1px solid rgb(241, 123, 4);
}

.button-cadastrar:hover{
  background-color: white !important;
  color: rgb(241, 123, 4);
  border: 1px solid rgb(241, 123, 4);
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

.table-header{
  /* color: black; */
  background-color: rgb(21, 42, 93) !important;
}

.table-line{
  color: black;
}

.modal{
  display: flex;
  align-items: center;
}

.modal-title{
  font-size: 2rem;
  color: rgb(241, 123, 4);
}

.input-mentor{
width: 80%;
margin-bottom: 2rem;
color: rgb(21, 42, 93);
}

.input-container{
  display: flex;
  align-items: center;
  flex-direction: column;
}

.action-btn {
  color: rgb(241, 123, 4);
}

.modal-delete{
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-delete, .btn-edit{
    background-color: rgb(241, 123, 4);
    border: 1px solid rgb(241, 123, 4);
}

.btn-delete:hover{
  background-color: white;
  color: red;
  border: red 1px solid;
}

.btn-edit:hover{
  background-color: white;
  color: green;
  border: 1px solid green;
}
</style>
