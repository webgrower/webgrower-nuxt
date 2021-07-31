<template>
  <Container>
    <PostList :posts="posts" :pagination="pagination" />
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
  async asyncData({ app, params }) {
    const page = params.page ? parseInt(params.page, 10) : 1

    const posts = await app.$ghost.posts
      .browse({
        limit: 6,
        page,
        order: 'published_at DESC',
        include: ['tags'],
      })
      .catch((err: any) => {
        console.error(err)
      })

    const { pagination } = posts.meta

    return { posts, pagination }
  },
})
</script>
