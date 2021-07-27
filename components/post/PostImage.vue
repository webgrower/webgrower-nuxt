<template>
  <figure :class="{ 'full-image': mode === 'full' }">
    <div class="picture">
      <NuxtPicture
        v-if="src"
        :preset="preset"
        :src="src"
        :sizes="sizes"
        :width="width"
        :height="height"
        loading="lazy"
      />
    </div>
    <figcaption v-if="caption" class="figcaption">{{ caption }}</figcaption>
    <!-- This is temporary -->
    <slot />
  </figure>
</template>

<script>
import Vue from 'vue'
export default Vue.extend({
  props: ['src', 'caption', 'mode', 'preset', 'sizes', 'width', 'height'],
})
</script>

<style>
.full-image {
  position: relative;
  left: 50%;
  width: 100vw;
  margin-left: -50vw;
}

.picture {
  position: relative;
  width: 100%;
  height: 100%;
}

.picture::before {
  display: block;
  content: '';
  width: 100%;
  padding-top: calc((9 / 16) * 100%);
}

.picture > picture {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.picture > picture img {
  margin: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
}

.figcaption {
  text-align: center;
}
</style>
