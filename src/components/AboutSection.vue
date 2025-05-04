<template>
  <section 
    class="mb-20 parallax-section"
    data-speed="0.07"
  >
    <div class="rounded-xl p-6 backdrop-blur-lg transition-all duration-300 transform hover:scale-[1.01]"
         :class="isDarkMode ? 'bg-purple-900/40 border border-purple-500/20 shadow-lg shadow-purple-900/10' : 'bg-white/60 border-[0.12rem] border-purple-500 shadow-lg shadow-purple-300/10'">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-2xl sm:text-3xl" :class="isDarkMode ? '' : 'text-purple-900'">&lt; About me /&gt;</h2>
        <button 
          @click="$emit('toggle')" 
          class="p-2 rounded-full transition-transform duration-300"
          :class="[
            isDarkMode ? 'hover:bg-purple-800/40' : 'hover:bg-purple-100',
            { 'rotate-180': !sectionState }
          ]"
          aria-label="Toggle about section"
        >
          <ChevronDown class="h-6 w-6" />
        </button>
      </div>
      
      <div 
        ref="aboutContent"
        class="transition-all duration-500 overflow-hidden"
        :style="{ maxHeight: sectionState ? aboutContentHeight + 'px' : '0px', opacity: sectionState ? 1 : 0 }"
      >
        <div class="space-y-4">
          <p class="leading-relaxed">
            I'm a passionate Full Stack Developer with a love for creating elegant solutions to complex problems. 
            Currently, I'm working on assistive technologies to empower people with disabilities and <span class="text-pink-400">improve their quality of life</span>.
            My journey in tech started when I was 14, and I've been coding ever since.
          </p>
          <p class="leading-relaxed">
            With expertise in both frontend and backend development, 
            I enjoy building full-stack applications that are not only functional 
            but also aesthetically pleasing and user-friendly.
          </p>
          <p class="leading-relaxed">
            I'm eager to expand my skills into <span class="text-blue-500">Mobile</span> and <span class="text-green-400">Game</span> development, 
            as I find these areas fascinating and full of creative potential. 
            Additionally, I have a deep appreciation for <span class="text-yellow-300">Linux</span> and enjoy exploring its versatility and power.
          </p>
          <p class="leading-relaxed">
            When I'm not coding, you can find me fearlessly breaking my Debian Server 
            at home by running "harmless" commands that somehow nuke all Docker services, 
            passionately arguing with my friends on Discord about why using x-ray 
            in Minecraft is a crime against humanity (<span class="text-red-500">spoiler</span>: it's always them, never me), 
            or attempting to ride my bicycle like I'm auditioning for a circus stunt show. 
            I also enjoy reading books that make me question my life choices, 
            experimenting with new technologies that usually end in "oops," and most importantly, 
            being outsmarted daily by my dog Fuji, who is clearly the real brains of the operation.
          </p>
        </div>
        
        <!-- Timeline -->
        <div class="mt-10">
          <h3 class="mb-4 text-center text-xl" :class="isDarkMode ? 'text-violet-200' : 'text-purple-800'">Journey</h3>
          <div class="relative">
            <!-- Timeline line -->
            <div class="absolute left-[0.3rem] top-[1rem] bottom-0 w-0.5 bg-gradient-to-b from-violet-500 to-purple-500"></div>
            
            <!-- Timeline items -->
            <div class="timeline-items space-y-8 pl-6">
              <div class="timeline-item relative">
                <div class="absolute -left-6 top-1 h-3 w-3 rounded-full bg-violet-500"></div>
                <div class="timeline-date text-sm font-medium" :class="isDarkMode ? 'text-violet-300' : 'text-purple-700'">2025 - Present</div>
                <div class="timeline-title font-medium mt-1" :class="isDarkMode ? 'text-white' : 'text-purple-900'">Trainer at Semos Education</div>
                <div class="timeline-content mt-1 text-sm" :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'">Course for C++ (Beginner, Advanced).</div>
              </div>

              <div class="timeline-item relative">
                <div class="absolute -left-6 top-1 h-3 w-3 rounded-full bg-violet-500"></div>
                <div class="timeline-date text-sm font-medium" :class="isDarkMode ? 'text-violet-300' : 'text-purple-700'">2024 - Present</div>
                <div class="timeline-title font-medium mt-1" :class="isDarkMode ? 'text-white' : 'text-purple-900'">Intern - Full Stack Developer at EaseAccess24</div>
                <div class="timeline-content mt-1 text-sm" :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'">Working on the widget and the official website.</div>
              </div>
              
              <div class="timeline-item relative">
                <div class="absolute -left-6 top-1 h-3 w-3 rounded-full bg-violet-500"></div>
                <div class="timeline-date text-sm font-medium" :class="isDarkMode ? 'text-violet-300' : 'text-purple-700'">2022 - Present</div>
                <div class="timeline-title font-medium mt-1" :class="isDarkMode ? 'text-white' : 'text-purple-900'">Computer Science Student</div>
                <div class="timeline-content mt-1 text-sm" :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'">Bachelors of Applied Science and the FCSE faculty in Skopje with a focus on
                  Software Engineering & Computer Science.</div>
              </div>

              <div class="timeline-item relative">
                <div class="absolute -left-6 top-1 h-3 w-3 rounded-full bg-violet-500"></div>
                <div class="timeline-date text-sm font-medium" :class="isDarkMode ? 'text-violet-300' : 'text-purple-700'">2018 - 2022</div>
                <div class="timeline-title font-medium mt-1" :class="isDarkMode ? 'text-white' : 'text-purple-900'">High School Diploma</div>
                <div class="timeline-content mt-1 text-sm" :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'">Mathematics and Computer Science</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, defineProps, defineEmits } from 'vue';
import { ChevronDown } from 'lucide-vue-next';

const props = defineProps<{
  isDarkMode: boolean,
  sectionState: boolean
}>();

defineEmits(['toggle']);

const aboutContent = ref<HTMLElement | null>(null);
const aboutContentHeight = ref(0);

const updateContentHeight = () => {
  if (aboutContent.value) {
    aboutContentHeight.value = aboutContent.value.scrollHeight;
  }
};

onMounted(() => {
  updateContentHeight();
  window.addEventListener('resize', updateContentHeight);
});

watch(() => props.sectionState, () => {
  // Update height after state changes
  setTimeout(updateContentHeight, 50);
});
</script>