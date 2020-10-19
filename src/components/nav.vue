<template>
  <nav class="fixed bottom-0 w-screen md:w-auto md:left-0 md:inset-y-0 flex justify-around md:justify-start md:flex-col md:items-center px-1 md:py-4 shadow bg-yellow-400">
    <fa-icon class="hidden md:block mb-12" :icon="['fas', 'user-circle']" size="3x" color="darkBlue"/>
    <router-link :to="{name:'home'}">
      <fa-icon class="my-2 md:my-10 md:text-2xl" :icon="['fas', 'tasks']" size="1x" color="darkBlue"/>
    </router-link>
    <router-link :to="{name:'calendar'}">
      <fa-icon class="my-2 md:my-10 md:text-2xl" :icon="['fas', 'calendar-alt']" size="1x" color="darkBlue"/>
    </router-link>
    <router-link :to="{name:'addTask'}">
      <fa-icon class="my-2 md:my-10 md:text-2xl" :icon="['fas', 'plus']" size="1x" color="darkBlue"/>
    </router-link>
    <router-link class="md:hidden" :to="{name:'settings'}">
      <fa-icon class="my-2" :icon="['fas', 'ellipsis-v']" size="1x" color="darkBlue"/>
    </router-link>
    <router-link class="hidden md:block" :to="{name:'settings'}">
      <fa-icon class="my-2 md:my-10 md:text-2xl" :icon="['fas', 'ellipsis-h']" size="1x" color="darkBlue"/>
    </router-link>
  </nav>
</template>
