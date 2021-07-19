import GhostContentAPI from '@tryghost/content-api'

// Create API instance with site credentials
const api = new GhostContentAPI({
  url: 'http://localhost:2368',
  key: '12069867494a81952db8947b68',
  version: 'v3',
})

export async function getPosts() {
  return await api.posts
    .browse({
      limit: 'all',
      include: ['tags'],
      formats: ['plaintext'],
      fields: ['title', 'slug', 'feature_image', 'excerpt'],
    })
    .catch((err) => {
      console.error(err)
    })
}

export async function getSinglePost(postSlug) {
  return await api.posts
    .read({
      slug: postSlug,
    })
    .catch((err) => {
      console.error(err)
    })
}
