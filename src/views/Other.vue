<template>
  <div>
    <!-- <input @input="value=value.replace(/^[0]+[0-9]*$/gi,'')" type="number" v-model="value" placeholder="快速金额"> -->
    <p>移动端的话可以试试加上pattern，弹出的键盘都只有数字了</p>
    <input @input="value=value.replace(/^(0+)|[^\d]+/gi,'')" pattern="[0-9]*" type="text" v-model="value" v-focus placeholder="快速金额">
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  directives: {
    focus: {
      inserted(el) {
        el.focus()
      }
    }
  }
})
export default class Home extends Vue {
  value = ''
  created() {
    // console.log(this.$route)
  }
}
</script>
