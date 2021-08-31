<template>
  <div class="w-full px-10" :class="{ 'text-gray-300':toggle }">
    <form class="max-w-sm md:max-w-md mx-auto">
    <!-- Header -->
      <div class="text-center">
        <h2 class="mt-5 text-xl font-bold text-gray-900" :class="{ 'text-green-800':toggle }">
          Settings
        </h2>
        <p class="mt-2 text-sm text-gray-400" :class="{ 'text-gray-600':toggle }">Customize application components.</p>
      </div>
      <div class="flex flex-col my-8 mx-2 border-b-2 border-gray-700 hover:border-green-800">
        <label class="text-left text-xs">New Tag:</label>
        <input class="w-full py-3 pl-2 md:pl-8 border-0 focus:outline-none placeholder-blue-300" :class="{ 'bg-black':toggle }" type="text" autocomplete="on" required>
      </div>
      <div class="flex flex-col my-8 mx-2 border-b-2 border-gray-700 hover:border-green-800">
        <label class="text-left text-xs">Remove Tag:</label>
          <select class="w-full ml-1" :class="{ 'bg-black':toggle }">
            <option value="">select tag</option>
            <option>Programming</option>
            <option>Lifestyle</option>
            <option>Fitness</option>
          </select>
      </div>
      <div class="flex flex-col my-8 mx-2 border-b-2 border-gray-700 hover:border-green-800">
        <label class="text-left text-xs">Tag image:</label>
        <input class="w-full mr-1 border-0 focus:outline-none" :class="{ 'bg-black':toggle }" type="file" name="fileUpload">
      </div>
      <div class="flex flex-col my-8 mx-2 border-b-2 border-gray-700 hover:border-green-800">
        <label class="text-left text-xs">App colors:</label>
        <select class="w-full ml-1" :class="{ 'bg-black':toggle }">
          <option disabled value="">select palette</option>
          <option>default</option>
          <option>black|aqua</option>
          <option>green|white</option>
        </select>
      </div>
      <div class="flex justify-center h-10">
        <button @click.prevent="" class="flex-no-shrink text-white py-2 px-4 rounded bg-teal-400 hover:bg-teal-700 focus:outline-none cursor-pointer"><fa-icon v-show="false" :icon="['fas','spinner']" size="1x" color="darkBlue" spin/>apply</button>
			</div>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    toggle: {
      type: Boolean,
      required: true
    }
  }
}
</script>