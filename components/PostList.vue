<template>
  <div>
    <div
      class="post-list w-full text-left my-5 md:my-10 flex flex-wrap flex-row"
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
          { 'post-card-md lg:post-card-lg': index % 6 === 0 },
          {
            'sm:post-card-md lg:post-card-md':
              index > 0 && (index % 4 === 0 || index % 5 === 0),
          },
          'post-card-lg',
          'sm:post-card-md',
          'md:post-card-md',
          'lg:post-card',
          'px-4',
          'mb-10',
        ]"
      >
        <article :class="{ 'lg:flex': index % 6 === 0 }">
          <PostImage
            :src="post.feature_image"
            class="border border-gray-300 bg-gray-200 relative"
            sizes="xs:320px,sm:640px,md:768px,lg:1024px,xl:1280px"
          >
            <div class="absolute right-0 top-0">
              <NuxtLink
                :to="'/category/' + post.tags[0].slug"
                class="post-category bg-blue-900 mt-3 mr-3"
              >
                {{ post.tags[0].name }}
              </NuxtLink>
            </div>
          </PostImage>
          <div
            :class="[
              { 'lg:pt-0 lg:pl-8': index % 6 === 0 },
              'pt-5 content overflow-hidden',
            ]"
          >
            <div class="text-base text-gray-500 dark:text-gray-400 mb-2">
              {{ formatDate(post.published_at) }}
            </div>
            <h2
              :class="[
                { 'lg:text-4xl': index % 6 === 0 },
                {
                  'lg:text-3xl':
                    index > 0 && (index % 4 === 0 || index % 5 === 0),
                },
                'text-2xl mb-3 font-bold leading-tight',
              ]"
            >
              <NuxtLink
                class="dark:text-gray-300 dark:hover:text-white"
                :to="'/blog/' + post.slug"
                >{{ post.title }}</NuxtLink
              >
            </h2>
            <p
              class="post-description mb-5 text-lg leading-normal text-gray-500"
            >
              {{ post.excerpt }}
            </p>
          </div>
        </article>
      </div>
    </div>
    <Pagination v-if="pagination" :pagination="pagination" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import PostImage from '~/components/post/PostImage.vue'
import Pagination from '~/components/Pagination.vue'

interface IDateOptions {
  year: 'numeric' | '2-digit'
  month: 'numeric' | '2-digit' | 'narrow' | 'short' | 'long'
  day: 'numeric' | '2-digit'
}

export default Vue.extend({
  components: {
    PostImage,
    Pagination,
  },
  props: ['posts', 'pagination'],
  methods: {
    formatDate(date: string) {
      const options: IDateOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }
      return new Date(date).toLocaleDateString('ru', options)
    },
  },
})
</script>

<style scoped>
@responsive {
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

  .post-card-lg div {
    flex-basis: 34.33%;
  }

  .post-card-lg figure {
    flex: 1 1 auto;
    height: auto;
  }
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
