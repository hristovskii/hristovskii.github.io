<template>
  <section class="relative z-20 mx-auto max-w-6xl px-4 py-12 sm:py-16">
    <nav class="mb-8 rounded-xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 p-4 text-sm text-gray-600 dark:text-gray-300" aria-label="Breadcrumb">
      <ol class="flex items-center gap-2">
        <li><router-link to="/" class="hover:underline">Home</router-link></li>
        <li class="text-gray-400">/</li>
        <li class="font-medium">Blog</li>
      </ol>
    </nav>

    <div class="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p class="text-sm uppercase tracking-wide text-purple-500">Stories & Notes</p>
        <h2 class="text-4xl font-extrabold">My (Fake) Blog</h2>
        <p class="mt-2 text-gray-600 dark:text-gray-300 max-w-2xl">Quick thoughts on dev life, tooling experiments, and random things that keep me up at 2AM.</p>
      </div>
      <button @click="goBack" aria-label="Go back" title="Go back" class="self-start inline-flex items-center gap-2 rounded-md px-5 py-2 text-sm font-medium bg-white dark:bg-gray-900 border hover:shadow transition">Back</button>
    </div>

    <div class="space-y-8">
      <article
        v-for="post in posts"
        :key="post.slug"
        class="rounded-2xl border border-gray-200/60 dark:border-gray-800/60 bg-white/70 dark:bg-gray-900/60 shadow-sm hover:shadow-xl transition"
      >
        <div class="flex flex-col gap-6 p-6 md:flex-row">
          <router-link
            :to="`/blog/${post.slug}`"
            class="block overflow-hidden rounded-xl md:w-2/5"
          >
            <img
              :src="post.image"
              :alt="post.title"
              loading="lazy"
              class="h-48 w-full object-cover transition duration-300 hover:scale-105 md:h-full"
            />
          </router-link>

          <div class="flex flex-1 flex-col gap-4">
            <div class="flex flex-wrap items-center gap-3 text-xs uppercase tracking-wide text-gray-500">
              <span class="rounded-full bg-gray-100/70 px-3 py-1 dark:bg-gray-800/80">
                {{ readingTime(post.content) }} min read
              </span>
              <span>{{ post.date }}</span>
            </div>

            <div>
              <router-link :to="`/blog/${post.slug}`" class="block">
                <h3 class="text-2xl font-semibold text-gray-900 dark:text-gray-100 hover:text-purple-600 transition">
                  {{ post.title }}
                </h3>
              </router-link>
              <p class="mt-3 text-base text-gray-600 dark:text-gray-300">{{ post.excerpt }}</p>
            </div>

            <div class="mt-auto flex items-center justify-between text-sm">
              <router-link :to="`/blog/${post.slug}`" class="font-semibold text-purple-600 hover:text-purple-400">Read article →</router-link>
              <span class="text-gray-500">Updated weekly-ish</span>
            </div>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import { posts } from '../data/posts'
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  if (window.history.length > 1) router.back()
  else router.push('/')
}

const readingTime = (html: string) => {
  if (!html) return 1
  const text = html.replace(/<[^>]*>/g, '')
  const words = text.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(words / 200))
}
</script>

<style scoped>
</style>

