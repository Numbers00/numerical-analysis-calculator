import { createRouter, createWebHistory } from 'vue-router'
import NonlinearView from '../views/NonlinearView.vue'

const routes = [
  {
    path: '/',
    name: 'nonlinear',
    component: NonlinearView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
