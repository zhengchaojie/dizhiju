import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in subMenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    name: 'Dashboard',
    // hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '目标与计划', icon: 'target', noCache: true, affix: true }
    }]
  },
  { path: '*', component: () => import('@/views/404'), hidden: true }// 刷新页
]
// role字段必须唯一
export const asyncRouterMap = [
  {
    path: '/organization',
    component: Layout,
    name: '组织结构与职责',
    meta: { title: '组织结构与职责', icon: 'authority' },
    children: [
      {
        path: 'index',
        name: 'organizationIndex',
        component: () => import('@/views/default/index'),
        meta: { title: '组织结构与职责', role: '01' }
      },
      {
        path: 'index',
        name: 'organizationIndex',
        component: () => import('@/views/default/index'),
        meta: { title: '组织结构与职责', role: '01' }
      },
      {
        path: 'index',
        name: 'organizationIndex',
        component: () => import('@/views/default/index'),
        meta: { title: '组织结构与职责', role: '01' }
      }
    ]
  },
  {
    path: '',
    component: Layout,
    name: '安全生产投入',
    meta: { title: '安全生产投入', icon: 'safe' },
    children: [
      {
        path: 'PutInto',
        name: '投入计划',
        component: () => import('@/views/default/safe/PutInto'),
        meta: { title: '投入计划', role: '02' }
      },
      {
        path: 'Translate',
        name: '奖励兑现',
        component: () => import('@/views/default/safe/Translate'),
        meta: { title: '奖励兑现', role: '02' }
      },
      {
        path: 'Insurance',
        name: '保险管理',
        component: () => import('@/views/default/safe/Insurance'),
        meta: { title: '保险管理', role: '02' }
      },
      {
        path: 'Articles',
        name: '安保用品管理',
        component: () => import('@/views/default/safe/Articles'),
        meta: { title: '安保用品管理', role: '02' }
      }
    ]
  },
  {
    path: '/risk',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'riskIndex',
        component: () => import('@/views/default/index'),
        meta: { title: '风险管理', icon: 'risk', role: '03' }
      }
    ]
  },
  {
    path: '/training',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'trainingIndex',
        component: () => import('@/views/default/index'),
        meta: { title: '教育培训', icon: 'training', role: '04' }
      }
    ]
  },
  {
    path: '/equipment',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'equipmentIndex',
        component: () => import('@/views/default/index'),
        meta: { title: '设备设施管理', icon: 'equipment', role: '05' }
      }
    ]
  },
  {
    path: '/prospecting',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'prospectingIndex',
        component: () => import('@/views/default/index'),
        meta: { title: '地址勘查作业安全', icon: 'prospecting', role: '06' }
      }
    ]
  },
  {
    path: '/laws',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'lawsIndex',
        component: () => import('@/views/default/index'),
        meta: { title: '法规机制管理', icon: 'laws', role: '07' }
      }
    ]
  },
  {
    path: '/trouble',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'troubleIndex',
        component: () => import('@/views/default/index'),
        meta: { title: '安全检查与隐患排查治理', icon: 'trouble', role: '08' }
      }
    ]
  },
  {
    path: '/occupationalHealth',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'occupationalHealthIndex',
        component: () => import('@/views/default/index'),
        meta: { title: '职业健康', icon: 'occupationalHealth', role: '09' }
      }
    ]
  },
  {
    path: '/emergencyRescue',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'emergencyRescueIndex',
        component: () => import('@/views/default/index'),
        meta: { title: '应急救援', icon: 'emergencyRescue', role: '10' }
      }
    ]
  },
  {
    path: '/kpi',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'kpiIndex',
        component: () => import('@/views/default/index'),
        meta: { title: '绩效评价与持续改造', icon: 'kpi', role: '11' }
      }
    ]
  },
  {
    path: '/car',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'carIndex',
        component: () => import('@/views/default/index'),
        meta: { title: '车辆事实追踪系统', icon: 'car', role: '12' }
      }
    ]
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

