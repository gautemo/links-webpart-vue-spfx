<template>
    <div>
      {{description}}, {{list}}
    </div>
</template>

<script>
export default {
  data(){
    return {
    }
  },
  props: {
    description: String,
    list: String
  }
}
</script>

<style scoped>
div{
  font-size: 5em;
}
</style>


