<template>
  <Container>
    <PostList :posts="posts" />
  </Container>
</template>

<script lang="ts">
import Vue from 'vue'
import Container from '~/components/Container.vue'
import PostList from '~/components/PostList.vue'
export default Vue.extend({
  components: {
    Container,
    PostList,
  },
  async asyncData({ app }) {
    const posts = await app.$ghost.posts
      .browse({
        limit: 6,
        order: 'published_at DESC',
        include: ['tags'],
      })
      .catch((err: any) => {
        console.error(err)
      })

    return { posts }
  },
})
</script>
