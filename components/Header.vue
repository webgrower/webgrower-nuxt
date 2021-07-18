<template>
  <header
    class="
      py-6
      md:space-x-10
      header
      bg-white
      dark:bg-black
      grid grid-cols-main
      sticky
      top-0
      z-20
    "
    aria-label="Header with menu"
  >
    <nav class="flex items-center w-full header-nav">
      <div class="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
        <div class="flex items-center justify-between w-full md:w-auto">
          <NuxtLink class="order-2 md:order-1 flex items-center -mt-1" to="/">
            <img src="~/assets/icons/plant.svg" width="50" height="50" />
            <span class="text-2xl font-bold">{{ siteName }}</span>
            <!-- <svg width="50" height="50" fill="none" viewBox="0 0 512 512"><path fill="#F0DB4F" d="M486 26H26v460h460V26z"></path><path fill="#323330" d="M171 462.3h3.1l35-72.1c4-8.4 8.6-22.3 8.6-22.3s4.4 13.9 8.4 22.3l33.6 72.1h3.1l54.3-150.9h-29.9l-21.5 60a354 354 0 00-8 27.1s-4.4-17-9.2-27L219.2 310h-3l-28.9 61.4c-4.8 10-9.2 27-9.2 27s-4.2-16.7-8-27l-21.7-60.1h-32.6l55.3 151zm232.6.7a97.3 97.3 0 0057.4-17.4v-64.7h-64.2v27h36v22a73.8 73.8 0 01-29.2 5.6c-31.4 0-49.5-21.4-49.5-49.3 0-28 17.6-48.8 44.7-48.8 17.4 0 26 5.9 33.4 13.6l21-20.7c-12.4-14-30-20.7-54.4-20.7-45.1 0-76.4 32.4-76.4 76.6 0 44.2 32.4 76.8 81.2 76.8z"></path></svg> -->
          </NuxtLink>
          <ColorMode class="order-1 md:hidden z-50" />
          <div class="-mr-2 order-3 md:order-2 flex items-center md:hidden">
            <button
              type="button"
              class="
                bg-white
                dark:bg-gray-800
                rounded-md
                p-2
                inline-flex
                items-center
                justify-center
                text-gray-400
                dark:text-gray-300
                hover:text-gray-500
                hover:bg-gray-100
                focus:outline-none
                focus:ring-2 focus:ring-inset focus:ring-indigo-500
                z-50
              "
              aria-expanded="false"
              @click="showMenu = !showMenu"
            >
              <!-- <span class="sr-only">Open main menu</span> -->
              <!-- Heroicon name: outline/menu -->
              <svg
                v-if="!showMenu"
                class="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>

              <svg
                v-else
                class="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div class="hidden md:block md:ml-10 md:pr-4 md:space-x-8">
        <span v-for="item in nav" :key="item.href">
          <NuxtLink
            :to="item.href"
            class="
              text-lg
              font-medium
              text-gray-500
              dark:text-gray-300
              hover:text-gray-900
              dark:hover:text-white
            "
            >{{ item.title }}</NuxtLink
          >
        </span>
      </div>
      <ColorMode class="hidden md:inline-block md:ml-auto" />
      <!-- Mobile menu -->
      <transition
        enter-active-class="duration-200 ease-out"
        enter-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="duration-200 ease-in"
        leave-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-95"
      >
        <div
          v-if="showMenu"
          class="
            absolute
            top-0
            inset-x-0
            transition
            transform
            origin-center
            md:hidden
            z-10
          "
        >
          <div class="bg-white dark:bg-black grid grid-cols-main h-screen">
            <div class="menu">
              <div
                class="
                  space-y-10
                  h-screen
                  flex flex-col
                  items-center
                  justify-center
                "
              >
                <NuxtLink
                  to="/blog"
                  class="
                    text-4xl
                    font-bold
                    text-gray-900
                    hover:text-gray-700
                    dark:text-gray-300
                  "
                  @click.native="showMenu = false"
                >
                  Blog
                </NuxtLink>

                <NuxtLink
                  to="/work"
                  class="
                    text-4xl
                    font-bold
                    text-gray-900
                    hover:text-gray-700
                    dark:text-gray-300
                  "
                  @click.native="showMenu = false"
                >
                  Work
                </NuxtLink>

                <NuxtLink
                  to="/about"
                  class="
                    text-4xl
                    font-bold
                    text-gray-900
                    hover:text-gray-700
                    dark:text-gray-300
                  "
                  @click.native="showMenu = false"
                >
                  About
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </nav>
  </header>
</template>

<script lang="ts">
import Vue from 'vue'
import ColorMode from '~/components/ColorMode.vue'
import theme from '~/theme.config'

export default Vue.extend({
  components: {
    ColorMode,
  },
  data() {
    return {
      nav: [
        {
          href: '/blog',
          title: 'Blog',
        },
        {
          href: '/work',
          title: 'Work',
        },
        {
          href: '/about',
          title: 'About',
        },
      ],
      showMenu: false,
      siteName: theme.siteName,
    }
  },
})
</script>

<style scoped>
.header {
  grid-column: full-start/full-end;
  box-shadow: 0 0 3px rgb(0 0 0 / 3%), 0 3px 46px rgb(0 0 0 / 7%);
}

.light a.nuxt-link-exact-active {
  color: black;
  font-weight: bold;
}

.dark a.nuxt-link-exact-active {
  color: white;
  font-weight: bold;
}

.header-nav,
.menu {
  grid-column: wide-start/wide-end;
}
</style>
