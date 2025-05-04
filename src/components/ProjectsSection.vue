<template>
  <section 
    class="mb-20 opacity-0 transform translate-y-4 parallax-section"
    data-speed="0.08"
  >
    <div class="rounded-xl p-6 backdrop-blur-lg transition-all duration-300 transform hover:scale-[1.01]"
         :class="isDarkMode ? 'bg-purple-900/40 border border-purple-500/20 shadow-lg shadow-purple-900/10' : 'bg-white/60 border-[0.12rem] border-purple-500 shadow-lg shadow-purple-300/10'">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-2xl sm:text-3xl" :class="isDarkMode ? '' : 'text-purple-900'">&lt; Open-Source Projects /&gt;</h2>
        
        <button 
          @click="$emit('toggle')" 
          class="p-2 rounded-full transition-transform duration-300"
          :class="[
            isDarkMode ? 'hover:bg-purple-800/40' : 'hover:bg-purple-100',
            { 'rotate-180': !sectionState }
          ]"
          aria-label="Toggle projects section"
        >
          <ChevronDown class="h-6 w-6" />
        </button>
      </div>
      <p><span class="text-red-500">Disclaimer:</span> Live Demo links may not work, working on it. Check the <span class="text-green-500">source code</span>.</p>
      
      <div 
        ref="projectsContent"
        class="transition-all duration-500 overflow-hidden"
        :style="{ maxHeight: sectionState ? projectsContentHeight + 'px' : '0px', opacity: sectionState ? 1 : 0 }"
      >
        <!-- Project Categories -->
        <div class="mt-2 mb-6 flex flex-wrap justify-center gap-3">
          <button 
            v-for="category in ['All', 'Web', 'Mobile', 'Game', 'Other']" 
            :key="category"
            @click="filterProjects(category)"
            class="rounded-full px-4 py-1.5 text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-violet-400"
            :class="[
              projectFilter === category 
                ? (isDarkMode ? 'bg-violet-600 text-white' : 'bg-violet-500 text-white') 
                : (isDarkMode ? 'bg-purple-900/30 hover:bg-purple-800/40' : 'bg-purple-100 hover:bg-purple-200')
            ]"
          >
            {{ category }}
          </button>
        </div>
        
        <div class="grid gap-6 sm:grid-cols-2">
          <div v-for="(project, index) in filteredProjects" :key="project.title" 
              class="project-card group relative overflow-hidden rounded-xl p-5 pb-2 transition-all duration-500"
              :class="isDarkMode ? 'backdrop-blur-sm bg-purple-900/30 border border-purple-500/20 hover:bg-purple-800/40 hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-900/20' : 'backdrop-blur-sm bg-white/50 border-[0.15rem] border-purple-300  hover:bg-white/70 hover:border-purple-500 hover:shadow-lg hover:shadow-purple-300/10'"
              :style="{ animationDelay: `${index * 100}ms` }">
            <h3 class="mb-2 text-xl font-medium" :class="isDarkMode ? 'text-violet-200' : 'text-purple-800'">{{ project.title }}</h3>
            <p class="mb-4 text-sm" :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'">{{ project.description }}</p>
            <div class="flex flex-wrap gap-2">
              <span v-for="tech in project.technologies" :key="tech" 
                    class="inline-block rounded-full px-2 py-1 text-xs"
                    :class="isDarkMode ? 'bg-purple-800/50' : 'bg-purple-100'">
                {{ tech }}
              </span>
            </div>
            <div class="mt-4 flex items-center gap-3">
              <a 
                :href="project.link" 
                class="inline-flex items-center gap-1 text-sm font-medium transition-colors" 
                :class="isDarkMode ? 'text-violet-300 hover:text-violet-200' : 'text-purple-700 hover:text-purple-900'">
                <ExternalLink class="h-4 w-4" /> Live Demo
              </a>
              <a 
                :href="project.code" 
                class="inline-flex items-center gap-1 text-sm font-medium transition-colors" 
                :class="isDarkMode ? 'text-violet-300 hover:text-violet-200' : 'text-purple-700 hover:text-purple-900'">
                <Github class="h-4 w-4" /> Code
              </a>
            </div>
            <div class="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-violet-500 to-purple-500 transition-all duration-500 group-hover:w-full"></div>
          </div>
        </div>
        
        <!-- Featured Project -->
        <div class="mt-5 rounded-xl overflow-hidden" 
            :class="isDarkMode ? 'bg-purple-900/50 border border-purple-500/30' : 'bg-white/70 border-[0.12rem] border-purple-300 mb-5'">
          <div class="p-5">
            <div class="flex items-center gap-2 mb-2">
              <Star class="h-5 w-5" :class="isDarkMode ? 'text-violet-300' : 'text-purple-600'" />
              <h3 class="text-xl font-medium" :class="isDarkMode ? 'text-violet-200' : 'text-purple-800'">Featured Project</h3>
            </div>
            <h4 class="text-lg font-medium mb-2" :class="isDarkMode ? 'text-white' : 'text-purple-900'">Calendex</h4>
            <p class="mb-4 text-sm" :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'">
              Calendex is a web application that allows users to import and view events from multiple Google, Outlook, or Apple calendars in one unified calendar, for better scheduling and planning.            </p>
            <div class="flex flex-wrap gap-2 mb-4">
              <span class="inline-block rounded-full px-2 py-1 text-xs"
                    :class="isDarkMode ? 'bg-purple-800/50' : 'bg-purple-100'">
                Vue.js
              </span>
              <span class="inline-block rounded-full px-2 py-1 text-xs"
                    :class="isDarkMode ? 'bg-purple-800/50' : 'bg-purple-100'">
                Tailwind CSS
              </span>
              <span class="inline-block rounded-full px-2 py-1 text-xs"
                    :class="isDarkMode ? 'bg-purple-800/50' : 'bg-purple-100'">
                Shadcn UI
              </span>
            </div>
            <div class="flex flex-wrap items-center gap-4">
              <a 
                href="#" 
                target="_blank"
                class="inline-flex items-center gap-2 rounded-full px-4 py-2 text-white transition-all duration-300 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-violet-400"
                :class="isDarkMode ? 'bg-gradient-to-r from-violet-600 to-purple-600 hover:shadow-purple-900/30' : 'bg-gradient-to-r from-violet-500 to-purple-500 hover:shadow-purple-500/20'">
                <ExternalLink class="h-4 w-4" /> View Project
              </a>
              <a 
                href="https://github.com/hristovskii/calendex"
                target="_blank" 
                class="inline-flex items-center gap-2 rounded-full px-4 py-2 transition-all duration-300 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-violet-400"
                :class="isDarkMode ? 'bg-purple-800/50 text-white hover:bg-purple-800/70 hover:shadow-purple-900/20' : 'bg-purple-100 text-purple-800 hover:bg-purple-200 hover:shadow-purple-300/10'">
                <Github class="h-4 w-4" /> Source Code
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, reactive, onMounted, watch, defineProps, defineEmits } from 'vue';
import { ChevronDown, ExternalLink, Github, Star } from 'lucide-vue-next';

const props = defineProps<{
  isDarkMode: boolean,
  sectionState: boolean
}>();

defineEmits(['toggle']);

const projectsContent = ref<HTMLElement | null>(null);
const projectsContentHeight = ref(0);
const projectFilter = ref('All');

const updateContentHeight = () => {
  if (projectsContent.value) {
    projectsContentHeight.value = projectsContent.value.scrollHeight;
  }
};

// Projects data with categories
const projects = reactive([
{
    title: 'EESTEC LC Skopje Website',
    description: 'EESTEC LC Skopje Official website.',
    technologies: ['Next.js', 'Tailwind CSS', 'MariaDB'],
    link: 'https://eestec.mk/',
    code: 'https://github.com/eestec-sk/eestec.mk',
    category: 'Web'
  },
  {
    title: 'Calendex',
    description: 'Calendex is a web application that allows users to import and view events from multiple Google, Outlook, or Apple calendars in one unified calendar, for better scheduling and planning.',
    technologies: ['Vue.js', 'Tailwind CSS', 'Shadcn UI'],
    link: '',
    code: 'https://github.com/hristovskii/calendex',
    category: 'Web'
  },
  {
    title: 'Green Leaf Labs',
    description: 'Website for selling microgreens.',
    technologies: ['Next.js', 'Tailwind CSS'],
    link: '',
    code: 'https://github.com/hristovskii/green-leaf-labs',
    category: 'Web'
  },
  {
    title: 'Back 2 Bacics',
    description: 'Webiste for marketing a event for a local students organization.',
    technologies: ['Next.js', 'Tailwind CSS'],
    link: '',
    code: 'https://github.com/hristovskii/b2b',
    category: 'Web'
  },
  {
    title: 'Portfolio Website',
    description: 'A minimalist portfolio website.',
    technologies: ['Vue.js', 'Tailwind CSS', 'Vite'],
    link: '',
    code: '',
    category: 'Web'
  },
  {
    title: 'Old Portfolio Website',
    description: 'A womework that turned in a portfolio website.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    link: '',
    code: '',
    category: 'Web'
  },
  {
    title: 'Brat za brat, Ljuben za pivo',
    description: 'Si bese ednas i samo ednas eden Ljuben sto sakase da pie mnogu pivo. Tolku mnogu sakase da pie sto drugarite napravija igra vo negova chest.',
    technologies: ['Unity', 'ITCH.IO', '2D'],
    link: 'https://pedzo.itch.io/brat-za-brat-ljuben-za-pivo',
    category: 'Game',
  },
  {
    title: 'flappy-ljuben-game',
    description: 'Si beshe ednas eden ljuben sto sakase da pie mnogu pivo, drugarite mu napravija USTE EDNA igra vo negova chest. ',
    technologies: ['Unity', 'ITCH.IO', '2D', 'Mobile'],
    link: 'https://pedzo.itch.io/flappy-ljuben-game',
    category: 'Game',
  },
]);

const filterProjects = (category: string) => {
  projectFilter.value = category;
};

// Fixed computed property to ensure items always show when "All" is selected
const filteredProjects = computed(() => {
  return projectFilter.value === 'All' 
    ? projects 
    : projects.filter(project => project.category === projectFilter.value);
});

onMounted(() => {
  updateContentHeight();
  window.addEventListener('resize', updateContentHeight);
  
  // Set up intersection observer for scroll animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  // Observe project cards for scroll animation
  document.querySelectorAll('.project-card').forEach(el => {
    observer.observe(el);
  });
});

watch(() => props.sectionState, () => {
  // Update height after state changes
  setTimeout(updateContentHeight, 50);
});

watch(filteredProjects, () => {
  // Update height when filtered content changes
  setTimeout(updateContentHeight, 50);
});
</script>