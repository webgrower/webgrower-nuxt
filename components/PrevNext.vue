<template>
  <div class="prev-next pb-8">
    <hr class="my-10" />
    <div
      v-for="item in prevNextItems"
      :key="item.path"
      class="prev-next-item flex relative mb-8"
    >
      <NuxtLink
        :to="item.path"
        class="relative w-4/12 bg-gray-200 flex-none border border-gray-100"
        ><NuxtPicture
          :src="item.cover"
          class="absolute rounded u-image blur-up ls-is-cached lazyloaded"
          width="250"
          sizes="md:250px"
      /></NuxtLink>

      <div class="prev-next-body pl-6 flex-auto">
        <NuxtLink :to="item.path">
          <div class="text-sm leading-none text-gray-500 mb-2 font-medium">
            {{ getBlockLabel(item) }}
          </div>
          <h2 class="mb-2 mt-0 text-xl">
            {{ item.title }}
          </h2>
          <p class="text-base text-gray-500 leading-snug">
            {{ item.description }}
          </p>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
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
        .filter((item: any) => item && item.path)
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

.prev-next-item img {
  margin: 0;
}
</style>
