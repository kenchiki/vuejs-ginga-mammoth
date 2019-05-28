<template>
  <div>
    {{account.instance_name}}:{{timeline.type}}
  </div>
</template>

<script>
  export default {
    props: ['account', 'timeline']
  }
</script>
