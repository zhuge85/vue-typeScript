<template>
  <div class="child">
    <h1>{{ msg }}</h1>
    <p>{{obj}}</p>
    <p>{{arr}}</p>
    <p>给父组件传值</p>
    <button @click="toparent">传值</button>
    <button @click="tooher">还原</button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Inject, Emit, Vue } from 'vue-property-decorator'
import { State, Getter, Mutation, Action } from 'vuex-class'

@Component({
  name: 'child',
  props: {
    msg: String,
    obj: Object
  },
  components: {}
})
export default class HelloWorld extends Vue {
  @Prop({ type: Object, required: true }) private obj: object | any
  @Prop({ type: Array, required: true }) readonly arr: string[] | any

  // Inject
  @Inject('arr2') arr2: any

  // data
  num = 123
  child = '我是子组件传的值'
  // 调用vuex示例
  // @State author: any
  @Getter private author: any
  @Mutation protected SET_AUTHOR: any
  @Action SET_AUTHOR_ASYN: any

  // lifecycle hook
  created() {
    // console.log(this.author)
    // console.log(this.arr2)
    // $attrs 表示没有继承数据的对象，格式为{属性名：属性值}
    console.log('this.$attrs:',this.$attrs)
    // $listeners 来传递数据与事件，跨级组件之间的通讯变得更简单。
    console.log('this.$listeners:',this.$listeners)
  }
  mounted() {
    this.changeAuthor('帅锅')
    // console.log(this.author)
    this.changeAuthor2('shuaigege')
    // console.log(this.author)
  }

  // computed
  get computedMsg() {
    return 'computed ' + this.num
  }

  // Emit
  @Emit('toparent') toparent(val: string) {
    return this.child
  }
  @Emit('tooher') tooher() {}
  // method
  changeAuthor(name: string) {
    // Mutation
    this.SET_AUTHOR(name)
  }
  changeAuthor2(name: string) {
    // Action
    this.SET_AUTHOR_ASYN(name)
  }
}
</script>

<style scoped lang="less">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
