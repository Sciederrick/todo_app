<template>
  <nav class="fixed bottom-0 w-screen md:left-0 md:w-auto z-10 md:h-screen flex justify-around md:justify-start md:flex-col md:items-center px-1 md:py-4 shadow bg-yellow-400">
    <fa-icon class="hidden md:block mb-12" :icon="['fas', 'clipboard-list']" size="2x" color="darkBlue"/>
    <ul class="flex md:flex-col">
      <li>
        <button class="flex-col md:flex-row px-5 md:px-2 md:my-10 shadow-md rounded-md md:shadow-none md:rounded-none pt-1 focus:outline-none" @click="$emit('changeTab', 'my-tasks')">
          <div class="flex justify-center md:inline">
            <fa-icon class="md:text-2xl" :icon="['fas', 'tasks']" size="1x" color="darkBlue"/>
          </div>
          <div class="inline text-xs md:pl-2" v-show="expandNav">
            Todos
          </div>
        </button>
      </li>
      <li>
        <button class="flex-col md:flex-row px-5 md:px-2 md:my-10 shadow-md rounded-md md:shadow-none md:rounded-none pt-1 focus:outline-none" @click="$emit('changeTab', 'my-calendar')">
          <div class="flex justify-center md:inline">
            <fa-icon class="md:text-2xl" :icon="['fas', 'calendar-alt']" size="1x" color="darkBlue"/>
          </div>
          <div class="inline text-xs md:pl-2" v-show="expandNav">
            Calendar View
          </div>
        </button>
      </li>
      <li>
        <button class="flex-col md:flex-row px-5 md:px-2 md:my-10 shadow-md rounded-md md:shadow-none md:rounded-none pt-1 focus:outline-none" @click="$emit('changeTab', 'add-task')">
          <div class="flex justify-center md:inline">
            <fa-icon class="md:text-2xl" :icon="['fas', 'plus']" size="1x" color="darkBlue"/>
          </div>
          <div class="inline text-xs md:pl-2" v-show="expandNav">
            New Task
          </div>
        </button>
      </li>
      <li>
        <button class="flex-col md:flex-row px-5 md:px-2 md:my-10 shadow-md rounded-md md:shadow-none md:rounded-none pt-1 focus:outline-none" @click="$emit('changeTab', 'my-settings')">
          <div class="flex justify-center md:inline">
            <fa-icon class="md:hidden" :icon="['fas', 'ellipsis-h']" size="1x" color="darkBlue"/>
            <fa-icon class="hidden md:inline md:text-2xl" :icon="['fas', 'ellipsis-v']" size="1x" color="darkBlue"/>
          </div>
          <div class="inline text-xs md:pl-2" v-show="expandNav">
            Settings
          </div>
        </button>
      </li>
    </ul>
    <button v-if="expandNav"
      @click="expandNav=!expandNav"
      class="hidden md:block md:self-end focus:outline-none mt-10">
      <fa-icon class="hidden md:inline md:text-2xl" :icon="['fas', 'angle-left']" size="1x" color="darkBlue"/>
    </button>
    <button v-else
      @click="expandNav=!expandNav"
      class="hidden md:block md:self-end focus:outline-none mt-10">
      <fa-icon class="hidden md:inline md:text-2xl" :icon="['fas', 'angle-right']" size="1x" color="darkBlue"/>
    </button>
  </nav>
</template>

