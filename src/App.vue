<template>
  <div id="app" class="w-screen h-full overflow-x-hidden font-sans">
    <router-view></router-view>
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
