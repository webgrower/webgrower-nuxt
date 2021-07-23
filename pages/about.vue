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

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  async asyncData({ app }) {
    const page = await app.$ghost.pages.read({
      slug: 'about',
    })

    return { page }
  },
})
</script>
