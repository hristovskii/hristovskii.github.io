<template>
  <header class="mb-20 text-center parallax-section" data-speed="0.1">
    <h1 ref="nameElement" class="mb-4 text-4xl sm:text-5xl font-normal tracking-wider opacity-0 transform translate-y-4" :class="isDarkMode ? 'text-white' : 'text-purple-900'">
      <span ref="typingElement"></span><span class="typing-cursor">|</span>
    </h1>
    
    <div ref="infoElement" class="mb-6 space-y-1 text-base sm:text-lg opacity-0 transform translate-y-4">
      <p>Petar Hristovski</p>
      <p>Skopje, North Macedonia</p>
      <p>{{ age }} years old</p>
    </div>
    
    <div ref="roleElement" class="mb-8 space-y-1 text-base sm:text-lg opacity-0 transform translate-y-4">
      <p>Full Stack Developer @ <a 
          href="https://www.easeaccess24.com/" 
          target="_blank"
          class="underline transition-colors" 
          :class="isDarkMode ? 'text-violet-300 hover:text-violet-200' : 'text-purple-700 hover:text-purple-900'">EaseAccess24</a></p>
      <p>Trainer @ <a 
          href="https://www.instagram.com/kodrum.mk/" 
          target="_blank"
          class="underline transition-colors" 
          :class="isDarkMode ? 'text-violet-300 hover:text-violet-200' : 'text-purple-700 hover:text-purple-900'">Kodrum</a></p>
      <p>Software Engineering student @ <a 
          href="https://www.finki.ukim.mk/"
          target="_blank" 
          class="underline transition-colors" 
          :class="isDarkMode ? 'text-violet-300 hover:text-violet-200' : 'text-purple-700 hover:text-purple-900'">FINKI</a></p>
      <p>A Funny guy who loves <span class="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-orange-400">Beer </span>&#x1F37A; and <span class="text-yellow-300">Linux</span> (I use MacOS btw).</p>
    </div>
    
    <div ref="socialElement" class="mt-6 flex items-center justify-center space-x-8 sm:space-x-10 opacity-0 transform translate-y-4">
      <a 
        href="#" 
        class="group transform transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2 focus:ring-offset-purple-900 rounded-full p-2" 
        aria-label="Email">
        <Mail class="h-6 w-6 sm:h-7 sm:w-7 transition-all" :class="isDarkMode ? 'group-hover:stroke-violet-300' : 'group-hover:stroke-purple-700'" />
      </a>
      <a 
        href="https://github.com/hristovskii" 
        target="_blank"
        class="group transform transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2 focus:ring-offset-purple-900 rounded-full p-2" 
        aria-label="GitHub">
        <Github class="h-6 w-6 sm:h-7 sm:w-7 transition-all" :class="isDarkMode ? 'group-hover:stroke-violet-300' : 'group-hover:stroke-purple-700'" />
      </a>
      <a 
        href="https://www.linkedin.com/in/petar-hristovski/" 
        target="_blank"
        class="group transform transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2 focus:ring-offset-purple-900 rounded-full p-2" 
        aria-label="LinkedIn">
        <Linkedin class="h-6 w-6 sm:h-7 sm:w-7 transition-all" :class="isDarkMode ? 'group-hover:stroke-violet-300' : 'group-hover:stroke-purple-700'" />
      </a>
    </div>

    <div class="mt-8 flex justify-center">
      <a 
        href="/public/assets/cv.pdf" 
        download="petar_hristovski_CV.pdf" 
        class="download-resume-btn flex items-center gap-2 rounded-full px-6 py-3 text-white shadow-lg transition-all duration-300 hover:shadow-purple-900/50 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2 focus:ring-offset-purple-900" 
        :class="isDarkMode ? 'bg-gradient-to-r from-violet-600 to-purple-600 shadow-purple-900/30' : 'bg-gradient-to-r from-violet-500 to-purple-500 shadow-purple-700/20'">
        <Download class="h-5 w-5" />
        Download Resume
      </a>
    </div>

  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, defineProps } from 'vue';
import { Mail, Github, Linkedin, Download } from 'lucide-vue-next';

defineProps<{
  isDarkMode: boolean
}>();

// Animation references
const nameElement = ref(null);
const typingElement = ref<HTMLElement | null>(null);
const infoElement = ref(null);
const roleElement = ref(null);
const socialElement = ref(null);

onMounted(() => {
  // Typing animation
  const text = "Pedzo";
  let i = 0;
  const typeWriter = () => {
    if (i < text.length) {
      if (typingElement.value) {
        typingElement.value.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100 + Math.random() * 100); // Random delay for more natural typing
      }
    }
  };
  setTimeout(typeWriter, 500);

  // Animate content elements
  const elements: (HTMLElement | null)[] = [
    nameElement.value,
    infoElement.value,
    roleElement.value,
    socialElement.value
  ];

  // Staggered animation for content elements
  elements.forEach((element, index) => {
    setTimeout(() => {
      if (element) {
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    }, 300 + index * 200);
  });
});

const age = ref(0);

const calculateAge = () => {
  const birthDate = new Date(2003, 6, 6);
  const today = new Date();
  let calculatedAge = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    calculatedAge--;
  }
  
  age.value = calculatedAge;
};

calculateAge();
</script>