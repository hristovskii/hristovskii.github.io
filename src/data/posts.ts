export interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
}

export const posts: Post[] = [
  {
    slug: "hello-world",
    title: "Hello World",
    date: "2025-11-21",
    excerpt: "My first sample blog post for the new blog page.",
    content: `<p>This is a sample blog post. I need to replace this with real content or load markdown later.</p>`,
  },
  {
    slug: "learning-vue-3",
    title: "Learning Vue 3",
    date: "2025-10-05",
    excerpt: "Notes and tips while I learned Vue 3 and Composition API.",
    content: `<p>Composition API makes state and logic reuse easier. Here's a short list of tips:</p><ul><li>Prefer <code>ref</code> for primitives and <code>reactive</code> for objects.</li><li>Use <code>script setup</code> for concise single-file components.</li></ul>`,
  },
  {
    slug: "styling-with-tailwind",
    title: "Styling with Tailwind CSS",
    date: "2025-09-12",
    excerpt:
      "How I organize utility classes and theme tokens when using Tailwind.",
    content: `<p>Tailwind speeds up development. I like to create component-level classes and limit repeated utilities in templates.</p>`,
  },
  {
    slug: "deploying-to-gh-pages",
    title: "Deploying to GitHub Pages",
    date: "2025-08-30",
    excerpt: "Steps I used to deploy a Vite + Vue site to GitHub Pages.",
    content: `<p>Use <code>gh-pages</code> or configure the build output to the appropriate branch. Remember to set the <code>base</code> in Vite config if serving from a repo subpath.</p>`,
  },
];
