import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://www.bmcodelab.cl',           priority: 1,   changeFrequency: 'monthly' },
    { url: 'https://www.bmcodelab.cl/servicios', priority: 0.8, changeFrequency: 'monthly' },
    { url: 'https://www.bmcodelab.cl/asesoria',  priority: 0.8, changeFrequency: 'monthly' },
    { url: 'https://www.bmcodelab.cl/krona',     priority: 0.7, changeFrequency: 'monthly' },
    // los slugs de servicios:
    { url: 'https://www.bmcodelab.cl/servicios/desarrollo-web',       priority: 0.9, changeFrequency: 'monthly' },
    { url: 'https://www.bmcodelab.cl/servicios/consultoria-tecnica',  priority: 0.9, changeFrequency: 'monthly' },
    { url: 'https://www.bmcodelab.cl/servicios/aplicaciones-moviles', priority: 0.9, changeFrequency: 'monthly' },
    { url: 'https://www.bmcodelab.cl/servicios/aplicaciones-moviles', priority: 0.9, changeFrequency: 'monthly' },
    { url: 'https://www.bmcodelab.cl/servicios/aplicaciones-moviles', priority: 0.9, changeFrequency: 'monthly' },
    { url: 'https://www.bmcodelab.cl/servicios/aplicaciones-moviles', priority: 0.9, changeFrequency: 'monthly' },
    { url: 'https://www.bmcodelab.cl/servicios/aplicaciones-moviles', priority: 0.9, changeFrequency: 'monthly' },  
    { url: 'https://www.bmcodelab.cl/servicios/aplicaciones-moviles', priority: 0.9, changeFrequency: 'monthly' },
  ];

}