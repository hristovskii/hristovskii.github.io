<template>
  <section class="relative z-20 mx-auto max-w-4xl px-4 py-12 sm:py-16">
    <nav class="mb-4 text-sm text-gray-500" aria-label="Breadcrumb">
      <router-link to="/" class="hover:underline">Home</router-link>
      <span class="mx-2">/</span>
      <span class="font-medium">Blog</span>
    </nav>

    <div class="flex items-center justify-between mb-6">
      <h2 class="text-3xl font-semibold">My (Fake) Blog</h2>
        <div class="flex items-center gap-3">
          <button @click="goBack" aria-label="Go back" title="Go back" class="inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium border hover:shadow transition">Back</button>
        </div>
    </div>

    <div class="space-y-6">
      <article v-for="post in posts" :key="post.slug" class="p-4 rounded-lg border">
        <h3 class="text-xl font-medium mb-1">
          <router-link :to="`/blog/${post.slug}`" class="hover:underline">{{ post.title }}</router-link>
        </h3>
        <p class="text-sm text-gray-500 mb-2">{{ post.date }}</p>
        <p class="text-base mb-2">{{ post.excerpt }}</p>
        <router-link :to="`/blog/${post.slug}`" class="text-sm text-purple-600">Read more →</router-link>
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

const recent = posts.slice(0, 5)

const readingTime = (html: string) => {
  const text = html.replace(/<[^>]*>/g, '')
  const words = text.trim().split(/\s+/).length
  return Math.max(1, Math.ceil(words / 200))
}
</script>

<style scoped>
</style>

