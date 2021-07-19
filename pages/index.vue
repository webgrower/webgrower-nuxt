<template>
  <PostList :posts="ghostPosts" />
</template>

<script lang="ts">
import Vue from 'vue'
import PostList from '~/components/PostList.vue'
import { getPosts } from '~/api/posts'
export default Vue.extend({
  components: {
    PostList,
  },
  async asyncData({ $content, params }) {
    const blog = await $content('blog', params.slug)
      .sortBy('date', 'desc')
      .fetch()

    const ghostPosts = await getPosts()

    console.log(ghostPosts)

    return {
      blog,
      ghostPosts,
    }
  },
})
</script>
