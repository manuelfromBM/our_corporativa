import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://www.bmcodelab.cl', lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: 'https://www.bmcodelab.cl/servicios', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  ]
}