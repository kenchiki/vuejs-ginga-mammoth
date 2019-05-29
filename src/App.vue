<template>
  <div id="wrapper">
    <header id="header">
      <h1 id="header-logo">銀河マンモス</h1>

      <nav class="header-nav">
        <ul class="header-nav__links">
          <li><router-link to="/">銀河マンモスについて</router-link></li>
          <li><router-link to="/accounts">アカウント管理</router-link></li>
          <li><router-link to="/timelines">タイムライン管理</router-link></li>
          <li><router-link to="/statuses">タイムライン表示＆投稿</router-link></li>
        </ul>
      </nav>
    </header>
    <div id="app">
        <router-view/>
    </div>
  </div>
</template>

<script>
  export default {
    created() {
      this.$store.commit('accounts/restoreStorage');
      this.$store.commit('timelines/restoreStorage');
    }
  }
</script>

<style lang="scss">
  @import "./assets/stylesheets/_module_variables.scss";

  #wrapper {
    display: flex;
    flex-flow: column nowrap;
    width: 100%;
    height: 100%;
  }

  #header {
    min-width: $global-width;

    &, a {
      color: rgba(#000, 0.8);
    }

    background: #223;
    padding: 20px 30px;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;

    #header-logo {
      font-size: 2.8rem;
      color: #fff;
    }

    .header-nav {
      &__links {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        justify-content: flex-end;
        a {
          color: #fff;
        }

        & > * {
          margin-left: 20px;
          &:first-child {
            margin-left: 0;
          }
        }
      }
    }
  }

  #app {
    width: 100%;
    flex: 1;
    overflow: hidden;
  }
</style>
