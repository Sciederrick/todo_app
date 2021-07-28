<template>
<div class="fixed inset-0 h-screen w-screen overflow-x-hidden flex flex-col items-center justify-center bg-teal-lightest font-sans bg-yellow-500 bg-opacity-75 z-10">
	<div 
		v-if="modal.visible" 
        @click.self="modal.visible = true" 
		class="h-screen w-full absolute flex items-center justify-center">
      <div class="relative bg-white rounded shadow p-8 m-4 max-h-full text-center overflow-y-auto">
        <fa-icon 
			@click="$router.go(-1)" 
			class="absolute top-0 right-0 m-1 text-2xl cursor-pointer" 
            :icon="['fas', 'times']" color="maroon" size="1x"/>
        <div>Coming soon</div>
      </div>
    </div>
</div>
</template>
<script>
export default{
  data(){
    return{
		modal:{
			visible:true
		},		
    }
  }
}
</script>
