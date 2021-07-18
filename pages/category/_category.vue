<template>
    <h1>Hell of a category</h1>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    async asyncData({ params }) {
      const slug = params.slug // When calling /abc the slug will be "abc"
      return { slug }
    }
})
</script>