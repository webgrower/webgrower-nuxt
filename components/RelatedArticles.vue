<template>
  <div class="post-related bg-gray-150 py-10">
    <div class="container mx-auto">
      <div class="max-w-1100 mx-auto">
        <div class="row">
          <div class="col s12 mb-12 text-center">
            <h3 class="text-title text-32">
              Related <span class="text-primary">Articles</span>
            </h3>
          </div>

          <div
            v-for="item in items"
            :key="item.path"
            class="col s12 m6 l4 flex"
          >
            <div
              class="
                storySmall
                overflow-hidden
                flex flex-col
                relative
                mb-8
                w-full
                shadow
                godo-tracking
              "
            >
              <NuxtLink :to="item.path" class="storySmall-img-link">
                <NuxtPicture
                  :src="item.cover"
                  class="
                    storySmall-img
                    object-cover
                    w-full
                    h-40
                    blur-up
                    lazyautosizes
                    ls-is-cached
                    lazyloaded
                  "
                  width="350"
                  height="160"
                  sizes="md:350px"
                />
              </NuxtLink>

              <div
                class="
                  storySmall-inner
                  p-4
                  flex flex-col
                  justify-between
                  flex-grow
                "
              >
                <div class="storySmall-body">
                  <h2 class="text-22 lineClamp-2 text-title mb-2 leading-tight">
                    <NuxtLink :to="item.path">{{ item.title }}</NuxtLink>
                  </h2>
                </div>

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

              <NuxtLink :to="item.path" class="absolute inset-0 z-3"></NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: ['items'],
})
</script>
