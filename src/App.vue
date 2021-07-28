<template>
  <div id="app" class="w-screen h-full overflow-x-hidden font-sans">
    <TheNavbar/>
    <div class="w-screen">
      <div class="absolute inset-x-0 top-0 h-screen overflow-y-auto pl-0 md:pl-20" :class="{ 'bg-black':toggle }">
        <div id="header" class="h-10 ml-2">
          <div class="float-left md:hidden text-3xl" :class="{ 'text-gray-300':toggle }">
              <fa-icon :icon="['fas', 'user-circle']" size="1x"/>
              <p class="pl-2 inline text-sm">John Doe</p>
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
        <transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </div>
    </div>
  </div>
</template>

<style>
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
import TheNavbar from '@/components/Nav.vue'
export default {
  components: {
    TheNavbar,
  },
  data(){
    return {
      toggle: true
    }
  }
}
</script>
