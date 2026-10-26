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
    experience?: { company: string; role: string; period: string; description: string }[];
    education?: { institution: string; degree: string; period: string }[];
    stats: { value: string; label: string }[];
    skills: string[];
    libraries?: { category: string; items: string[] }[];
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
      experience: [
        {
          company: "Scotiabank",
          role: "Ingeniero de Datos Senior",
          period: "Actualidad",
          description: "Área MIS AML BRM, diseñando y manteniendo procesos de datos para la prevención de lavado de activos y la gestión de riesgo del banco.",
        },
        {
          company: "BMCodeLab",
          role: "Full Stack Developer & IA · Fundador",
          period: "Actualidad",
          description: "Desarrollo de productos propios como Krona y Posteate, liderando la arquitectura, el backend y la integración de IA de ambos proyectos.",
        },
      ],
      education: [
        {
          institution: "Duoc UC",
          degree: "Ingenieria Informatica Especialización en Ciencia de Datos",
          period: "2021 - 2025",
        },
      ],
      stats: [
        { value: "3+", label: "años experiencia" },
        { value: "3", label: "productos en producción" },
        { value: "FullStack + IA", label: "especialidad" },
      ],
      skills: [
        "NestJS", "React", "Next.js", "TypeScript", "Python",
        "FastAPI", "LangChain", "LangGraph", "React Native",
      ],
      libraries: [
        {
          category: "Full Stack (TypeScript)",
          items: ["Axios", "Zod", "TanStack Query", "Day.js"],
        },
        {
          category: "Ciencia de Datos (Python)",
          items: ["Pandas", "NumPy", "Matplotlib"],
        },
        {
          category: "IA & Machine Learning",
          items: ["TensorFlow", "Scikit-learn", "PyTorch"],
        },
        {
          category: "Otros",
          items: ["GraphQL", "LangChain", "LangGraph", "Socket.IO"],
        },
      ],
      tools: [
        "PostgreSQL", "Docker", "Render", "Vercel", "Prisma",
        "TensorFlow", "ChromaDB", "Turborepo", "GitHub Actions",
        "SQL Server", "PowerShell", "Claude Code", "Codex", "Cursor",
      ],
    },
    biz: {
      bio: "Manuel combina dos mundos: el rigor de la banca y la ejecución ágil de un fundador. En Scotiabank trabaja con datos y procesos donde un error se traduce en riesgo real para el banco y sus clientes; en BMCodeLab aplica esa misma disciplina para lanzar y escalar productos digitales propios. Esa doble mirada — control y velocidad — es la que trae a cada proyecto.",
      cards: [
        {
          icon: "shield-check",
          title: "Banca y cumplimiento (Scotiabank)",
          desc: "En el área MIS AML BRM participa en procesos de onboarding, offboarding, KYC, cash control, FCC y DDM. Trabajar con esa exigencia le dio una vara alta para validar datos, documentar procesos y anticipar riesgos antes de que se conviertan en un problema.",
        },
        {
          icon: "rocket",
          title: "SaaS de punta a punta (Krona y Posteate)",
          desc: "En BMCodeLab diseñó la arquitectura, lidera el equipo y programa backend y frontend de Krona y Posteate, dos marketplaces de servicios. No delega ninguna etapa: desde la base de datos hasta la pantalla que ve el usuario final pasa por sus manos.",
        },
        {
          icon: "brain",
          title: "Visión de negocio, no solo código",
          desc: "Además de construir el software, define el modelo de negocio de cada producto: cómo se monetiza, quién es el cliente y qué problema resuelve. Esa mezcla de criterio técnico y comercial evita construir features que nadie necesita.",
        },
      ],
    },
  },
  {
    slug: "bastian",
    initials: "BM",
    img: "/BM-imagenes/BM_Team/bastian_ai.png",
    alt: "Foto de Bastián Madrid",
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
    img: "/BM-imagenes/BM_Team/sanma_ia.png",
    alt: "Foto de Cristian San Martín",
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
  slug: "byron",
  initials: "BS",
  img: "/BM-imagenes/BM_Team/byron_ia.png",
  alt: "Foto de Byron Santis Salgado",
  badge: "Cofundandor Tardio",
  name: "Byron Santis",
  role: "Full Stack Developer & Soporte TI",
  tech: {
    bio: "Ingeniero en Informática apasionado por la tecnología, el aprendizaje continuo y la mejora constante. Me destaco por mi compromiso, responsabilidad y dedicación al trabajo. Disfruto resolver problemas, trabajar en equipo y aportar soluciones que marquen la diferencia. Siempre estoy buscando nuevos desafíos que me permitan crecer personal y profesionalmente.",
    experience: [
      {
        company: "Banco Itaú",
        role: "Programador Front End (Práctica profesional)",
        period: "Diciembre 2022 - Febrero 2023",
        description: "Desarrollé aplicaciones web responsivas aplicando buenas prácticas con HTML5, CSS3, JavaScript, TypeScript y el framework React + Vite.",
      },
      {
        company: "Freelancer",
        role: "Programador Full Stack",
        period: "Junio 2023 - 2025",
        description: "Diseñé y desarrollé soluciones web y móviles para pequeñas empresas, utilizando distintas tecnologías para apoyar su crecimiento y digitalización.",
      },
      {
        company: "Colegio San Manuel",
        role: "Soporte Técnico",
        period: "Diciembre 2024 - Marzo 2025",
        description: "Brindé soporte técnico para equipos: diagnóstico, configuración, instalación de software y mantenimiento general.",
      },
      {
        company: "The Legal Industry",
        role: "Programador Full Stack",
        period: "Octubre 2025 - Junio 2026",
        description: "Desarrollé con mi equipo un buscador con inteligencia artificial utilizando Java, JavaScript, Node.js, React y Vite, orientado al sector legal para la búsqueda y registro de firmas de abogados. Integré OpenAI para funcionalidades inteligentes y AWS para bases de datos y despliegue en la nube.",
      },
    ],
    education: [
      {
        institution: "Duoc UC",
        degree: "Ingeniería en Informática · Certificado en Calidad de Software",
        period: "Marzo 2019 - Diciembre 2022",
      },
    ],
    stats: [
      { value: "3+", label: "años experiencia" },
      { value: "4", label: "experiencias laborales" },
      { value: "FullStack", label: "especialidad" },
    ],
    skills: [
      "HTML",
      "JavaScript",
      "TypeScript",
      "Python",
      "Java",
      "PHP",
      "Django",
      "Vite",
      "Next.js",
      "Vue",
      "React",
      "AWS",
      "Git",
      "API REST",
      "Visual Studio Code",
      "Antigravity",
      "Postman",
      "Jest",
      "Microsoft Office",
      "SQL Server",
      "SQLite",
      "MongoDB",
      "MySQL",
      "Firebase",
      "Express.js",
      "Node.js",
      "Endpoints",
    ],
    libraries: [
      {
        category: "Lenguajes de programación",
        items: [
          "HTML",
          "JavaScript",
          "TypeScript",
          "Python",
          "Java",
          "PHP",
        ],
      },
      {
        category: "Frameworks",
        items: [
          "Django",
          "Vite",
          "Next.js",
          "Vue",
          "React",
        ],
      },
      {
        category: "Desarrollo y herramientas",
        items: [
          "Node.js",
          "Express.js",
          "API REST",
          "Endpoints",
          "Git",
          "Visual Studio Code",
          "Antigravity",
          "Postman",
          "Jest",
        ],
      },
      {
        category: "Bases de datos y servicios",
        items: [
          "SQL Server",
          "SQLite",
          "MongoDB",
          "MySQL",
          "Firebase",
          "AWS",
        ],
      },
      {
        category: "Diseño y estilos",
        items: [
          "HTML",
          "CSS",
        ],
      },
    ],
    tools: [
      "React",
      "AWS",
      "Git",
      "Visual Studio Code",
      "Antigravity",
      "Postman",
      "Jest",
      "Microsoft Office",
      "SQL Server",
      "SQLite",
      "MongoDB",
      "MySQL",
      "Firebase",
      "Express.js",
      "Node.js",
    ],
  },
  biz: {
    bio: "Byron Santis Salgado es Ingeniero en Informática apasionado por la tecnología y el desarrollo web. Su enfoque está en crear páginas web personalizadas, adaptadas a las necesidades, objetivos e identidad de cada proyecto, buscando entregar soluciones funcionales, modernas y con una buena experiencia de usuario.",
    cards: [
      {
        icon: "code",
        title: "Páginas web personalizadas",
        desc: "Desarrollo de sitios web a medida, diseñados según las necesidades de cada proyecto, con una identidad visual propia y una estructura pensada para presentar tu negocio, servicio o marca de manera profesional.",
      },
      {
        icon: "rocket",
        title: "Desarrollo web moderno",
        desc: "Uso de tecnologías como React, Next.js, JavaScript, TypeScript y CSS para construir experiencias web modernas, responsivas y adaptadas a distintos dispositivos.",
      },
      {
        icon: "target",
        title: "Soluciones a medida",
        desc: "Cada proyecto tiene objetivos diferentes. Por eso, el desarrollo se enfoca en crear soluciones personalizadas, cuidando los detalles visuales, la funcionalidad y las necesidades específicas de cada cliente.",
      },
    ],
  },
},

];

export const teamSlugs = teamData.map((m) => m.slug);

export function getMemberBySlug(slug: string): TeamMember | undefined {
  return teamData.find((m) => m.slug === slug);
}