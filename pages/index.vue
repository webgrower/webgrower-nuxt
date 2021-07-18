<template>
  <PostList :posts="blog" />
</template>

<script lang="ts">
import Vue from 'vue'
import PostList from '~/components/PostList.vue'
export default Vue.extend({
  components: {
    PostList,
  },
  async asyncData({ $content, params }) {
    const blog = await $content('blog', params.slug)
      .sortBy('date', 'desc')
      .fetch()

    return {
      blog,
    }
  },
})
</script>