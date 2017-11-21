import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home'
import Signup from './components/Signup.vue';
import Login from './components/Login.vue';
import Dashboard from './components/Dashboard.vue';
import store from './store';

Vue.use(Router)

const router= new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      beforeEnter: (to, from, next) => {
        if (store.state.loggedIn) {
          next()
        } else {
          next("/login")
        }
      }
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup,
      meta:{noAuth:true}
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta:{noAuth:true}
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: { requiresAuth: true },
     
    }
  ]
})

router.beforeEach((to, from, next) => {
  
  if(to.meta.noAuth){
    if (store.state.loggedIn) {
      next("/")
    } else {
      next()
    }
  }
  if (to.meta.requiresAuth) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.state.loggedIn) {
      next("/login")
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})
export  default router