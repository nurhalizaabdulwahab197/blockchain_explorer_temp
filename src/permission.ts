import router from './router'
import { useAppStoreWithOut } from '@/store/modules/app'
import type { RouteRecordRaw } from 'vue-router'
import { useTitle } from '@/hooks/web/useTitle'
import { useNProgress } from '@/hooks/web/useNProgress'
import { usePermissionStoreWithOut } from '@/store/modules/permission'
import { usePageLoading } from '@/hooks/web/usePageLoading'
import { useUserStoreWithOut } from '@/store/modules/user'

const { start, done } = useNProgress()

const { loadStart, loadDone } = usePageLoading()

router.beforeEach(async (to, from, next) => {
  start()
  loadStart()
  const permissionStore = usePermissionStoreWithOut()
  const appStore = useAppStoreWithOut()
  const userStore = useUserStoreWithOut()
  if (permissionStore.getIsAddRouters) {
    next()
    return
  }

  // 开发者可根据实际情况进行修改
  const roleRouters = userStore.getRoleRouters || []

  // 是否使用动态路由
  if (appStore.getDynamicRouter) {
    await permissionStore.generateRoutes('frontEnd', roleRouters as string[])
  } else {
    await permissionStore.generateRoutes('static')
  }

  permissionStore.getAddRouters.forEach((route) => {
    router.addRoute(route as unknown as RouteRecordRaw) // 动态添加可访问路由表
  })
  const redirectPath = from.query.redirect || to.path
  const redirect = decodeURIComponent(redirectPath as string)
  const nextData = to.path === redirect ? { ...to, replace: true } : { path: redirect }
  permissionStore.setIsAddRouters(true)
  next(nextData)
})

router.afterEach((to) => {
  useTitle(to?.meta?.title as string)
  done() // 结束Progress
  loadDone()
})
