export const DETALLE: Record<
    string,
    {
        tagline: string;
        descTec: string;
        descCas: string;
        featuresTec: string[];
        featuresCas: string[];
    }
> = {
    "consultoria-tecnica": {
        tagline: "Claridad antes de construir",
        descTec:
            "Realizamos una auditoría completa de tu infraestructura actual, identificamos cuellos de botella, evaluamos la deuda técnica acumulada y definimos un roadmap tecnológico alineado a tu stack. Entregamos un documento de arquitectura con recomendaciones priorizadas y estimaciones de esfuerzo.",
        descCas:
            "Antes de invertir en tecnología, necesitas saber exactamente qué necesitas y por qué. Nos sentamos contigo a entender tu negocio, analizamos lo que ya tienes y te explicamos con claridad qué herramientas te convienen, cuánto costarán y cuánto tiempo tomará. Sin tecnicismos, sin sorpresas.",
        featuresTec: [
            "Auditoría de infraestructura y stack tecnológico",
            "Definición de arquitectura escalable",
            "Roadmap técnico priorizado",
            "Análisis de costos y estimación de esfuerzo",
        ],
        featuresCas: [
            "Diagnóstico claro de qué tecnología necesitas",
            "Explicación en lenguaje sencillo, sin jerga",
            "Plan de acción con tiempos y costos reales",
            "Acompañamiento en la toma de decisiones",
        ],
    },
    "desarrollo-web": {
        tagline: "Tu presencia digital, construida para durar",
        descTec:
            "Desarrollamos plataformas web con Next.js y React, con SSR, SSG y rendering híbrido según las necesidades del proyecto. Integramos APIs REST o GraphQL, implementamos autenticación segura, optimizamos Core Web Vitals y desplegamos en infraestructura cloud con CI/CD automatizado.",
        descCas:
            "Tu sitio web es tu carta de presentación: trabaja las 24 horas, llega a clientes que aún no te conocen y proyecta exactamente la imagen que tu negocio merece.Ya sea que partas de cero, quieras renovar lo que tienes, necesites mejorar algo específico de tu web actual o quieras implementarla, nos adaptamos a dónde estás. Sin importar con qué tecnología fue hecha antes, si alguien más la construyó o si nunca has tenido una: entramos, entendemos y trabajamos sobre eso.",
        featuresTec: [
            "Next.js con SSR, SSG y App Router",
            "Integración con APIs REST y GraphQL",
            "Optimización de Core Web Vitals y SEO técnico",
            "CI/CD y despliegue en Vercel, AWS o GCP",
        ],
        featuresCas: [
            "Diseño moderno adaptado a tu marca",
            "Optimizado para aparecer en Google",
            "Fácil de actualizar sin saber programar",
            "Rápido en cualquier dispositivo",
            "Compatible con lo que ya tengas o usemos desde cero"
        ],
    },
    "aplicaciones-moviles": {
        tagline: "Todo lo que necesitas, en el bolsillo.",
        descTec:
            "Construimos aplicaciones móviles con React Native para iOS y Android desde una sola base de código. Integramos push notifications, pagos in-app, autenticación biométrica, geolocalización y conexión con APIs externas. Gestionamos la publicación en App Store y Google Play.",
        descCas:
            "Hoy más que nunca, las personas hacen uso de su teléfono celular para cada una de sus tareas diarias, por lo que, la opción de tener una app móvil para tu negocio ya se trata de un lujo, si no, de una forma directa de llegar a tus clientes o de optimizar tiempos para tus trabajadores con sus labores.Con la versatilidad de hoy en día, ¡es posible hacer una app y más!, podemos hacer que esa app que tienes en mente funcione como quieras, ¡podemos vincularla con tus otros productos! ya sea una página web, un agente de IA que te ayude en el día a día contextualizado a tu negocio, bases de datos para guardar la información que necesites y más.",
        featuresTec: [
            "React Native para iOS y Android",
            "Push notifications y pagos in-app",
            "Autenticación biométrica y OAuth",
            "Publicación y gestión en tiendas",
        ],
        featuresCas: [
            "Disponible en App Store y Google Play",
            "Experiencia fluida en cualquier dispositivo",
            "Notificaciones para fidelizar clientes",
            "Integrable con herramientas que ya usas en tu negocio",
            "Sin importar si ya tienes algo avanzado o partes de cero"
        ],
    },
    "integracion-ia": {
        tagline: "Automatiza lo repetitivo, enfócate en lo importante",
        descTec:
            "Diseñamos e implementamos flujos de automatización con LLMs (OpenAI, Anthropic, modelos open source), RAG sobre datos propios, agentes con herramientas, clasificadores y sistemas de búsqueda semántica. Conectamos los modelos a tus datos y procesos reales mediante APIs y pipelines.",
        descCas:
            "La inteligencia artificial ya no es solo para grandes empresas. Hoy puede ayudarte a automatizar tareas, responder clientes, analizar información y optimizar procesos sin que necesites conocimientos técnicos.Nosotros entendemos cómo funciona tu negocio y aplicamos IA donde realmente aporte valor: en tu página web, app móvil, paneles de control o cualquier sistema que ya uses, incluso si no fue desarrollado por nosotros.Creamos soluciones personalizadas e integradas a lo que ya tienes, para que la tecnología trabaje a tu favor.",
        featuresTec: [
            "Integración con LLMs y APIs de IA",
            "RAG sobre documentos y datos propios",
            "Agentes y flujos de automatización",
            "Búsqueda semántica e indexación vectorial",
        ],
        featuresCas: [
            "Asistentes y agentes que atienden y responden por ti",
            "Automatización de tareas que hoy te consumen tiempo",
            "Análisis de datos para entender mejor tu negocio",
            "Integración con tus sistemas, plataformas o procesos actuales",
            "Sin necesidad de conocimientos técnicos de tu parte"
        ],
    },
    "seguridad-gestion": {
        tagline: "Protege lo que construiste",
        descTec:
            "Implementamos políticas de control de acceso, gestión de identidades (IAM), MDM para dispositivos corporativos, auditorías de seguridad, cifrado de datos en tránsito y en reposo, y cumplimiento de normativas. Definimos procesos de respuesta ante incidentes y recuperación.",
        descCas:
            "Tener un negocio digital no se trata solo de tener una web o una app: se trata de que todo funcione de forma segura, ordenada y sin sorpresas. La seguridad y la gestión no son temas solo para grandes empresas, son la base que protege tu trabajo, tus datos y la confianza de tus clientes.Ya sea que tengas un sistema propio, uses plataformas externas o simplemente quieras saber si lo que tienes está bien protegido, podemos ayudarte. No necesitas entender de ciberseguridad ni de infraestructura: nosotros revisamos, ordenamos y te explicamos en simple qué tienes, qué falta y qué hacemos al respecto.",
        featuresTec: [
            "Control de acceso y gestión de identidades",
            "MDM y gestión de dispositivos corporativos",
            "Auditorías de seguridad y pentest básico",
            "Planes de respuesta ante incidentes",
        ],
        featuresCas: [
            "Control de quién accede a tu información",
            "Respaldo y recuperación de datos",
            "Monitoreo para detectar problemas antes de que ocurran",
            "Revisión y mejora de lo que ya tienes implementado",
            "Asesoría clara, sin tecnicismos, sobre el estado de tu seguridad"
        ],
    },
    "Automatización": {
        tagline: "Lo que haces a mano hoy, puede hacerse solo mañana",
        descTec:
            "Diseñamos sistemas de diseño completos con componentes reutilizables, tokens de diseño y documentación. Realizamos investigación de usuarios, wireframing, prototipado en Figma y pruebas de usabilidad. Entregamos assets listos para desarrollo con especificaciones técnicas detalladas.",
        descCas:
            "Mensajes, pedidos, recordatorios, planillas, citas… muchas tareas repetitivas pueden automatizarse. No necesitas un gran sistema ni un equipo técnico para empezar.Analizamos cómo funciona tu negocio, detectamos qué te quita tiempo y creamos soluciones adaptadas a lo que ya usas: WhatsApp, correos, Excel, sistemas propios o incluso procesos manuales.Podemos automatizar tu negocio mediante páginas web, apps móviles o integraciones personalizadas, siempre buscando la solución más óptima para tu contexto.",
        featuresTec: [
            "Automatización de respuestas, notificaciones y recordatorios",
            "Integración entre herramientas que hoy no se comunican entre ",
            "Eliminación de procesos manuales y propensos a errores",
            "Compatible con las plataformas y apps que ya usas",
            "Soluciones a medida, desde flujos simples hasta procesos complejos"
        ],
        featuresCas: [
            "Automatización de respuestas, notificaciones y recordatorios",
            "Integración entre herramientas que hoy no se comunican entre ",
            "Eliminación de procesos manuales y propensos a errores",
            "Compatible con las plataformas y apps que ya usas",
            "Soluciones a medida, desde flujos simples hasta procesos complejos"
        ],
    },
    "devops-hosting": {
        tagline: "Tu negocio digital, siempre encendido y funcionando",
        descTec:
            "Diseñamos y operamos pipelines de CI/CD, gestionamos infraestructura como código con Terraform, configuramos monitoreo y alertas con Grafana/Datadog, implementamos estrategias de escalado automático y optimizamos costos en AWS, GCP o Azure.",
        descCas:
            "Detrás de toda web, app o sistema hay una infraestructura que lo mantiene funcionando: servidores, conexiones, actualizaciones, copias de seguridad, mucha palabrería técnica que no es necesario que te preocupes si tienes un buen equipo trabajando día a día en ello. Es invisible cuando funciona bien, y un dolor de cabeza cuando algo falla. Nosotros nos encargamos de eso.No necesitas saber qué es un servidor ni entender cómo se despliega una aplicación. Solo necesitas saber que lo que construiste está disponible, seguro y funcionando las 24 horas. Si ya tienes algo publicado en otro servicio o con otro equipo, también podemos tomarlo, revisarlo y dejarlo en orden.",
        featuresTec: [
            "CI/CD con GitHub Actions o GitLab",
            "Infraestructura como código con Terraform",
            "Monitoreo, alertas y observabilidad",
            "Escalado automático y optimización de costos",
        ],
        featuresCas: [
            "Tu web o app siempre disponible, sin caídas inesperadas",
            "Copias de seguridad automáticas para no perder nada",
            "Actualizaciones y mantenimiento sin que tengas que preocuparte",
            "Migración desde cualquier plataforma o proveedor anterior",
            "Escalable: si tu negocio crece, tu infraestructura crece con él"
        ],
    },
    "soporte-mantenimiento": {
        tagline: "Alguien en quien apoyarte cuando algo no funciona.",
        descTec:
            "Proporcionamos SLAs de disponibilidad, monitoreo proactivo, gestión de parches y actualizaciones de dependencias, corrección de bugs con priorización por impacto, mejoras continuas y soporte técnico con tiempo de respuesta definido según el plan contratado.",
        descCas:
            ": Tener una web, una app o un sistema es genial, hasta que algo deja de funcionar y no sabes a quién llamar. Ese momento de incertidumbre, de perder ventas o de no poder atender a tus clientes por un problema técnico, es exactamente lo que queremos evitarte.Con nosotros no termina la relación cuando entregamos el proyecto. Estamos disponibles para resolver dudas, corregir errores, hacer ajustes y asegurarnos de que lo que construimos siga funcionando bien con el tiempo. Y si llegaste con algo que hizo otro equipo y necesitas a alguien que lo mantenga, también podemos hacernos cargo.",
        featuresTec: [
            "SLAs de disponibilidad y tiempo de respuesta",
            "Monitoreo proactivo y gestión de alertas",
            "Actualizaciones de dependencias y parches",
            "Mejoras continuas con priorización ágil",
        ],
        featuresCas: [
            "Siempre hay alguien disponible para ayudarte",
            "Arreglamos problemas antes de que los notes",
            "Actualizaciones regulares sin que lo pidas",
            "Tu producto mejora con el tiempo",
        ],
    },
};