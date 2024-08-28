<script setup lang="ts">

import { deleteMentor, getMentor, registerMentor, updateMentor } from '@/services/api';
import { MentorType } from '@/types/MentorType';
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

//Paginacao

const currentPage = ref<number>(1); // Página atual
const itemsPerPage = ref<number>(6); // Quantidade de itens por página

const filteredMentores = computed(() => {
  const query = search.value.toLowerCase();
  currentPage.value = 1;
  return mentores.value.filter(
    mentor =>
      mentor.name.toLowerCase().includes(query) ||
      mentor.cpf.includes(query) ||
      mentor.email.toLowerCase().includes(query)
  );
});

// Lógica de paginação aplicada aos mentores filtrados
const paginatedMentores = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredMentores.value.slice(start, end); // Pagina o resultado filtrado
});

// Calcula o número total de páginas com base no número de mentores filtrados
const totalPages = computed(() => Math.ceil(filteredMentores.value.length / itemsPerPage.value));

// Função para mudar de página
function changePage(page: number) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
}

//--------------

async function handleGetMentor() {
  const response = await getMentor();
  if (response?.data) {
    mentores.value = response.data.mentores;
  }
}

async function handleRegisterMentor() {
  mentores.value.forEach(mentor => {
    if(cpf.value === mentor.cpf || email.value === mentor.email){
      alert("ERRO: CPF ou email já em uso!");
    }
  });
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


function openModal(){
  dialog.value = true;
  nome.value = '';
  email.value = '';
  cpf.value = '';
}

</script>


<template>
  <body class="bg-white">

    <v-container class="">
      <h1 class="cadastro-title mb-15" >Cadastro de Mentores</h1>
      <div class="search-div">
        <v-text-field class="pesquisar" label="Digite nome, cpf ou email" v-model="search"> </v-text-field>
        <img class="ml-10 mb-5" src="../assets/search-icon-2048x2048-cmujl7en.png" alt="" width="30px" height="30px">
      </div>
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
        <tr v-for="mentor in paginatedMentores" :key="mentor.id">
          <td class="table-line text-center">{{ mentor.name }}</td>
          <td class="table-line text-center">{{ mentor.cpf }}</td>
          <td class="table-line text-center">{{ mentor.email }}</td>
          <td class="action-btns text-center"><v-btn class="btn-edit mr-5 text-none" width="70px" height="30px" @click="selecionarMentorParaEdicao(mentor)">Editar</v-btn>
            <v-btn class="btn-delete text-none" width="70px" height="30px" @click="selecionarMentorParaDeletar(mentor)">Excluir</v-btn></td>
        </tr>
      </tbody>
    </v-table>

<!-- //Paginacao -->
<div class="pagination">
          <v-btn
            v-for="page in totalPages"
            :key="page"
            class="page-btn"
            @click="changePage(page)"
            :disabled="page === currentPage"
          >
            {{ page }}
          </v-btn>
        </div>


    <!-- // Update modal -->

    <v-dialog v-model="dialogUpdate" width="auto">
      <v-card class="modal bg-white"
        width="1100"
        height="700"
      >

      <v-card-title class="modal-title pa-15">Atualizar Mentor</v-card-title>
      <v-container class="input-container">
        <v-text-field class="input-mentor" label="Nome" maxlength="50" v-model="nome"> </v-text-field>

        <v-text-field class="input-mentor"  label="Email" maxlength="40"  v-model="email"> </v-text-field>

        <v-text-field class="input-mentor"  label="CPF" hint="ex: 000.000.000-00" maxlength="11" v-model="cpf"> </v-text-field>

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

      <v-card-title class="delete-title pa-5">Tem certeza que deseja deletar este mentor?</v-card-title>

        <template v-slot:actions>
          <v-btn class="action-btn ms-auto mr-10" text="Deletar" @click="handleDelete"></v-btn>
          <v-btn class="action-btn ms-auto" text="Cancelar" @click="dialogDelete = false"></v-btn>
        </template>
      </v-card>
    </v-dialog>



    <!-- //Cadastrar Modal -->

    <v-btn @click="openModal" class="button-cadastrar"> Cadastrar Mentor </v-btn>
    <v-dialog v-model="dialog" width="auto">
      <v-card class="modal bg-white"
        width="1100"
        height="700"
      >

      <v-card-title class="modal-title pa-15">Cadastrar Mentor</v-card-title>
      <v-container class="input-container">
        <v-text-field class="input-mentor" label="Nome" maxlength="50" v-model="nome" > </v-text-field>

        <v-text-field class="input-mentor"  label="Email" maxlength="40" v-model="email"> </v-text-field>

        <v-text-field class="input-mentor"  label="CPF" hint="ex: 000.000.000-00" maxlength="11" v-model="cpf"> </v-text-field>

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
        <h4 class="mb-3">Desenvolvido por Gustavo Cortezia</h4>
        <h5>08/2024</h5>
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
  margin-top: 70px;
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
 margin-left: 5rem;
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

h4, h5{
  color: white;
}
.footer-div{
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
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

.search-div{
  display: flex;
  align-items: center;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.page-btn {
  margin: 0 5px;
  background-color: rgb(241, 123, 4);
  border: 1px solid rgb(241, 123, 4);
  color: white;
  border: none;
}

.page-btn:hover {
  background-color: white;
  border: 1px solid rgb(241, 123, 4);
  color: rgb(241, 123, 4);
}

.page-btn[disabled] {
  background-color: rgb(21, 42, 93);
  cursor: not-allowed;
}

.action-btns {
  display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px; /* Espaçamento entre os botões */
    flex-wrap: nowrap; /* Não permite quebrar para a linha de baixo */
}

@media (max-width: 600px) {
    .action-btns {
      flex-direction: row; /* Garante que os botões fiquem alinhados horizontalmente mesmo em telas pequenas */
    }
  }

  @media (max-width: 1140px) {
    .modal{
      width: 90vw !important;
      height: 100vh !important;
    }

    .modal-delete{
      width: 90vw !important;
      height: 40vh !important;
    }
  }

  @media (max-width: 550px) {
    .modal-delete .delete-title {
      font-size: 1rem;
      word-wrap: break-word;
      padding: 0;
      text-align: center;
      word-wrap: break-word;
      white-space: normal;
    }
  }


@media (max-width: 776px) {
    .tabela {
      width: 100%;
      height: 400px;
    }
    .pesquisar{
      margin-left: 0;
    }
  }

  @media (max-width: 700px) {
    .tabela{
      overflow: scroll;
    }
  }
</style>
