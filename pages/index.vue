<template>
  <PostList :posts="posts" />
</template>

<script lang="ts">
import Vue from 'vue'
import PostList from '~/components/PostList.vue'
export default Vue.extend({
  components: {
    PostList,
  },
  async asyncData({ app }) {
    const posts = await app.$ghost.posts
      .browse({
        limit: 6,
        include: ['tags'],
      })
      .catch((err: any) => {
        console.error(err)
      })

    return { posts }
  },
})
</script>
