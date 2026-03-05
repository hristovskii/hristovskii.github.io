export type ProjectCategory = "Web" | "Mobile" | "Game" | "Other";

export interface Project {
  title: string;
  description: string;
  technologies: string[];
  link: string;
  code?: string;
  category: ProjectCategory;
}

export const projects: Project[] = [
  {
    title: "kodrum.mk",
    description:
      "Boost your career with our education, designed to bring you one step closer!",
    technologies: ["NextJS", "Tailwind CSS", "Strapi CMS"],
    link: "https://www.kodrum.mk/",
    // code: "https://github.com/hristovskii/ydf.mk",
    category: "Web",
  },
  {
    title: "YDF.MK",
    description:
      "A community that supports youth from diverse family backgrounds in North Macedonia through various activities and initiatives.",
    technologies: ["NextJS", "Tailwind CSS", "Strapi CMS"],
    link: "https://www.ydf.mk/",
    code: "https://github.com/hristovskii/ydf.mk",
    category: "Web",
  },
  {
    title: "Twinkle Quote",
    description:
      "A calm quotes app that fetches inspirational quotes, lets users save favorites locally, and supports dark/light mode. No ads. No tracking.",
    technologies: ["Flutter", "ZenQuotes API"],
    link: "https://twinkle.pedzo.xyz/",
    code: "https://github.com/hristovskii/Twinkle-Quote-App",
    category: "Mobile",
  },
  {
    title: "Be My Valentine",
    description:
      "A web application that asks my beatiful girlfriend to be my Valentine without letting her say no.",
    technologies: ["HTML", "CSS", "JavaScript"],
    link: "https://be-my-valentine.pedzo.xyz/",
    code: "https://github.com/hristovskii/will-you-be-my-valentine",
    category: "Web",
  },
  {
    title: "EESTEC LC Skopje Website",
    description: "EESTEC LC Skopje Official website.",
    technologies: ["Next.js", "Tailwind CSS", "MariaDB"],
    link: "https://eestec.mk/",
    code: "https://github.com/eestec-sk/eestec.mk",
    category: "Web",
  },
  {
    title: "Calendex",
    description:
      "Calendex is a web application that allows users to import and view events from multiple Google, Outlook, or Apple calendars in one unified calendar, for better scheduling and planning.",
    technologies: ["Vue.js", "Tailwind CSS", "Shadcn UI"],
    link: "",
    code: "https://github.com/hristovskii/calendex",
    category: "Web",
  },
  {
    title: "Green Leaf Labs",
    description: "Website for selling microgreens.",
    technologies: ["Next.js", "Tailwind CSS"],
    link: "",
    code: "https://github.com/hristovskii/green-leaf-labs",
    category: "Web",
  },
  {
    title: "Back 2 Bacics",
    description:
      "Webiste for marketing a event for a local students organization.",
    technologies: ["Next.js", "Tailwind CSS"],
    link: "",
    code: "https://github.com/hristovskii/b2b",
    category: "Web",
  },
  {
    title: "Portfolio Website",
    description: "A minimalist portfolio website.",
    technologies: ["Vue.js", "Tailwind CSS", "Vite"],
    link: "https://www.pedzo.xyz/",
    code: "https://github.com/hristovskii/hristovskii.github.io",
    category: "Web",
  },
  {
    title: "Old Portfolio Website",
    description: "A womework that turned in a portfolio website.",
    technologies: ["HTML", "CSS", "JavaScript"],
    link: "",
    code: "https://github.com/hristovskii/v1.hristovskii.github.io",
    category: "Web",
  },
  {
    title: "Brat za brat, Ljuben za pivo",
    description:
      "Si bese ednas i samo ednas eden Ljuben sto sakase da pie mnogu pivo. Tolku mnogu sakase da pie sto drugarite napravija igra vo negova chest.",
    technologies: ["Unity", "ITCH.IO", "2D"],
    link: "https://pedzo.itch.io/brat-za-brat-pivo-za-ljuben",
    category: "Game",
  },
  {
    title: "flappy-ljuben-game",
    description:
      "Si beshe ednas eden ljuben sto sakase da pie mnogu pivo, drugarite mu napravija USTE EDNA igra vo negova chest. ",
    technologies: ["Unity", "ITCH.IO", "2D", "Mobile"],
    link: "https://pedzo.itch.io/flappy-ljuben-game",
    category: "Game",
  },
];
