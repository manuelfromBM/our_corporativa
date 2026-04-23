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
    icon: "IA",
    accentColor: "#00c896",
    tec: {
      titulo: "Consultoria tecnica",
      desc: "Auditoria de infraestructura, arquitectura de sistemas y definicion de roadmap tecnologico alineado a tu stack actual.",
    },
    cas: {
      titulo: "Te ayudamos a decidir",
      desc: "Te explicamos que tecnologia necesitas, cuanto cuesta y por que, sin complicaciones tecnicas.",
    },
  },
  {
    num: "02",
    icon: "</>",
    accentColor: "#aaff00",
    tec: {
      titulo: "Desarrollo web",
      desc: "Construimos plataformas con Next.js, APIs modernas, integraciones y despliegues optimizados para velocidad y escalabilidad.",
    },
    cas: {
      titulo: "Tu pagina o tienda online",
      desc: "Creamos tu sitio web desde cero: moderno, rapido y facil de actualizar, sin que tengas que saber de codigo.",
    },
  },
  {
    num: "03",
    icon: "APP",
    accentColor: "#007a50",
    tec: {
      titulo: "Aplicaciones moviles",
      desc: "Apps nativas y cross-platform con React Native, integracion con APIs, notificaciones y publicacion en tiendas.",
    },
    cas: {
      titulo: "Tu app para iOS y Android",
      desc: "Lanzamos tu aplicacion en ambas tiendas para que tus clientes la descarguen y la usen sin fricciones.",
    },
  },
  {
    num: "04",
    icon: "AI",
    accentColor: "#7acc00",
    tec: {
      titulo: "Integracion de IA",
      desc: "Automatizaciones, asistentes, busqueda inteligente y flujos con LLMs conectados a datos y procesos reales.",
    },
    cas: {
      titulo: "Automatizacion inteligente",
      desc: "Tu negocio puede responder clientes, clasificar documentos o generar reportes sin esfuerzo manual repetitivo.",
    },
  },
  {
    num: "05",
    icon: "SEC",
    accentColor: "#00d6a0",
    tec: {
      titulo: "Seguridad y gestion",
      desc: "Control de acceso, politicas de seguridad, gestion de dispositivos y buenas practicas para proteger tus datos.",
    },
    cas: {
      titulo: "Protege tu empresa",
      desc: "Controlamos quien accede a que en tu empresa y mantenemos tus datos y dispositivos mas seguros.",
    },
  },
  {
    num: "06",
    icon: "UI",
    accentColor: "#8cff4f",
    tec: {
      titulo: "UX y UI",
      desc: "Disenamos experiencias digitales claras, sistemas visuales consistentes y flujos centrados en el usuario.",
    },
    cas: {
      titulo: "Diseno que convence",
      desc: "Creamos interfaces bonitas e intuitivas para que tus usuarios disfruten cada parte de tu producto.",
    },
  },
  {
    num: "07",
    icon: "DEV",
    accentColor: "#11b886",
    tec: {
      titulo: "DevOps y hosting",
      desc: "Infraestructura, CI/CD, observabilidad, automatizacion de despliegues y entornos listos para crecer sin dolor.",
    },
    cas: {
      titulo: "Tu web siempre disponible",
      desc: "Nos encargamos de que tu sitio cargue rapido, no se caiga y escale cuando tu negocio crezca.",
    },
  },
  {
    num: "08",
    icon: "OPS",
    accentColor: "#3a6048",
    tec: {
      titulo: "Soporte y mantenimiento",
      desc: "Monitoreo, mejoras continuas, parches, correccion de incidentes y acompanamiento tecnico despues del lanzamiento.",
    },
    cas: {
      titulo: "Siempre estamos contigo",
      desc: "Te acompanamos despues de publicar: arreglamos problemas, mejoramos y actualizamos tu producto.",
    },
  },
];

export default SERVICIOS;
