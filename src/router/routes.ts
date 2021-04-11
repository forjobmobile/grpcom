import { RouteConfig } from 'vue-router';

const routes: RouteConfig[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'codigo-conduta', component: () => import('pages/CodigoConduta.vue') },
      { path: 'nossa-historia', component: () => import('pages/NossaHistoria.vue') },
      { path: 'nossas-conviccoes', component: () => import('pages/NossasConviccoes.vue') },
      { path: 'peticao-titulares', component: () => import('pages/PeticaoTitulares.vue') },
      { path: 'politica-privacidade', component: () => import('pages/PoliticaPrivacidade.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
];

export default routes;
