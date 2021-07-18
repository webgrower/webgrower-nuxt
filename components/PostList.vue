<template>
  <section
    class="
      post-list
      w-full
      text-left
      my-5
      md:my-20
      flex flex-wrap flex-col
      lg:flex-row
    "
  >
    <!-- 
    |     Main post      |
    | Post | Post | Post |
    |   Post  |   Post   |
   -->
    <div
      v-for="(post, index) in posts"
      :key="post.slug"
      :class="[
        { 'post-card-lg': index % 6 === 0 },
        { 'post-card-md': index % 5 === 0 },
        { 'post-card-md': index % 4 === 0 },
        'post-card',
        'mb-10',
      ]"
    >
      <article :class="{ flex: index % 6 === 0 }">
        <PostImage
          :src="post.cover"
          class="border border-gray-300 bg-gray-200 relative"
        >
          <div class="absolute right-0 top-0">
            <NuxtLink
              :to="'/category/' + post.category"
              class="post-category bg-blue-900 mt-3 mr-3"
            >
              {{ post.category }}
            </NuxtLink>
          </div>
        </PostImage>
        <div class="content pt-5">
          <!-- <div class="text-base text-gray-500 dark:text-gray-400 mb-2">
            {{ formatDate(post.date) }}
          </div> -->
          <h2
            :class="[
              { 'text-4xl': index % 6 === 0 },
              { 'text-3xl': index % 5 === 0 },
              { 'text-3xl': index % 4 === 0 },
              'text-2xl mb-3 font-bold leading-tight',
            ]"
          >
            <NuxtLink
              class="dark:text-gray-300 dark:hover:text-white"
              :to="post.path"
              >{{ post.title }}</NuxtLink
            >
          </h2>
          <p class="post-description mb-5 text-lg leading-normal text-gray-500">
            {{ post.description }}
          </p>
        </div>
      </article>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import PostImage from '~/components/post/PostImage.vue'

interface IDateOptions {
  year: 'numeric' | '2-digit'
  month: 'numeric' | '2-digit' | 'narrow' | 'short' | 'long'
  day: 'numeric' | '2-digit'
}

export default Vue.extend({
  props: ['posts'],
  methods: {
    formatDate(date: string) {
      const options: IDateOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }
      return new Date(date).toLocaleDateString('en', options)
    },
  },
  components: {
    PostImage,
  },
})
</script>

<style scoped>
.post-list {
  grid-column: wide-start/wide-end;
}

.post-card {
  flex: 0 33.333%;
  max-width: 33.333%;
  padding-left: 1rem;
  padding-right: 1rem;
}

.post-card-md {
  flex: 0 50%;
  max-width: 50%;
}

.post-card-lg {
  flex: 0 0 100%;
  max-width: 100%;
}

.post-card-lg .content {
  flex-basis: 34.33%;
  padding-top: 0;
  padding-left: 2rem;
}

.post-card-lg figure {
  flex: 1 1 auto;
  height: auto;
  min-height: 380px;
}

.post-category {
  height: 1.5rem;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-weight: 600;
  padding: 0 0.5rem;
  border-radius: 4px;
  color: #fff;
  line-height: 1.5;
  display: inline-flex;
  align-items: center;
}

.post-description {
  display: -webkit-box;
  max-height: 6em;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
}
</style>
