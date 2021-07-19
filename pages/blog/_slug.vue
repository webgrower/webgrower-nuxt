<template>
  <article
    class="
      article
      prose
      sm:prose-sm
      lg:prose-lg
      dark:prose-dark
      text-left
      my-5
      md:my-10
    "
  >
    <header class="mb-20">
      <div class="mb-3 text-gray-500 tracking-wider text-sm font-medium">
        <NuxtLink
          :to="'/category/' + post.category"
          class="uppercase hover:underline"
          >{{ post.category }}</NuxtLink
        >
      </div>
      <h1 class="article-title leading-5">{{ post.title }}</h1>
      <PostMeta :date="post.date" :reading-time="post.readingTime" />
    </header>
    <nuxt-content :document="post" />
    <footer>
      <!-- Prev/Next articles -->
      <PrevNext :items="[prev, next]" />

      <!-- Related articles -->
      <RelatedArticles :items="related" />
    </footer>
  </article>
</template>

<script>
import Vue from 'vue'
import CopyCode from '~/components/CopyCode.vue'
import PostMeta from '~/components/PostMeta.vue'
import PrevNext from '~/components/PrevNext.vue'
import RelatedArticles from '~/components/RelatedArticles.vue'
import theme from '~/theme.config'

export default Vue.extend({
  components: {
    PostMeta,
    PrevNext,
    RelatedArticles,
  },
  async asyncData({ $content, params }) {
    const post = await $content('blog', params.slug).fetch()

    const [prev, next] = await $content('blog')
      .only(['title', 'description', 'cover', 'path'])
      .sortBy('date', 'desc')
      .surround(params.slug)
      .fetch()

    const related = await $content('blog')
      .where({ category: post.category })
      .limit(3)
      .only(['title', 'cover', 'path'])
      .fetch()

    return { post, prev, next, related }
  },
  head() {
    return {
      title: this.post.title,
      titleTemplate: `%s - ${theme.siteName}`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.post.description,
        },
      ],
    }
  },
  mounted() {
    setTimeout(() => {
      const blocks = Array.from(
        document.getElementsByClassName('nuxt-content-highlight')
      )

      for (const block of blocks) {
        const CopyButton = Vue.extend(CopyCode)
        const component = new CopyButton().$mount()
        block.appendChild(component.$el)
      }
    }, 100)
  },
})
</script>

<style scoped>
.article {
  grid-column: wide-start/wide-end;
}

@screen sm {
  .article {
    margin-left: auto;
    margin-right: auto;
  }
}

@screen lg {
  .article {
    grid-column: main-start/main-end;
  }
}
</style>
