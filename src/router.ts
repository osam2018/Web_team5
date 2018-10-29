import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Insuinge from './views/Insuinge.vue'
import Jangyae from './views/Jangyae.vue'
import SidePage1 from './views/side-page-sub/SidePage1.vue'
import SidePage2 from './views/side-page-sub/SidePage2.vue'
import SidePage3 from './views/side-page-sub/SidePage3.vue'
import SidePage4 from './views/side-page-sub/SidePage4.vue'
import Manual from './views/Manual.vue'
import UserSetting from './views/UserSetting.vue'
import Insuinge_enroll from './views/side-page-sub/Insuinge_enroll.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },{
          path: '/home',
          name: 'home',
          component: Home
      },
    {
      path: '/insuinge',
      name: 'insuinge',
      component: Insuinge,
      children: [
          {
              path: 'Insuinge_enroll',
              component: Insuinge_enroll
          },
      ]
    },{
          path: '/manual',
          name: 'manual',
          component: Manual
      },
      {
          path: '/usersetting',
          name: 'usersetting',
          component: UserSetting
      },
      {
          path: '/jangyae',
          name: 'jangyae',
          component: Jangyae,
          children: [
              {
                  path: '/',
                  component: SidePage1
              },
              {
                  path: 'sidepage1',
                  component: SidePage1
              },
              {
                  path: 'sidepage2',
                  component: SidePage2
              },
              {
                  path: 'sidepage3',
                  component: SidePage3
              },
              {
                  path: 'sidepage4',
                  component: SidePage4
              }
          ]
      }
  ]
})
