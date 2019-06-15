<template>
  <div class="about">
    <div>
      <h1>This is an about page</h1>
      <router-link to="/about/a">A1</router-link> |
      <router-link to="/about/b">A2</router-link>
    </div>
    <div>
      <button @click="get">get</button>
      <button @click="post">post</button>
      <button @click="other">other-post</button>
      <button @click="other2">other-get</button>
    </div>
    <router-view />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getSomeThings, postSomeThings } from "../api/";
@Component
export default class About extends Vue {
  param = {
    username: "abcabc",
    password: "abcabc",
    code: "792e9ab8dbe27c230eb1b8ecbc60f1cc",
    mark: "88570828"
  };
  get() {
    // console.log(getSomeThings);
    getSomeThings("/homeapi/home/index/user_get_odss", { csk: 3 }).then(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  }
  post() {
    postSomeThings("/homeapi/Api/Foreign/mark_login", this.param).then(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  }
  other() {
    // this.$post("/homeapi/Api/Foreign/mark_login", this.param).then(
    //   (res: any) => {
    //     console.log(res);
    //   }
    // );
  }
  other2() {
    // this.$get("/homeapi/home/index/user_get_odss", {
    //   csk: 3
    // }).then((res: any) => {
    //   console.log(res);
    // });
  }
}
</script>
