<template>
  <div>
  </div>
</template>

<script>
  export default {
    async created() {
      await this.$store.dispatch('accounts/fetchToken', this.$route.query.code);
      this.$router.push({name: 'accounts'});
    }
  }
</script>
