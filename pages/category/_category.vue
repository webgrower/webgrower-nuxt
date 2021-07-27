<template>
  <main>
    <section class="tag-header md:py-vw6 bg-gray-150 dark:bg-darker">
      <div class="mx-auto px-4 max-w-1000 text-center">
        <h1
          class="
            capitalize
            text-4xl text-title
            lg:text-5xl
            font-bold
            dark:text-gray-300
          "
        >
          {{ name }}
        </h1>

        <p class="text-xl mt-5 font-serif max-w-xl mx-auto dark:text-gray-400">
          {{ description }}
        </p>
      </div>
    </section>

    <Container>
      <PostList :posts="posts" />
    </Container>
  </main>
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
    const { name, description } = await app.$ghost.tags.read({
      slug: params.category,
    })

    const postsData = await app.$ghost.posts.browse({
      filter: `tag:${params.category}`,
      include: 'tags',
    })

    const posts = postsData.filter((item: any) => item.slug)

    return { name, description, posts }
  },
})
</script>

<style scoped>
.tag-header {
  @apply py-12;
}

@screen md {
  .tag-header {
    padding-top: 6vw;
    padding-bottom: 6vw;
  }
}
</style>
