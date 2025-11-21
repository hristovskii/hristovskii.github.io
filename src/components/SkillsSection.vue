<template>
  <section 
    class="mb-20 opacity-0 transform translate-y-4 parallax-section"
    data-speed="0.05"
    role="region"
    aria-labelledby="skills-heading"
  >
    <div class="rounded-xl p-6 backdrop-blur-lg transition-all duration-300 transform hover:scale-[1.01]"
         :class="isDarkMode ? 'bg-purple-900/40 border border-purple-500/20 shadow-lg shadow-purple-900/10' : 'bg-white/60 border-[0.12rem] border-purple-500  shadow-lg shadow-purple-300/10'">
      <div class="flex items-center justify-between mb-4">
        <h2 id="skills-heading" class="text-2xl sm:text-3xl" :class="isDarkMode ? '' : 'text-purple-900'">&lt; Skills /&gt;</h2>
        <button 
          @click="$emit('toggle')" 
          class="p-2 rounded-full transition-transform duration-300"
          :class="[
            isDarkMode ? 'hover:bg-purple-800/40' : 'hover:bg-purple-100',
            { 'rotate-180': !sectionState }
          ]"
          aria-label="Toggle skills section"
        >
          <ChevronDown class="h-6 w-6" />
        </button>
      </div>
      
      <div 
        ref="skillsContent"
        class="transition-all duration-500 overflow-hidden"
        :style="{ maxHeight: sectionState ? skillsContentHeight + 'px' : '0px', opacity: sectionState ? 1 : 0 }"
      >
        <!-- Skill Categories -->
        <nav class="mt-2 mb-6" role="navigation" aria-label="Skill category filters">
          <div class="flex flex-wrap justify-center gap-3">
            <button 
              v-for="category in ['All', 'Frontend', 'Backend', 'Mobile', 'Game', 'DevOps', 'Other']" 
              :key="category"
              @click="filterSkills(category)"
              class="rounded-full px-4 py-1.5 text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-violet-400"
              :class="[
                skillFilter === category 
                  ? (isDarkMode ? 'bg-violet-600 text-white' : 'bg-violet-500 text-white') 
                  : (isDarkMode ? 'bg-purple-900/30 hover:bg-purple-800/40' : 'bg-purple-100 hover:bg-purple-200')
              ]"
              :aria-pressed="skillFilter === category"
            >
              {{ category }}
            </button>
          </div>
        </nav>
        
        <section role="region" aria-labelledby="skills-grid-heading">
          <h3 id="skills-grid-heading" class="sr-only">Skills by category</h3>
          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
            <div v-for="(skill, index) in filteredSkills" :key="skill.name" 
                class="skill-pill group relative overflow-hidden rounded-full px-4 py-2 text-center text-sm sm:text-base transition-all duration-300"
                :class="isDarkMode ? 'backdrop-blur-sm bg-purple-900/30 border border-purple-500/20 hover:bg-purple-800/40 hover:border-purple-500/30' : 'backdrop-blur-sm bg-white/50 border-[0.15rem] border-purple-300 hover:bg-white/70 hover:border-purple-300'"
                :style="{ animationDelay: `${index * 50}ms` }">
              <div class="flex items-center justify-center gap-2">
                <component :is="getSkillIcon(skill.name)" v-if="getSkillIcon(skill.name)" class="h-4 w-4" />
                <span>{{ skill.name }}</span>
              </div>
              <div class="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            :class="isDarkMode ? 'bg-gradient-to-r from-purple-600/20 to-violet-600/20' : 'bg-gradient-to-r from-purple-200/60 to-violet-200/60'"></div>
            </div>
          </div>
        </section>
        
        <!-- Skill Progress Bars -->
        <section class="mt-8 space-y-6" ref="progressBarsContainer" role="region" aria-labelledby="proficiency-heading">
          <h3 id="proficiency-heading" class="mb-4 text-center text-xl" :class="isDarkMode ? 'text-violet-200' : 'text-purple-800'">Proficiency</h3>
          <div v-for="(skill, index) in topSkills" :key="skill.name" class="space-y-1 progress-item" :data-delay="index * 100">
            <div class="flex justify-between text-sm">
              <span>{{ skill.name }}</span>
              <span class="progress-percent">0%</span>
            </div>
            <div class="h-2 w-full rounded-full overflow-hidden" :class="isDarkMode ? 'bg-purple-900/40' : 'bg-purple-100'">
              <div class="progress-bar h-full rounded-full bg-gradient-to-r from-violet-500 to-purple-500 transition-all duration-1500" style="width: 0%" role="progressbar" :aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" :aria-label="`${skill.name} proficiency`"></div>
            </div>
          </div>
        </section>

        <section class="mt-8 space-y-6" role="region" aria-labelledby="fun-skills-heading">
          <h3 id="fun-skills-heading" class="mb-4 text-center text-xl" :class="isDarkMode ? 'text-violet-200' : 'text-purple-800'">Fun Skills</h3>
          <div class="space-y-1">
            <div class="flex justify-between text-sm">
              <span>Beer Expert</span>
              <span>110%</span>
            </div>
            <div class="h-2 w-full rounded-full overflow-hidden absolute" :class="isDarkMode ? 'bg-purple-900/40' : 'bg-purple-100'">
              <div class="h-full rounded-full bg-gradient-to-r from-yellow-400 to-amber-500" style="width: 100%" role="progressbar" aria-valuenow="110" aria-valuemin="0" aria-valuemax="100" aria-label="Beer Expert proficiency"></div>
            </div>
          </div>
          <p class="mb-4 text-xs italic text-center mt-2" 
          :class="isDarkMode ? 'text-violet-200' : 'text-black-800'">"
          Overflowing with expertise &#x1F37A;"</p>
        </section>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, reactive, onMounted, watch, defineProps, defineEmits } from 'vue';
import { ChevronDown, Code, Server, Database, Figma, Cpu, FileCode } from 'lucide-vue-next';

const props = defineProps<{
  isDarkMode: boolean,
  sectionState: boolean
}>();

defineEmits(['toggle']);

const skillsContent = ref<HTMLElement | null>(null);
const skillsContentHeight = ref(0);
const progressBarsContainer = ref<HTMLElement | null>(null);
const skillFilter = ref('All');

const updateContentHeight = () => {
  if (skillsContent.value) {
    skillsContentHeight.value = skillsContent.value.scrollHeight;
  }
};

// Get icon for skill
const getSkillIcon = (skillName: string) => {
  const skillIcons: Record<string, any> = {
    'JavaScript': Code,
    'TypeScript': Code,
    'React': Code,
    'Next.js': Code,
    'Vue.js': Code,
    'Nuxt.js': Code,
    'HTML/CSS': FileCode,
    'Tailwind CSS': FileCode,
    'Shad Cn': FileCode,
    'Node.js': Server,
    'Java': Code,
    'C#': Code,
    'Python': Code,
    'PostgreSQL': Database,
    'Firebase': Database,
    'Supabase': Database,
    'React Native': Code,
    'Flutter': Code,
    'PWA': Code,
    'Unity': Code,
    'C / C++': Cpu,
    'Docker': Server,
    'Linux': Server,
    'CI/CD': Cpu,
    'Git': Server,
    'Figma': Figma,
    'UI/UX': Figma
  };
  
  return skillIcons[skillName] || null;
};

// Skills data with categories
const skills = reactive([
  { name: 'JavaScript', category: 'Frontend' },
  { name: 'TypeScript', category: 'Frontend' },
  { name: 'React', category: 'Frontend' },
  { name: 'Next.js', category: 'Frontend' },
  { name: 'Vue.js', category: 'Frontend' },
  { name: 'Nuxt.js', category: 'Frontend' },
  { name: 'HTML/CSS', category: 'Frontend' },
  { name: 'Tailwind CSS', category: 'Frontend' },
  { name: 'Shad Cn', category: 'Frontend' },
  { name: 'Node.js', category: 'Backend' },
  { name: 'Java', category: 'Backend' },
  { name: 'C#', category: 'Backend' },
  { name: 'Python', category: 'Backend' },
  { name: 'PostgreSQL', category: 'Backend' },
  { name: 'Firebase', category: 'Backend' },
  { name: 'Supabase', category: 'Backend' },
  { name: 'React Native', category: 'Mobile' },
  { name: 'Flutter', category: 'Mobile' },
  { name: 'PWA', category: 'Mobile' },
  { name: 'Unity', category: 'Game' },
  { name: 'C / C++', category: 'Game' },
  { name: 'Docker', category: 'DevOps' },
  { name: 'Linux', category: 'DevOps' },
  { name: 'CI/CD', category: 'DevOps' },
  { name: 'Git', category: 'DevOps' },
  { name: 'Figma', category: 'Other' },
  { name: 'UI/UX', category: 'Other' }
]);

// Top skills with proficiency levels
const topSkills = [
  { name: 'C / C++', level: 99 },
  { name: 'HTML / CSS / TAILWIND CSS', level: 95 },
  { name: 'JavaScript / TypeScript', level: 90 },
  { name: 'React / NextJS', level: 85 },
  { name: 'Node.js', level: 80 },
  { name: 'Figma', level: 70 },
  { name: 'Vue / NuxtJS', level: 65 },
  { name: 'C#', level: 50 },
  { name: 'Java', level: 40 },
  { name: 'Docker', level: 30 },
];

const filterSkills = (category: string) => {
  skillFilter.value = category;
};

// Fixed computed property to ensure items always show when "All" is selected
const filteredSkills = computed(() => {
  return skillFilter.value === 'All' 
    ? skills 
    : skills.filter(skill => skill.category === skillFilter.value);
});

// Animate progress bars
const animateProgressBars = () => {
  if (!progressBarsContainer.value) return;
  
  const progressItems = progressBarsContainer.value.querySelectorAll('.progress-item');
  
  progressItems.forEach(item => {
    const progressBar = item.querySelector('.progress-bar') as HTMLElement;
    const progressPercent = item.querySelector('.progress-percent') as HTMLElement;
    const delay = parseInt((item as HTMLElement).dataset.delay || '0');
    const skillName = (item.querySelector('span') as HTMLElement).textContent || '';
    
    setTimeout(() => {
      let startWidth = 0;
      const targetWidth = topSkills.find(skill => skill.name === skillName)?.level || 0;
      const duration = 200;
      const startTime = performance.now();
      
      const animate = (currentTime: number) => {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        const currentWidth = startWidth + (targetWidth - startWidth) * progress;
        
        if (progressBar) progressBar.style.width = `${currentWidth}%`;
        if (progressPercent) progressPercent.textContent = `${Math.round(currentWidth)}%`;
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      requestAnimationFrame(animate);
    }, delay);
  });
};

onMounted(() => {
  updateContentHeight();
  window.addEventListener('resize', updateContentHeight);
  
  // Set up intersection observer for scroll animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (props.sectionState) {
          setTimeout(() => {
            animateProgressBars();
          }, 200);
        }
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  
  if (progressBarsContainer.value) {
    observer.observe(progressBarsContainer.value);
  }
});

watch(() => props.sectionState, (newValue) => {
  // Update height after state changes
  setTimeout(updateContentHeight, 50);
  
  // Animate progress bars when section is opened
  if (newValue) {
    setTimeout(() => {
      animateProgressBars();
    }, 200);
  }
});

watch(filteredSkills, () => {
  // Update height when filtered content changes
  setTimeout(updateContentHeight, 50);
});
</script>