import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
    	path: '/uploadimg',
      name: 'UploadImg',
      component: resolve => require(['@/components/UploadImg/Demo'], resolve),
    },
    {
    	path: '/calendar',
      name: 'Calendar',
      component: resolve => require(['@/components/Calendar/Demo'], resolve),
    }
  ]
})
