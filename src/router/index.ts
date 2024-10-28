import { createRouter, createWebHistory } from 'vue-router'
import PokedexView from '@/views/PokedexView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: PokedexView,
      meta: {
        title: 'Vue Pokedex'
      }
    },
  ],
})

router.beforeEach((to, _, next) => {
  document.title = to.meta.title || "Default Title";
  next();
})


export default router
