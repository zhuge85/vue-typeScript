<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <p>filters： {{ msg | match }}</p>
    <div ref="div1">ref test</div>
    <div ref="div2">i'm just some word</div>
    <button @click="getinfo">获取div</button>
    <button @click="getpAndc">获取父与子实例</button>
    <h2>{{ msg }}</h2>
    <HelloWorld
      @toparent="toparent"
      @tooher="tooher"
      msg="Welcome to Your Vue.js + TypeScript App"
      :obj="obj"
      :arr="arr"
      oher="other"
    />
  </div>
</template>

<script lang="ts">
import { Component, Mixins, Provide, Vue } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue";
import { MyMixin1, MyMixin2, MyMixin3 } from "../mixins";

@Component({
  name: "parent",
  components: {
    HelloWorld
  },
  mixins: [MyMixin2],
  filters: {
    match(val: any) {
      return 1;
    }
  }
})
export default class Home extends Mixins(MyMixin1, MyMixin3) {
  obj = {
    a: 1,
    b: 2,
    c: 3,
    d: 4
  };
  arr = [1, 2, 3, 4, 5];
  msg = "我是父组件的值";
  @Provide("arr2")
  arr2 = [
    {
      name: "test",
      id: 1
    }
  ];
  toparent(val: string) {
    this.msg = val;
  }
  tooher() {
    this.msg = "我是父组件的值";
  }
  $refs!: {
    div1: HTMLDivElement;
    div2: HTMLDivElement;
  };

  getinfo() {
    // ref：如果在普通的 DOM 元素上使用，引用指向的就是 DOM 元素；如果用在子组件上，引用就指向组件实例
    let info: any = this.$refs.div1 as HTMLDivElement;
    console.log(info);
    console.log(info.innerHTML);
  }
  getpAndc() {
    // $parent / $children：访问父 / 子实例
    console.log(this.$parent, this.$children);
  }
  created() {
    console.log(this.name);
    this.runing();
    this.$nextTick(() => {
      console.log("我在加载后执行");
    });
  }
  filters() {}
}
</script>
