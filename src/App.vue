<template>
  <div id="app">
    <Header></Header>
    <router-view />
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import Header from '@/components/Header.vue'

@Component({
  components: {
    Header
  }
})
export default class Home extends Vue {
  @Watch('$route', { immediate: true })
  private changeRouter(route: any) {
    // console.log(route.path)
  }
  beforeRouteEnter(to: any, from: any, next: () => void): void {
    console.log('beforeRouteEnter')
    next()
  }
  beforeRouteUpdate(to: any, from: any, next: () => void): void {
    console.log('beforeRouteUpdate') //暂时不生效，版本问题
    next()
  }
  beforeRouteLeave(to: any, from: any, next: () => void): void {
    console.log('beforeRouteLeave')
    next()
  }
}
</script>

<style lang="less">
html,
body {
  min-height: 100%;
  margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
