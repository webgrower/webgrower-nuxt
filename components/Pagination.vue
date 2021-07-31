<template>
  <section v-if="pagination.total > pagination.limit" class="text-center">
    <nav
      class="relative z-0 inline-flex rounded-md -space-x-px mb-5 md:mb-10"
      aria-label="Постраничная навигация"
    >
      <NuxtLink
        v-if="pagination.prev"
        :to="pagination.prev > 1 ? `/page/${pagination.prev}` : '/'"
        class="
          relative
          inline-flex
          items-center
          px-2
          py-2
          rounded-md
          bg-white
          text-sm
          font-medium
          text-gray-500
          hover:bg-gray-50
          dark:bg-dark dark:hover:text-white
        "
      >
        <span class="sr-only">Назад</span>
        <svg
          class="h-5 w-5"
          x-description="Heroicon name: solid/chevron-left"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </NuxtLink>
      <NuxtLink
        v-for="index in pagination.pages"
        :key="index"
        :to="index > 1 ? `/page/${index}` : '/'"
        :aria-current="index === pagination.page"
        :class="[
          'z-10 relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md',
          {
            'hover:bg-gray-50 hover:text-black text-gray-500 dark:hover:bg-gray-800 dark:hover:text-white dark:text-gray-400':
              index !== pagination.page,
          },
          {
            'bg-gray-100 text-black hover:bg-gray-100 hover:text-black dark:bg-gray-800 dark:hover:bg-gray-800 dark:text-white':
              index === pagination.page,
          },
        ]"
        >{{ index }}
      </NuxtLink>
      <!-- Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" -->
      <span
        v-if="pagination.pages > pagination.limit"
        class="
          relative
          inline-flex
          items-center
          px-4
          py-2
          bg-white
          text-sm
          font-medium
          text-gray-700
        "
      >
        ...
      </span>
      <NuxtLink
        v-if="pagination.next"
        :to="`/page/${pagination.next}`"
        class="
          relative
          inline-flex
          items-center
          px-2
          py-2
          rounded-r-md
          bg-white
          text-sm
          font-medium
          text-gray-500
          hover:bg-gray-50
          dark:bg-dark dark:hover:text-white
        "
      >
        <span class="sr-only">Вперед</span>
        <svg
          class="h-5 w-5"
          x-description="Heroicon name: solid/chevron-right"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </NuxtLink>
    </nav>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: ['pagination'],
})
</script>
