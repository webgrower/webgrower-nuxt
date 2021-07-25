<template>
  <div class="prev-next pb-8">
    <hr class="my-10" />
    <div
      v-for="item in prevNextItems"
      :key="item.slug"
      class="prev-next-item flex relative mb-8"
    >
      <NuxtLink :to="item.slug" class="relative w-4/12 flex-none rounded">
        <PostImage
          :src="item.feature_image"
          class="my-0"
          sizes="xs:320px,sm:640px,md:768px,lg:1024px,xl:1280px"
      /></NuxtLink>

      <div class="prev-next-body pl-6 flex-auto">
        <NuxtLink :to="item.slug">
          <div class="text-sm leading-none text-gray-500 mb-2 font-medium">
            {{ getBlockLabel(item) }}
          </div>
          <h2 class="mb-2 mt-0 text-xl">
            {{ item.title }}
          </h2>
          <p class="text-base text-gray-500 leading-snug">
            {{ item.excerpt }}
          </p>
        </NuxtLink>
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
  computed: {
    prevNextItems() {
      return this.items
        .map((item: any, index: number) => {
          return {
            ...item,
            direction: index > 0 ? 'next' : 'prev',
          }
        })
        .filter((item: any) => item && item.slug)
    },
  },
  methods: {
    getBlockLabel(item: any) {
      return (
        (item.direction === 'next' ? 'Следующая' : 'Предыдущая') + ' статья'
      )
    },
  },
})
</script>

<style>
.prev-next-item {
  min-height: 10rem;
  overflow: hidden;
}

.prev-next-item img,
.prev-next-item figure {
  margin: 0;
}
</style>
