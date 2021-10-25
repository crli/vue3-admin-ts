import { onBeforeMount, onMounted, onBeforeUnmount } from 'vue'
import store from '@/store'
const { body } = document
const WIDTH = 992
export default function () {
  const $_isMobile = () => {
    const rect = body.getBoundingClientRect()
    return rect.width - 1 < WIDTH
  }
  const $_resizeHandler = () => {
    if (!document.hidden) {
      const isMobile = $_isMobile()
      // console.log('toggleDevice')
      // store.dispatch('app/toggleDevice', isMobile ? 'mobile' : 'desktop')
      if (isMobile) {
        // console.log('closeSideBar')
        // store.dispatch('app/closeSideBar', { withoutAnimation: true })
        /*此处只做根据window尺寸关闭sideBar功能*/
        store.commit('app/SIDEBAR_OPEN', false)
      } else {
        store.commit('app/SIDEBAR_OPEN', true)
      }
    }
  }
  onBeforeMount(() => {
    console.log('添加了监听')
    window.addEventListener('resize', $_resizeHandler)
  })
  onMounted(() => {
    const isMobile = $_isMobile()
    if (isMobile) {
      store.commit('app/SIDEBAR_OPEN', false)
      // store.dispatch('app/toggleDevice', 'mobile')
      // store.dispatch('app/closeSideBar', { withoutAnimation: true })
    } else {
      store.commit('app/SIDEBAR_OPEN', true)
    }
  })
  onBeforeUnmount(() => {
    window.removeEventListener('resize', $_resizeHandler)
  })
}
