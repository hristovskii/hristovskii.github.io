<template>
  <div :class="['relative min-h-screen w-full overflow-x-hidden font-mono', isDarkMode ? 'text-gray-100' : 'text-gray-800']">
    <!-- Animated Blob Background -->
    <div class="absolute inset-0 z-0">
      <canvas ref="blobCanvas" class="h-full w-full"></canvas>
    </div>

    <!-- Content Overlay -->
    <div :class="['absolute inset-0 z-10 backdrop-blur-[2px]', isDarkMode ? 'bg-gradient-to-b from-purple-900/20 to-indigo-900/40' : 'bg-white']"></div>

    <!-- Theme Toggle and Back to Top -->
    <div class="fixed top-4 right-4 z-50 flex gap-3">
      <button 
        @click="toggleTheme" 
        class="rounded-full p-2 backdrop-blur-md transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-violet-400" 
        :class="isDarkMode ? 'bg-purple-900/50' : 'bg-white/70'">
        <Sun v-if="isDarkMode" class="h-5 w-5" />
        <Moon v-else class="h-5 w-5" />
        <span class="sr-only">Toggle theme</span>
      </button>
      <button 
        @click="scrollToTop" 
        class="rounded-full p-2 backdrop-blur-md transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-violet-400" 
        :class="isDarkMode ? 'bg-purple-900/50' : 'bg-white/70'">
        <ArrowUp class="h-5 w-5" />
        <span class="sr-only">Back to top</span>
      </button>
    </div>

    <!-- Main Content -->
    <div class="relative z-20 mx-auto max-w-4xl px-4 py-12 sm:py-16">
      <header-section 
        ref="headerSection"
        id="home"
        :is-dark-mode="isDarkMode"
      />

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

      <!-- Footer with Parallax -->
      <footer id="footer" class="mt-20 mb-10 text-center text-sm parallax-section" data-speed="0.02" :class="isDarkMode ? 'text-gray-400' : 'text-gray-600'">
        <p>© 2025 pedzo. All rights reserved, jk you can copy the source code :kiss_emoji:</p>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { Sun, Moon, ArrowUp } from 'lucide-vue-next';

// Import components
import HeaderSection from './components/HeaderSection.vue';
import AboutSection from './components/AboutSection.vue';
import SkillsSection from './components/SkillsSection.vue';
import ProjectsSection from './components/ProjectsSection.vue';

// Theme state
const isDarkMode = ref(true);

const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value;
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

// Section collapse state
const sectionStates = reactive({
  about: true, // Open by default
  skills: true, // Open by default
  projects: true // Open by default
});

// Component refs
const headerSection = ref(null);
const aboutSection = ref(null);
const skillsSection = ref(null);
const projectsSection = ref(null);

// Canvas reference
const blobCanvas = ref(null);

const toggleSection = (section: 'about' | 'skills' | 'projects') => {
  sectionStates[section] = !sectionStates[section];
};


onMounted(() => {

  // Set up section observers
  const setupSectionObservers = () => {
    const options = {
      threshold: 0.2,
      rootMargin: '0px 0px -100px 0px'
    };
    
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          
          // Remove logic that toggles sections on scroll reveal
          entry.target.classList.add('section-visible');
        }
      });
    }, options);
    
    // Observe sections
    const aboutEl = document.getElementById('about');
    const skillsEl = document.getElementById('skills');
    const projectsEl = document.getElementById('projects');
    
    if (aboutEl) sectionObserver.observe(aboutEl);
    if (skillsEl) sectionObserver.observe(skillsEl);
    if (projectsEl) sectionObserver.observe(projectsEl);
  };
  
  setupSectionObservers();

  // Set up blob animation
  const Background = () => {
    const canvas = blobCanvas.value as unknown as HTMLCanvasElement;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    // Animation function
    const apply = () => {
      // Clear canvas with theme-appropriate background
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = isDarkMode.value ? '#1a1046' : '#f5f3ff';
      ctx.fillRect(0, 0, width, height);
      
    };
    
    apply();
  };
  
  Background();
});
</script>