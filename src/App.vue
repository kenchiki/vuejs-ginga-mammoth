<template>
  <div id="wrapper">
    <header id="header">

    </header>
    <div id="container">
      <div id="app">
        <div id="nav">
          <router-link to="/">Home</router-link>
          |
          <router-link to="/about">About</router-link>
          <a href="@" data-toggle="tooltip" title="tooltip test">test</a>
        </div>
        <router-view/>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    mounted() {
    }
  }
</script>

<style lang="scss">

</style>
