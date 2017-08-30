import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Blog from '@/components/Blog'
import About from '@/components/About'
import Login from '@/components/Login'
import Detail from '@/components/Detail'
import AddBlog from '@/components/AddBlog'
import Main from '@/components/Main'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'Main',
      component: Main,
      children: [
        {
          path: '/home',
          name: 'Home',
          component: Home
        },
        {
          path: '/blog',
          name: 'Blog',
          component: Blog
        },
        {
          path: '/about',
          name: 'About',
          component: About
        },
        {
          path: '/detail',
          name: 'Detail',
          component: Detail
        },
        {
          path: '/addBlog',
          name: 'AddBlog',
          component: AddBlog
        }
      ]
    }
  ]
})
