<template>
  <div id="wrapper">
    <header id="header">
      <h1 id="header-logo">銀河マンモス</h1>

      <nav class="header-nav">
        <ul class="header-nav__links">
          <li><router-link to="/">銀河マンモスについて</router-link></li>
          <li><router-link to="/accounts">アカウント管理</router-link></li>
        </ul>
      </nav>
    </header>
    <div id="container">
      <div id="app">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    created() {
      this.$store.commit('accounts/restoreStorage');
    }
  }
</script>

<style lang="scss">

</style>
