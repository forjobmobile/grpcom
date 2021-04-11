<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          Grupo Paranaense de Comunicação
        </q-toolbar-title>

        <!--div class="q-pa-md q-gutter-sm">
          <q-breadcrumbs>
            <q-breadcrumbs-el label="Casa" icon="home"  to="/" />
            <q-breadcrumbs-el label="Código de Conduta" icon="widgets" to="/codigo-conduta" />
            <q-breadcrumbs-el label="Nossa História" icon="build" to="/nossa-historia" />
            <q-breadcrumbs-el label="Nossas Convicções" icon="navigation" to="/nossas-conviccoes" />
            <q-breadcrumbs-el label="Peticao Titulares" icon="build" to="/peticao-titulares" />
            <q-breadcrumbs-el label="Política Privacidade" icon="build" to="/politica-privacidade" />
          </q-breadcrumbs>
        </div-->

        <!--div class="q-pa-md q-gutter-sm">
    
            <q-bar class="bg-black text-white">
              <q-btn dense flat icon="wifi" />
              <div>9:41</div>
              <q-btn dense flat icon="search" />
              <q-btn dense flat icon="list" />
            </q-bar>
        </div-->
        <!--div>Quasar v{{ $q.version }}</div-->
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list bordered class="rounded-borders">

        <q-expansion-item
          expand-separator
          v-model="expandedPrincipal"
          caption="Casa">
            <template v-slot:header>
              <q-item-section avatar>
                <q-avatar icon="home" color="positive" text-color="white" />
              </q-item-section>

              <q-item-section>
                Casa
              </q-item-section>
            </template>
            <EssentialLink
              v-for="link in principalLinks"
              :key="link.title"
              v-bind="link"
            />
        </q-expansion-item>
        <q-separator inset />

        <q-expansion-item
          expand-separator
          v-model="expandedUnidades"
          caption="Unidades">
            <template v-slot:header>
              <q-item-section avatar>
                <q-avatar icon="location_city" color="red" text-color="white" />
              </q-item-section>

              <q-item-section>
                Unidades
              </q-item-section>
            </template>
            <EssentialLink
              v-for="link in unidadesLinks"
              :key="link.title"
              v-bind="link"
            />
        </q-expansion-item>
        <q-separator inset />

        <q-expansion-item
          expand-separator
          v-model="expandedRedesSociais"
          caption="Redes Sociais">
            <template v-slot:header>
              <q-item-section avatar>
                <q-avatar icon="groups" color="primary" text-color="white" />
              </q-item-section>

              <q-item-section>
                GRPCOM nas Redes Sociais
              </q-item-section>
            </template>
            <EssentialLink
              v-for="link in redesSociaisLinks"
              :key="link.title"
              v-bind="link"
            />
        </q-expansion-item>
        <q-separator inset />


      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import EssentialLink from 'components/EssentialLink.vue'
import { LinksRedesSociais } from 'components/linksRedesSociais';
import { LinksPrincipal } from 'components/linksPrincipal';
import { LinksUnidades } from 'components/linksUnidades';

import { defineComponent, ref } from '@vue/composition-api';

export default defineComponent({
  name: 'MainLayout',
  components: { EssentialLink },
  data() {
    return {
      expandedPrincipal: false,
      expandedRedesSociais: false,
      expandedUnidades: false,
    }
  },
  watch: {
    expandedPrincipal: function(val) {
      if (val) {
        this.expandedRedesSociais = !val;
        this.expandedUnidades = !val;
      }
    },
    expandedRedesSociais: function(val) {
      if (val) {
        this.expandedPrincipal = !val;
        this.expandedUnidades = !val;
      }
    },
    expandedUnidades: function(val) {
      if (val) {
        this.expandedPrincipal = !val;
        this.expandedRedesSociais = !val;
      }
    },
  },
  setup() {
    const leftDrawerOpen = ref(false);
    const unidadesLinks = ref(LinksUnidades);
    const principalLinks = ref(LinksPrincipal);
    const redesSociaisLinks = ref(LinksRedesSociais);

    return {leftDrawerOpen, unidadesLinks, principalLinks, redesSociaisLinks}
  }
});
</script>
