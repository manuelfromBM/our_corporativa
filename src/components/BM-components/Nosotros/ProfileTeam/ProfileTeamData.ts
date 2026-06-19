export type TeamMember = {
  slug: string;
  initials: string;
  img: string;
  alt: string;
  badge: string;
  name: string;
  role: string;
  tech: {
    bio: string;
    stats: { value: string; label: string }[];
    skills: string[];
    tools: string[];
  };
  biz: {
    bio: string;
    cards: { icon: string; title: string; desc: string }[];
  };
};

export const teamData: TeamMember[] = [
  {
    slug: "manuel",
    initials: "MD",
    img: "/BM-imagenes/BM_Team/manuel_ia.png",
    alt: "Foto de Manuel Díaz",
    badge: "Fundador",
    name: "Manuel Díaz",
    role: "Full Stack Developer & IA",
    tech: {
      bio: "Arquitecto principal de Krona y líder técnico del equipo. Diseñó la infraestructura del monorepo Turborepo, la API REST en NestJS y la integración de modelos de lenguaje con LangChain y LangGraph. Con experiencia en banca y fintech, construye sistemas confiables, auditables y escalables.",
      stats: [
        { value: "3+", label: "años experiencia" },
        { value: "3", label: "productos en producción" },
        { value: "FullStack + IA", label: "especialidad" },
      ],
      skills: [
        "NestJS", "React", "Next.js", "TypeScript", "Python",
        "FastAPI", "LangChain", "LangGraph", "React Native",
      ],
      tools: [
        "PostgreSQL", "Docker", "Render", "Vercel", "Prisma",
        "TensorFlow", "ChromaDB", "Turborepo", "GitHub Actions",
      ],
    },
    biz: {
      bio: "Manuel lidera el producto desde la visión hasta el deploy. Si necesitas un sistema que funcione de verdad — no solo una demo — él es quien lo hace posible.",
      cards: [
        {
          icon: "rocket",
          title: "Entrega productos completos",
          desc: "No solo código: diseña la arquitectura, construye el backend, conecta el frontend y deja todo corriendo en producción.",
        },
        {
          icon: "shield-check",
          title: "Experiencia en sectores exigentes",
          desc: "Ha trabajado en entornos bancarios con requerimientos AML, donde los errores cuestan caro. Esa mentalidad de rigor la aplica en cada proyecto.",
        },
        {
          icon: "brain",
          title: "IA integrada, no pegada",
          desc: "Integra inteligencia artificial de forma funcional dentro del flujo del negocio, no como un feature de marketing.",
        },
      ],
    },
  },
  {
    slug: "bastian",
    initials: "BM",
    img: "/",
    alt: "Foto de Manuel Díaz",
    badge: "Fundador",
    name: "Bastián Madrid",
    role: "Full Stack Developer & IA",
    tech: {
      bio: "Cofundador especializado en arquitectura de sistemas y desarrollo full stack. Trabaja codo a codo con Manuel en las decisiones técnicas de Krona, desde el diseño de la base de datos hasta la experiencia de usuario final.",
      stats: [
        { value: "4+", label: "años experiencia" },
        { value: "2", label: "startups construidas" },
        { value: "FullStack + IA", label: "especialidad" },
      ],
      skills: [
        "NestJS", "Next.js", "TypeScript", "Python",
        "React Native", "Django", "Node.js",
      ],
      tools: [
        "PostgreSQL", "Neon", "Docker", "Vercel",
        "Prisma", "LangChain", "GitHub Actions", "Redis",
      ],
    },
    biz: {
      bio: "Bastián convierte requerimientos de negocio en sistemas que escalan. Su foco está en que el producto crezca contigo, no que necesite ser reescrito cuando lleguen más usuarios.",
      cards: [
        {
          icon: "layers",
          title: "Sistemas que escalan",
          desc: "Diseña bases técnicas pensadas para crecer: desde 10 hasta 10.000 usuarios sin reescribir todo desde cero.",
        },
        {
          icon: "users",
          title: "Orientado al usuario final",
          desc: "Aunque es técnico, siempre tiene en mente cómo el usuario va a usar el producto. Eso reduce fricción y retrabajo.",
        },
        {
          icon: "plug",
          title: "Integración IA en flujos reales",
          desc: "Implementa IA donde agrega valor concreto: automatización, clasificación, resúmenes — no experimentos sin resultado.",
        },
      ],
    },
  },
  {
    slug: "cristian",
    initials: "CS",
    img: "/",
    alt: "Foto de Manuel Díaz",
    badge: "Cofundador",
    name: "Cristian San Martín",
    role: "Full Stack Developer",
    tech: {
      bio: "Desarrollador full stack con fuerte base en backend. Especialista en construir APIs robustas, modelar bases de datos relacionales y automatizar flujos de trabajo con lógica de negocio compleja.",
      stats: [
        { value: "3+", label: "años experiencia" },
        { value: "Backend", label: "especialidad" },
        { value: "APIs", label: "REST & integradas" },
      ],
      skills: [
        "Java", "Python", "TypeScript", "NestJS",
        "Spring Boot", "React", "Node.js",
      ],
      tools: [
        "PostgreSQL", "MySQL", "Docker", "Render",
        "Prisma", "Vercel", "Git", "DBeaver",
      ],
    },
    biz: {
      bio: "Cristian es el motor silencioso que hace que todo funcione por dentro. Si el sistema falla a las 2am, él ya lo solucionó antes de que lo notes.",
      cards: [
        {
          icon: "server",
          title: "Backend sólido y confiable",
          desc: "Construye la lógica que procesa pedidos, pagos, usuarios y datos — sin que el sistema se caiga en los momentos importantes.",
        },
        {
          icon: "database",
          title: "Datos bien organizados",
          desc: "Un buen modelo de datos evita dolores de cabeza futuros. Cristian diseña la base para que agregar nuevas funcionalidades sea fácil, no un caos.",
        },
        {
          icon: "clock",
          title: "Entregas consistentes",
          desc: "Metódico y preciso. Sus estimaciones son reales y su código pasa los tests. Menos sorpresas desagradables en producción.",
        },
      ],
    },
  },
  {
    slug: "matias",
    initials: "MP",
    img: "/",
    alt: "Foto de Manuel Díaz",
    badge: "Cofundador",
    name: "Matías Palma",
    role: "UI/UX Designer",
    tech: {
      bio: "Diseñador UI/UX responsable de la identidad visual de BMCodeLab y Krona. Trabaja con sistemas de diseño, componentes reutilizables y prototipado de alta fidelidad, asegurando consistencia entre diseño y desarrollo.",
      stats: [
        { value: "3+", label: "años experiencia" },
        { value: "UI/UX", label: "especialidad" },
        { value: "Design", label: "Systems" },
      ],
      skills: [
        "Figma", "Tailwind CSS", "HTML/CSS", "React",
        "Framer", "Illustrator", "Motion Design",
      ],
      tools: [
        "Figma", "Vercel", "Storybook", "GitHub",
        "Tailwind", "Adobe CC", "Lottie",
      ],
    },
    biz: {
      bio: "Matías hace que tu producto se vea profesional desde el primer día. La gente confía en los productos que se ven bien. Él se asegura de que el tuyo genere esa confianza.",
      cards: [
        {
          icon: "eye",
          title: "Primera impresión que vende",
          desc: "Un diseño limpio y profesional genera confianza instantánea. Matías diseña interfaces que hacen que los clientes quieran quedarse.",
        },
        {
          icon: "device-mobile",
          title: "Experiencias para todos los dispositivos",
          desc: "El diseño funciona en móvil, tablet y desktop — porque tus clientes usan todos ellos.",
        },
        {
          icon: "palette",
          title: "Identidad visual coherente",
          desc: "Logo, colores, tipografía y componentes que hablan el mismo idioma. Una marca que se recuerda.",
        },
      ],
    },
  },
];

export const teamSlugs = teamData.map((m) => m.slug);

export function getMemberBySlug(slug: string): TeamMember | undefined {
  return teamData.find((m) => m.slug === slug);
}