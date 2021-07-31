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
      <PostList :posts="posts" :pagination="pagination" />
    </Container>
  </main>
</template>

<script>
import Vue from 'vue'
import Container from '~/components/Container.vue'
import PostList from '~/components/PostList.vue'
import theme from '~/theme.config'

export default Vue.extend({
  components: {
    Container,
    PostList,
  },
  async asyncData({ app, params }) {
    const category = await app.$ghost.tags.read({
      slug: params.category,
    })

    const { name, description } = category

    const postsData = await app.$ghost.posts.browse({
      filter: `tag:${params.category}`,
      limit: 6,
      include: 'tags',
    })

    const { pagination } = postsData.meta

    const posts = postsData.filter((item) => item.slug)

    return { name, description, posts, pagination }
  },
  head() {
    return {
      title: this.name,
      titleTemplate: `%s – ${theme.siteName}`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Blog about web staff, games, music and life around',
        },
      ],
    }
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
