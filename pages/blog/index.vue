<script lang="ts">
import Vue from 'vue'
import PostList from '../index.vue'
import theme from '~/theme.config'
export default Vue.extend({
  extends: PostList,
  head: {
    title: theme.siteName,
    titleTemplate: 'Заметки – %s',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: theme.siteDescription,
      },
    ],
  },
})
</script>
