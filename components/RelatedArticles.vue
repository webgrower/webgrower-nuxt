<template>
  <div class="post-related bg-gray-100 dark:bg-darker py-10">
    <div class="container mx-auto">
      <div class="flex flex-wrap">
        <div class="text-title-wrapper mb-12 text-center">
          <h3 class="text-title dark:text-gray-300">Что еще почитать</h3>
        </div>

        <div
          v-for="item in items"
          :key="item.path"
          class="flex related-item px-4"
        >
          <div
            class="
              overflow-hidden
              flex flex-col
              relative
              mb-8
              w-full
              shadow
              rounded-t
            "
          >
            <NuxtLink :to="item.slug">
              <PostImage
                :src="item.feature_image"
                class="object-cover w-full h-40"
                width="350"
                height="160"
              />
            </NuxtLink>

            <div
              class="
                p-4
                flex flex-col
                justify-between
                flex-grow
                bg-white
                dark:bg-lightdark
              "
            >
              <h2
                class="text-xl font-bold mb-2 leading-tight dark:text-gray-300"
              >
                <NuxtLink :to="item.slug">{{ item.title }}</NuxtLink>
              </h2>

              <!-- <div class="hh-date flex items-center text-gray-500 text-sm">
                  <time
                    class="datetime capitalize"
                    datetime="2021-07-12"
                    title="Updated 15 июля 2021"
                    >12 июля 2021</time
                  >
                  <span class="bull mx-1">·</span>
                  <span
                    class="readingTime cursor-default"
                    title="2 минуты на чтение"
                    >2 минуты на чтение</span
                  >
                </div> -->
            </div>

            <NuxtLink :to="item.slug" class="absolute inset-0 z-3"></NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import PostImage from '~/components/post/PostImage.vue'
export default Vue.extend({
  components: {
    PostImage,
  },
  props: ['items'],
})
</script>

<style scoped>
.text-title-wrapper {
  flex: 0 0 100%;
  max-width: 100%;
}

.text-title {
  @apply text-4xl;

  font-weight: 700;
  line-height: 1.25;
}

.related-item {
  flex: 0 0 100%;
  max-width: 100%;
}

@screen md {
  .related-item {
    flex: 0 50%;
    max-width: 50%;
  }
}

@screen lg {
  .related-item {
    flex: 0 0 33.33333%;
    max-width: 33.33333%;
  }
}
</style>
