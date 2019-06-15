import {
  Component,
  Vue,
  Watch,
  Provide,
  Inject,
  Prop,
  Emit
} from "vue-property-decorator";
import { State, Getter, Mutation, Action } from "vuex-class";

@Component
export class MyMixin1 extends Vue {
  name = "朱波";
  runing() {
    console.log("跑步");
  }
}

@Component
export class MyMixin2 extends Vue {
  created() {
    console.log("what?you liked me");
  }
}

@Component
export class MyMixin3 extends Vue {
  created() {
    console.log("i'm the third mixin");
  }
}

// 注册一个全局自定义指令 `v-focus`
Vue.directive("focus", {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function(el) {
    // 聚焦元素
    el.focus();
  }
});
@Component({
  name: "zhuge",
  components: {},
  props: { msg: String },
  mixins: [],
  filters: {
    match(val: any) {
      return 1;
    }
  },
  directives: {
    // 自定义指令
    focus: {
      inserted(el) {
        el.focus();
      }
    }
  }
})
export class TheAll extends Vue {
  beforecreated() {}
  created() {
    this.$nextTick(() => {
      console.log("我在加载后执行");
    });
  }
  beforemounted() {}
  mounted() {}
  beforeRouteLeave(to: any, from: any, next: any) {
    next();
  }
  beforeupdated() {}
  updated() {}
  beforeDestroy() {}
  Destroy() {}

  // $attrs 表示没有继承数据的对象，格式为{属性名：属性值}
  // console.log('this.$attrs:',this.$attrs)
  // $listeners 来传递数据与事件，跨级组件之间的通讯变得更简单。
  // console.log('this.$listeners:',this.$listeners)

  // data 赋值
  child: string = "vlaue";
  count: number = 10;

  // 注意这里的感叹号
  $refs!: {
    div1: HTMLDivElement; // html元素
    // cComponent: eComponent // Typescript可以正确提示出组件中的方法和属性
  };

  // Prop 子组件获取父组件的值
  @Prop({ type: Object, required: true }) private obj: object | any;
  @Prop(Number) propA!: number;
  @Prop([String, Boolean]) propC!: string | boolean;

  // Provide 向子组件传值
  @Provide("arr")
  arr = [1, 2, 3, 4, 5];

  // Inject 子组件获取祖组件的值
  @Inject("arr2") arr2: any;

  // Emit 子组件向父组件传值
  @Emit("toparent") toparent(val: string) {
    return this.child;
  }
  @Emit("tooher") tooher() {}

  // 调用vuex示例
  // @State author: any
  @Getter private author: any;
  @Mutation protected SET_AUTHOR: any;
  @Action SET_AUTHOR_ASYN: any;

  // methods
  dispathMutation(name: string) {
    this.SET_AUTHOR(name);
  }
  dispathAction(name: string) {
    this.SET_AUTHOR_ASYN(name);
  }
  getinfo() {
    // ref：如果在普通的 DOM 元素上使用，引用指向的就是 DOM 元素；如果用在子组件上，引用就指向组件实例
    let info: any = this.$refs.div1 as HTMLDivElement;
    console.log(info);
    console.log(info.innerHTML);
    // $parent / $children：访问父 / 子实例
    console.log(this.$parent, this.$children);
  }

  // computed
  // 获取计算属性
  get computedMsg(): string {
    return "computed " + this.child;
  }
  // 设置计算属性
  set total(param: number) {
    this.count = param;
  }

  // Watch
  @Watch("$route", { immediate: true })
  private changeRouter(route: any) {
    // console.log(route.path)
  }
}
