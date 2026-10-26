import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://www.bmcodelab.cl',           priority: 1,   changeFrequency: 'monthly' },
    { url: 'https://www.bmcodelab.cl/Sorteo',     priority: 0.9, changeFrequency: 'monthly' },
    { url: 'https://www.bmcodelab.cl/asesoria',  priority: 0.8, changeFrequency: 'monthly' },
    { url: 'https://www.bmcodelab.cl/krona',     priority: 0.7, changeFrequency: 'monthly' },
    // los slugs de servicios:
    { url: 'https://www.bmcodelab.cl/servicios/desarrollo-web',       priority: 0.9, changeFrequency: 'monthly' },
    { url: 'https://www.bmcodelab.cl/servicios/consultoria-tecnica',  priority: 0.9, changeFrequency: 'monthly' },
    { url: 'https://www.bmcodelab.cl/servicios/aplicaciones-moviles', priority: 0.9, changeFrequency: 'monthly' },
    { url: 'https://www.bmcodelab.cl/servicios/integracion-ia', priority: 0.9, changeFrequency: 'monthly' },
    { url: 'https://www.bmcodelab.cl/servicios/seguridad-gestion', priority: 0.9, changeFrequency: 'monthly' },
    { url: 'https://www.bmcodelab.cl/servicios/automatizacion', priority: 0.9, changeFrequency: 'monthly' },
    { url: 'https://www.bmcodelab.cl/servicios/devops-hosting', priority: 0.9, changeFrequency: 'monthly' },  
    { url: 'https://www.bmcodelab.cl/servicios/soporte-mantenimiento', priority: 0.9, changeFrequency: 'monthly' },
  ];

}