import { MetadataRoute } from 'next'
import { allPosts } from '@/.contentlayer/generated'
import siteMetadata from '@/data/siteMetadata'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = siteMetadata.siteUrl //TODO this?
  const blogRoutes = allPosts.map((post) => ({
    url: `${siteUrl}/${post.url}`,
    lastModified:  post.date,
  }))

  const routes = ['', 'blog',  'tags', 'about'].map((route) => ({
    url: `${siteUrl}/${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...routes, ...blogRoutes]
}
