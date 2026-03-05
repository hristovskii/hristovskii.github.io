<template>
  <section class="relative z-20 mx-auto max-w-4xl px-4 py-12 sm:py-16">
    <nav class="mb-6 rounded-xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 p-4" aria-label="Breadcrumb">
      <ol class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
        <li><router-link to="/" class="hover:underline">Home</router-link></li>
        <li class="text-gray-400">/</li>
        <li><router-link to="/blog" class="hover:underline">Blog</router-link></li>
        <li class="text-gray-400">/</li>
        <li class="font-medium">{{ post ? post.title : 'Post' }}</li>
      </ol>
    </nav>

    <div class="mb-6 flex items-center justify-between">
      <div class="text-sm text-gray-500">{{ post ? readingTime(post.content) + ' min read' : '' }}</div>

      <div class="flex items-center gap-3">
        <button @click="goBack" aria-label="Go back" title="Go back" class="inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium  border hover:shadow transition">Back</button>
      </div>
    </div>

    <div v-if="post">
      <header class="mb-8">
        <p class="text-sm uppercase tracking-wide text-purple-500">{{ post.date }}</p>
        <h1 class="mt-2 text-4xl font-extrabold leading-tight">{{ post.title }}</h1>
      </header>

      <figure class="mb-8 overflow-hidden rounded-3xl border border-gray-200/60 dark:border-gray-800/60">
        <img
          :src="post.image"
          :alt="post.title"
          class="h-64 w-full object-cover sm:h-[26rem]"
          loading="lazy"
        />
      </figure>

      <article class="prose max-w-none dark:prose-invert" v-html="post.content"></article>

      <footer class="mt-12 border-t pt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div class="w-full sm:w-auto">
          <router-link
            v-if="prevPost"
            :to="`/blog/${prevPost.slug}`"
            class="inline-flex items-center gap-2 px-4 py-2 border rounded-lg text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            aria-label="Previous post"
            >
            ← <span class="max-w-xs truncate">{{ prevPost.title }}</span>
          </router-link>
        </div>

        <div class="w-full text-right sm:w-auto">
          <router-link
            v-if="nextPost"
            :to="`/blog/${nextPost.slug}`"
            class="inline-flex items-center gap-2 px-4 py-2 border rounded-lg text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            aria-label="Next post"
            >
            <span class="max-w-xs truncate">{{ nextPost.title }}</span> →
          </router-link>
        </div>
      </footer>
    </div>
    <div v-else>
      <p>Post not found.</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { posts } from '../data/posts'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const slug = computed(() => String(route.params.slug || ''))

const post = computed(() => posts.find(p => p.slug === slug.value) ?? null)

// prev / next (reactive to slug)
const idx = computed(() => posts.findIndex(p => p.slug === slug.value))
const prevPost = computed(() => (idx.value > 0 ? posts[idx.value - 1] : null))
const nextPost = computed(() => (idx.value >= 0 && idx.value < posts.length - 1 ? posts[idx.value + 1] : null))

const goBack = () => {
  if (window.history.length > 1) router.back()
  else router.push('/blog')
}

const readingTime = (html: string) => {
  if (!html) return 1
  const text = html.replace(/<[^>]*>/g, '')
  const words = text.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(words / 200))
}

onMounted(() => {})
</script>

<style scoped>
</style>
