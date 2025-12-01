<template>
  <main class="relative z-20 mx-auto max-w-4xl px-4 py-12 sm:py-16">
    <about-section
      ref="aboutSection"
      id="about"
      :is-dark-mode="isDarkMode"
      :section-state="sectionStates.about"
      @toggle="toggleSection('about')"
    />

    <skills-section
      ref="skillsSection"
      id="skills"
      :is-dark-mode="isDarkMode"
      :section-state="sectionStates.skills"
      @toggle="toggleSection('skills')"
    />

    <projects-section
      ref="projectsSection"
      id="projects"
      :is-dark-mode="isDarkMode"
      :section-state="sectionStates.projects"
      @toggle="toggleSection('projects')"
    />
  </main>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import AboutSection from '../components/AboutSection.vue'
import SkillsSection from '../components/SkillsSection.vue'
import ProjectsSection from '../components/ProjectsSection.vue'

const isDarkMode = ref(true)

// Section collapse state
const sectionStates = reactive({
  about: true,
  skills: true,
  projects: true
})

const toggleSection = (section: 'about' | 'skills' | 'projects') => {
  sectionStates[section] = !sectionStates[section]
}

const aboutSection = ref(null)
const skillsSection = ref(null)
const projectsSection = ref(null)

onMounted(() => {
  const setupSectionObservers = () => {
    const options = { threshold: 0.2, rootMargin: '0px 0px -100px 0px' }
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('section-visible')
      })
    }, options)

    const aboutEl = document.getElementById('about')
    const skillsEl = document.getElementById('skills')
    const projectsEl = document.getElementById('projects')

    if (aboutEl) sectionObserver.observe(aboutEl)
    if (skillsEl) sectionObserver.observe(skillsEl)
    if (projectsEl) sectionObserver.observe(projectsEl)
  }

  setupSectionObservers()
})
</script>

<style scoped>
</style>
