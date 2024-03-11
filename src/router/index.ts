import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import type { App } from 'vue'
import { Layout } from '@/utils/routerHelper'
import { useI18n } from '@/hooks/web/useI18n'
import { NO_RESET_WHITE_LIST } from '@/constants'

const { t } = useI18n()

export const constantRouterMap: AppRouteRecordRaw[] = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard/analysis',
    name: 'Root',
    meta: {
      hidden: true
    }
  },
  {
    path: '/redirect',
    component: Layout,
    name: 'Redirect',
    children: [
      {
        path: '/redirect/:path(.*)',
        name: 'Redirect',
        component: () => import('@/views/Redirect/Redirect.vue'),
        meta: {}
      }
    ],
    meta: {
      hidden: true,
      noTagsView: true
    }
  },
  {
    path: '/login',
    component: () => import('@/views/Login/Login.vue'),
    name: 'Login',
    meta: {
      hidden: true,
      title: t('router.login'),
      noTagsView: true
    }
  },
  {
    path: '/404',
    component: () => import('@/views/Error/404.vue'),
    name: 'NoFind',
    meta: {
      hidden: true,
      title: '404',
      noTagsView: true
    }
  }
]

export const asyncRouterMap: AppRouteRecordRaw[] = [
  {
    path: '/dashboard',
    component: Layout,
    redirect: '/dashboard/analysis',
    name: 'Dashboard',
    meta: {},
    children: [
      {
        path: 'analysis',
        component: () => import('@/views/Dashboard/Home.vue'),
        name: 'Analysis',
        meta: {
          title: t('router.dashboard'),
          noCache: true,
          affix: true,
          icon: 'ant-design:dashboard-filled'
        }
      }
    ]
  },
  {
    path: '/blockchain',
    component: Layout,
    meta: {
      title: t('router.blockchain'),
      icon: 'ant-design:dashboard-filled',
      alwaysShow: true
    },
    name: 'Blockchain',
    children: [
      {
        path: 'blockList',
        component: () => import('@/views/Block/BlockList.vue'),
        name: 'view Blocks',
        meta: {
          title: t('router.blockList')
        },
        children: [
          {
            path: 'blockDetail/:block',
            component: () => import('@/views/Block/BlockDetail.vue'),
            name: 'BlockDetail',
            meta: {
              hidden: true,
              title: t('router.blockDetail'),
              canTo: true,
              activeMenu: '/blockchain/blockList',
              noTagsView: true
            }
          }
        ]
      },
      {
        path: 'transactionList',
        component: () => import('@/views/Transaction/TransactionList.vue'),
        name: 'view transactions',
        meta: {
          title: t('router.transactionList')
        },
        children: [
          {
            path: 'transactionDetail/:id',
            component: () => import('@/views/Transaction/TransactionDetail.vue'),
            name: 'TransactionDetail',
            meta: {
              hidden: true,
              title: t('router.transactionDetail'),
              canTo: true,
              activeMenu: '/blockchain/transactionList',
              noTagsView: true
            }
          }
        ]
      }
    ]
  },
  {
    path: '/node',
    component: Layout,
    name: 'Node',
    meta: {},
    children: [
      {
        path: 'index',
        component: () => import('@/views/Node/Node.vue'),
        name: 'Node',
        meta: {
          title: t('router.node'),
          icon: 'cib:telegram-plane'
        }
      }
    ]
  },
  {
    path: '/account/accountOverview',
    component: Layout,
    name: 'Account Overview',
    meta: { hidden: true },
    children: [
      {
        path: ':address',
        component: () => import('@/views/Account/AccountOverview.vue'),
        name: 'Account Overview',
        meta: {
          title: 'Account Overview',
          icon: 'codicon:account'
        }
      }
    ]
  },
  {
    path: '/contract/contractOverview',
    component: Layout,
    name: 'Contract Overview',
    meta: { hidden: true },
    children: [
      {
        path: ':address',
        component: () => import('@/views/Account/AccountOverview.vue'),
        name: 'Contract Overview',
        meta: {
          title: 'Contract Overview',
          icon: 'codicon:account'
        }
      }
    ]
  },
  {
    path: '/error',
    component: Layout,
    name: 'Error',
    meta: { hidden: true },
    children: [
      {
        path: 'searchNotFound',
        component: () => import('@/views/Error/SearchNotFound.vue'),
        name: 'Error',
        meta: {
          title: t('error'),
          icon: 'cib:telegram-plane'
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  strict: true,
  routes: constantRouterMap as RouteRecordRaw[],
  scrollBehavior: () => ({ left: 0, top: 0 })
})

export const resetRouter = (): void => {
  router.getRoutes().forEach((route) => {
    const { name } = route
    if (name && !NO_RESET_WHITE_LIST.includes(name as string)) {
      router.hasRoute(name) && router.removeRoute(name)
    }
  })
}

export const setupRouter = (app: App<Element>) => {
  app.use(router)
}

export default router
