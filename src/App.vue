<template>
  <div class="g-index">
    <h2 class="tit">简版webpack+vue3 手动配置</h2>
    <div id="nav" v-if="!$route.meta.hide">
      <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>
    </div>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" class="router"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" class="router"></router-view>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
export default defineComponent({
  setup() {
    const store = useStore()
    return {
      title: computed(() => store.state.title),
    }
  },
})
</script>
<style lang="scss" scoped></style>
