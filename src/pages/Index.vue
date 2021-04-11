<template>
  <q-page class="row items-center justify-evenly">
    <programacao-diaria></programacao-diaria>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import ProgramacaoDiaria from 'src/components/ProgramacaoDiaria.vue';

export default defineComponent({
  name: 'PageIndex',
  components: { ProgramacaoDiaria },
  data () {
    return {
      slide: 'style',
      textos: {
        grpcom: 'BEM-VINDO AO Grupo Paranaense de Comunicação',
        comunicacao: 'Comunicação a Serviço da Sociedade. Este é o Instituto GRPCOM',
        atitudes: 'Nossas Atitudes. Conheça nosso jeito de ser e fazer'
      }
    }
  },
});
</script>
