<template>
  <div id="app" class="md:flex font-sans">
    <my-navbar @changeTab="currentTabComponent = $event"/>
    <div class="h-screen overflow-y-auto w-full md:pl-24" :class="{ 'bg-black':toggle }">
      <div id="header" class="h-10 ml-2 mb-4">
        <div class="w-24 float-left md:hidden text-3xl flex" :class="{ 'text-gray-300':toggle }">
            <div class="w-6 h-6 pt-2">
              <img :src="require('@/assets/logo/logo.svg')"/>
            </div>
            <div class="pl-1 text-gray-300" :class="{ 'text-gray-800':toggle }">Todo</div>
        </div>
        <!-- night mode toggle button -->
        <div class="float-right flex flex-col mx-2 md:mx-8 my-2">
            <label for="unchecked" class="mt-3 inline-flex items-center cursor-pointer">
                <span class="relative">
                <span class="block w-10 h-6 bg-gray-400 rounded-full shadow-inner">
                    <fa-icon class="ml-1" :icon="['fas', 'sun']" size="1x" color="yellow"/>
                    <fa-icon class="float-right mt-1 mr-1 text-sm" :icon="['fas', 'moon']" size="1x" color="yellow"/>
                </span>
                <span class="absolute block w-4 h-4 mt-1 mx-1 bg-white rounded-full shadow inset-y-0 focus-within:shadow-outline transition-transform duration-300 ease-in-out" :class="{'right-0':toggle, 'left-0':!toggle}">
                    <input @click="toggle=!toggle" id="unchecked" type="checkbox" class="absolute opacity-0 w-0 h-0"/>
                </span>
                </span>
            </label>
        </div>
      <!-- NB! focus-within must be enabled for boxShadow in variants -->
      </div>
      <keep-alive>
        <component :is="currentTabComponent" :toggle="toggle"></component>
      </keep-alive>
    </div>
  </div>
</template>
<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap');

#app {
  font-family: 'Roboto', sans-serif;
}
/* width */
::-webkit-scrollbar {
  width: 7px;
}
/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px #E0CF35;
  border-radius: 5px;
}
/* Handle */
::-webkit-scrollbar-thumb {
  background-color: #F6E05E;
  border-radius: 5px;
}
/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background-color: #E1E1E1;
}
</style>

<script>
import Navbar from '@/components/nav.vue'
import Tasks from '@/components/Tasks.vue'
import AddTask from '@/components/addTask.vue'
import Calendar from '@/components/Calendar.vue'
import Settings from '@/components/Settings.vue'
export default {
  components: {
    'my-navbar':Navbar,
    'my-tasks':Tasks,
    'add-task':AddTask,
    'my-calendar':Calendar,
    'my-settings':Settings,
  },
  data(){
    return {
      toggle: true,
      currentTabComponent: "my-tasks",
    }
  }
}
</script>
