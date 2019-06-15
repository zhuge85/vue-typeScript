<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/other">Other</router-link>
  </div>
</template>

<style lang="less">
#nav {
  height: 40px;
  padding: 0 30px;
  line-height: 40px;
  color: #fff;
  background-color: #35495e;
  a {
    padding: 0 10px;
    display: inline-block;
    font-weight: bold;
    color: #fff;
    &.active {
      color: #42b983;
    }
  }
}
</style>