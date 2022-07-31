<template>
  <div class="g-index">
    <h2 class="tit">简版webpack+vue3 手动配置</h2>
    <div class="txt-tit">{{ book }}</div>
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
import { defineComponent, onMounted, computed, ref, reactive } from 'vue'
import { useStore } from 'vuex'
export default {
  props: {
    collectionName: String,
  },
  setup(props) {
    const readersNumber = ref(0)
    const book = reactive({ title: 'Vue 3 Guide' })
    onMounted(() => {
      console.log(book.title, 'this book')
    })
    // 暴露给 template
    return {
      readersNumber,
      book,
    }
  },
}
/* export default defineComponent({
  setup() {
    const store = useStore()
    const methods = {
      countstore() {
        console.log(555)
      },
    }

    return {
      ...methods,
      title: computed(() => store.state.title),
    }
  },
})
console.log(333)
onMounted(() => {
  console.log(115522)
}) */
</script>
<style lang="scss" scoped></style>
