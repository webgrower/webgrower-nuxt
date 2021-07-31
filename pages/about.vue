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
      mx-auto
    "
  >
    <header class="mb-20">
      <h1 class="article-title leading-5">{{ page.title }}</h1>
    </header>
    <div v-html="page.html"></div>
  </article>
</template>

<script>
import Vue from 'vue'
import theme from '~/theme.config'
export default Vue.extend({
  async asyncData({ app }) {
    const page = await app.$ghost.pages.read({
      slug: 'about',
    })

    return { page }
  },
  head() {
    return {
      title: this.page.title,
      titleTemplate: `%s - ${theme.siteName}`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.page.meta_description,
        },
      ],
    }
  },
})
</script>
