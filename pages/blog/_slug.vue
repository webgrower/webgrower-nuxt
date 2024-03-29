<template>
  <div>
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
        container
        mx-auto
        px-4
      "
    >
      <header class="mb-10">
        <div class="mb-3 text-gray-500 tracking-wider text-sm font-medium">
          <NuxtLink
            v-if="post.tags && post.tags[0]"
            :to="'/category/' + category.slug"
            class="uppercase hover:underline"
            >{{ category.name }}</NuxtLink
          >
        </div>
        <h1 class="article-title leading-5">{{ post.title }}</h1>
        <!-- <PostMeta :date="post.date" :reading-time="post.readingTime" /> -->
      </header>
      <div v-html="post.html"></div>
      <footer>
        <!-- Prev/Next articles -->
        <PrevNext :items="[prevPost, nextPost]" />
      </footer>
    </article>

    <!-- Related articles -->
    <RelatedArticles v-if="relatedPosts.length" :items="relatedPosts" />
  </div>
</template>

<script>
import Vue from 'vue'
import CopyCode from '~/components/CopyCode.vue'
// import PostMeta from '~/components/PostMeta.vue'
import PrevNext from '~/components/PrevNext.vue'
import RelatedArticles from '~/components/RelatedArticles.vue'
import theme from '~/theme.config'

export default Vue.extend({
  components: {
    // PostMeta,
    PrevNext,
    RelatedArticles,
  },
  async asyncData({ app, params }) {
    const post = await app.$ghost.posts.read(
      {
        slug: params.slug,
      },
      { include: 'tags' }
    )

    // Format date string for query into `YYYY-MM-DD`
    const formatDate = (str) => {
      return new Date(str).toISOString().replace('T', ' ')
    }

    const postPublishedDate = formatDate(post.published_at)

    // Get next posts
    const nextPosts = await app.$ghost.posts.browse({
      order: 'published_at ASC',
      filter: `published_at:>'${postPublishedDate}'`,
      limit: 1,
    })

    // Get prev posts
    const prevPosts = await app.$ghost.posts.browse({
      order: 'published_at DESC',
      filter: `published_at:<'${postPublishedDate}'`,
      limit: 2,
    })

    // Get prev or next post to show
    const getPost = (posts) => {
      return posts.filter((item) => item.slug && item.slug !== post.slug)[0]
    }

    const prevPost = getPost(prevPosts)
    const nextPost = getPost(nextPosts)

    // Get data for related block
    const relatedPostsData = await app.$ghost.posts.browse({
      filter: `tag:${post.tags[0].slug}`,
      limit: 3,
    })

    const relatedPosts = relatedPostsData.filter(
      (item) => item.slug && item.slug !== post.slug
    )

    // Build image for social networks (twitter, facebook, telegram)
    const cloudinaryUrl =
      'https://res.cloudinary.com/webgrower/image/fetch/f_auto,q_auto,'
    const featuredImageTwitter = post.feature_image
      ? `${cloudinaryUrl}w_600/${post.feature_image}`
      : ''
    const featuredImageFb = post.feature_image
      ? `${cloudinaryUrl}w_600/${post.feature_image}`
      : ''

    return {
      post,
      prevPost,
      nextPost,
      relatedPosts,
      featuredImageFb,
      featuredImageTwitter,
    }
  },
  head() {
    return {
      title: this.post.title,
      titleTemplate: `%s - ${theme.siteName}`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.post.excerpt,
        },
        {
          hid: 'og:url',
          name: 'og:url',
          content: `${theme.siteUrl}/blog/${this.post.slug}`,
        },
        {
          hid: 'og:title',
          name: 'og:title',
          content: this.post.title,
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: this.post.excerpt,
        },
        {
          hid: 'og:image',
          name: 'og:image',
          content: this.featuredImageFb,
        },
        {
          hid: 'twitter:card',
          name: 'twitter:card',
          content: 'summary_large_image',
        },
        {
          hid: 'twitter:url',
          name: 'twitter:url',
          content: `${theme.siteUrl}/blog/${this.post.slug}`,
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: this.post.title,
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: this.post.excerpt,
        },
        {
          hid: 'twitter:image',
          name: 'og:image',
          content: this.featuredImageTwitter,
        },
      ],
    }
  },
  computed: {
    category() {
      if (!this.post.tags) {
        return
      }

      return this.post.tags[0]
    },
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
@screen sm {
  .article {
    margin-left: auto;
    margin-right: auto;
  }
}

.article-title {
  line-height: 1.25;
}
</style>
