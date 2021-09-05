<template>
  <nav class="fixed bottom-0 w-screen md:left-0 md:w-auto z-10 md:h-screen flex justify-around md:justify-start md:flex-col md:items-center px-1 md:py-4 shadow bg-yellow-500">
    <div class="hidden md:block mb-12 w-12 h-12">
      <img :src="require('@/assets/logo/logo.svg')"/>
      <div class="pl-1 text-gray-600">Todo</div>
    </div>
    <ul class="flex md:flex-col">
      <li>
        <button class="flex-col md:flex-row px-5 md:px-2 md:my-10 shadow-md rounded-md md:shadow-none md:rounded-none pt-1 focus:outline-none" @click="$emit('changeTab', 'my-tasks')">
          <div class="flex justify-center md:inline">
            <fa-icon :icon="['fas', 'tasks']" size="1x" color="darkBlue"/>
          </div>
          <div class="inline  md:pl-2 md:font-semibold" v-show="expandNav">
            <span style="color:#00008B">Todos</span>
          </div>
        </button>
      </li>
      <li>
        <button class="flex-col md:flex-row px-5 md:px-2 md:my-10 shadow-md rounded-md md:shadow-none md:rounded-none pt-1 focus:outline-none" @click="$emit('changeTab', 'my-calendar')">
          <div class="flex justify-center md:inline">
            <fa-icon :icon="['fas', 'calendar-alt']" size="1x" color="darkBlue"/>
          </div>
          <div class="inline  md:pl-2 md:font-semibold" v-show="expandNav">
            <span style="color:#00008B">Calendar View</span>
          </div>
        </button>
      </li>
      <li>
        <button class="flex-col md:flex-row px-5 md:px-2 md:my-10 shadow-md rounded-md md:shadow-none md:rounded-none pt-1 focus:outline-none" @click="$emit('changeTab', 'add-task')">
          <div class="flex justify-center md:inline">
            <fa-icon :icon="['fas', 'plus']" size="1x" color="darkBlue"/>
          </div>
          <div class="inline  md:pl-2 md:font-semibold" v-show="expandNav">
            <span style="color:#00008B">New Task</span>
          </div>
        </button>
      </li>
      <li>
        <button class="flex-col md:flex-row px-5 md:px-2 md:my-10 shadow-md rounded-md md:shadow-none md:rounded-none pt-1 focus:outline-none" @click="$emit('changeTab', 'my-settings')">
          <div class="flex justify-center md:inline">
            <fa-icon class="md:hidden" :icon="['fas', 'ellipsis-h']" size="1x" color="darkBlue"/>
            <fa-icon class="hidden md:inline" :icon="['fas', 'ellipsis-v']" size="1x" color="darkBlue"/>
          </div>
          <div class="inline  md:pl-2 md:font-semibold" v-show="expandNav">
            <span style="color:#00008B">Settings</span>
          </div>
        </button>
      </li>
    </ul>
    <button v-if="expandNav"
      @click="expandNav=!expandNav"
      class="hidden md:block md:self-end focus:outline-none mt-10">
      <fa-icon class="hidden md:inline md:text-2xl" :icon="['fas', 'angle-left']" size="1x" color="gray"/>
    </button>
    <button v-else
      @click="expandNav=!expandNav"
      class="hidden md:block md:self-end focus:outline-none mt-10">
      <fa-icon class="hidden md:inline md:text-2xl" :icon="['fas', 'angle-right']" size="1x" color="gray"/>
    </button>
  </nav>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      expandNav: true
    }
  },
  methods: mapState({
    theme: state => state.appSettings.colors
  })
}
</script>


