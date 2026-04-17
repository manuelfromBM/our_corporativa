export interface ServicioContenido {
  titulo: string;
  desc: string;
}

export interface Servicio {
  num: string;
  icon: string;
  accentColor: string;
  tec: ServicioContenido;
  cas: ServicioContenido;
}

const SERVICIOS: Servicio[] = [
  {
    num: "01",
    icon: "💡",
    accentColor: "#a78bfa",
    tec: {
      titulo: "Consultoría Técnica",
      desc: "Auditoría de infraestructura, arquitectura de sistemas distribuidos y roadmap tecnológico alineado a tu stack actual.",
    },
    cas: {
      titulo: "Te ayudamos a decidir",
      desc: "Te explicamos qué tecnología necesitas, cuánto cuesta y por qué, sin complicaciones técnicas.",
    },
  },
  {
    num: "02",
    icon: "</>",
    accentColor: "#818cf8",
    tec: {
      titulo: "Desarrollo Web",
      desc: "Arquitecturas JAMstack, SSR con Next.js, APIs REST/GraphQL y pipelines CI/CD sobre Vercel o AWS.",
    },
    cas: {
      titulo: "Tu página o tienda online",
      desc: "Creamos tu sitio web desde cero: moderno, rápido y fácil de actualizar, sin que tengas que saber de código.",
    },
  },
  {
    num: "03",
    icon: "📱",
    accentColor: "#34d399",
    tec: {
      titulo: "Aplicaciones Móviles",
      desc: "Apps nativas y cross-platform con React Native, integración con APIs REST, push notifications y App Store deployment.",
    },
    cas: {
      titulo: "Tu app para iOS y Android",
      desc: "Lanzamos tu aplicación en ambas tiendas. Tus clientes la descargan y la usan, sin complicaciones.",
    },
  },
  {
    num: "04",
    icon: "AI",
    accentColor: "#f472b6",
    tec: {
      titulo: "Integración de IA",
      desc: "Pipelines RAG con LLMs (OpenAI, Anthropic), vector search con Pinecone o pgvector, y fine-tuning sobre datos propios.",
    },
    cas: {
      titulo: "Automatización inteligente",
      desc: "Tu negocio trabaja solo: responde clientes, clasifica documentos o genera reportes sin esfuerzo humano.",
    },
  },
  {
    num: "05",
    icon: "🛡",
    accentColor: "#60a5fa",
    tec: {
      titulo: "Seguridad y MDM",
      desc: "Gestión de flotas con Microsoft Intune/Jamf, políticas de compliance, Zero Trust y auditorías BYOD.",
    },
    cas: {
      titulo: "Protege tu empresa",
      desc: "Controlamos quién accede a qué en tu empresa, desde cualquier dispositivo, y mantenemos tus datos seguros.",
    },
  },
  {
    num: "06",
    icon: "UI",
    accentColor: "#fb923c",
    tec: {
      titulo: "UX/UI",
      desc: "Diseñamos sistemas en Figma, componentes con Storybook, para conseguir interfaces intuitivas centradas en el usuario.",
    },
    cas: {
      titulo: "Diseño que enamora",
      desc: "Creamos interfaces bonitas e intuitivas para que tus usuarios disfruten cada pantalla de tu producto.",
    },
  },
  {
    num: "07",
    icon: "☁",
    accentColor: "#2dd4bf",
    tec: {
      titulo: "DevOps & Hosting",
      desc: "Diseño, provisioning y operación de infraestructura a escala: orquestación de contenedores, pipelines CI/CD, IaC, observabilidad full-stack y estrategias de alta disponibilidad con SLA garantizado.",
    },
    cas: {
      titulo: "Tu web siempre disponible",
      desc: "Nos encargamos de que tu sitio nunca caiga, cargue rápido y escale solo cuando tengas mucho tráfico.",
    },
  },
  {
    num: "08",
    icon: "⚙",
    accentColor: "#94a3b8",
    tec: {
      titulo: "Soporte & Mantenimiento",
      desc: "Monitoreo proactivo, gestión de incidentes con respuesta on-call 24/7, parches de seguridad y actualizaciones continuas.",
    },
    cas: {
      titulo: "Siempre estamos contigo",
      desc: "Te acompañamos después del lanzamiento: arreglamos problemas, mejoramos y actualizamos tu producto.",
    },
  },
];

export default SERVICIOS