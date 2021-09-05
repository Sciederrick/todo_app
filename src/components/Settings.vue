<template>
  <div class="w-full h-3/4 flex items-center md:block px-10 pt-2" :class="{ 'text-gray-300':toggle }">
    <form class="w-full md:max-w-md mt-10 mx-auto">
    <!-- Header -->
      <div class="text-center">
        <h2 class="mt-5 text-xl font-bold text-gray-900" :class="{ 'text-green-800':toggle }">
          Settings
        </h2>
        <p class="mt-2 text-sm text-gray-400" :class="{ 'text-gray-600':toggle }">Customize application components.</p>
        <ErrorList :error="errors" v-if="errors"/>
      </div>
      <div class="flex flex-col my-6 md:my-8 mx-2 border-b-2 border-gray-700 hover:border-green-800">
        <label for="newTag" class="text-left text-xs">New Tag:</label>
        <div class="flex justify-between">
          <input 
            v-model.trim="newTag"
            class="w-full py-3 border-0 focus:outline-none placeholder-blue-300" 
            :class="{ 'bg-black':toggle }" 
            id="newTag"
            name="newTag"
            type="text" 
            autocomplete="on" 
            required>
          <button v-show="newTag" @click.prevent="success.newTag=false;addTag(newTag);newTag=null;success.newTag=errors?false:true;" name="addTag" class="text-white px-2 my-2 rounded-sm bg-teal-400 hover:bg-teal-700 focus:outline-none cursor-pointer">apply</button>
          <fa-icon v-show="success.newTag && !newTag" :icon="['fas', 'check-circle']" size="2x" color="darkGreen"/>
        </div>
      </div>
      <div class="flex flex-col my-6 md:my-8 mx-2 border-b-2 border-gray-700 hover:border-green-800">
        <label for="removeTag" class="text-left text-xs">Remove Tag:</label>
        <div class="flex justify-between">
          <select 
            v-model="removeTag"
            id="removeTag"
            name="removeTag"
            class="w-1/2 ml-1 py-3" 
            :class="{ 'bg-black':toggle }"
            >
            <option value="" disabled>select tag</option>
            <option v-for="(tag, index) in tags" :key="tag+index">{{tag}}</option>
          </select>
          <button v-show="removeTag" @click.prevent="success.removeTag=false;dropTag(removeTag);removeTag=null;success.removeTag=errors?false:true;" name="dropTag" class="text-white px-2 my-1 rounded-sm bg-teal-400 hover:bg-teal-700 focus:outline-none cursor-pointer">apply</button>
          <fa-icon v-show="success.removeTag && !removeTag" :icon="['fas', 'check-circle']" size="2x" color="darkGreen"/>
        </div>
      </div>
      <div class="flex flex-col my-6 md:my-8 mx-2 border-b-2 border-gray-700 hover:border-green-800">
        <label for="appColors" class="text-left text-xs">App colors:</label>
        <div class="flex justify-between">
          <select 
            v-model="appColors"
            id="appColors"
            name="appColors"
            class="w-1/2 ml-1 py-3" 
            :class="{ 'bg-black':toggle }"
            >
            <option value="" disabled>select palette</option>
            <option v-for="(color, index) in colors" :key="color+index">{{color}}</option>
          </select>
          <button v-show="appColors" @click.prevent="success.appColors=false;setColors(appColors);appColors=null;success.appColors=errors?false:true;" name="setColors" class="text-white px-2 my-1 rounded-sm bg-teal-400 hover:bg-teal-700 focus:outline-none cursor-pointer">apply</button>
          <fa-icon v-show="success.appColors && !appColors" :icon="['fas', 'check-circle']" size="2x" color="darkGreen"/>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import ErrorList from '@/components/ErrorList'
export default {
  components: {
    ErrorList
  },
  props: {
    toggle: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      newTag: null,
      removeTag: null,
      appColors: null,
      success: {
        newTag: false,
        removeTag: false,
        appColors: false
      }
    }
  },
  computed: mapState({
    tags: state => state.appSettings.tags,
    colors: state => state.appSettings.colorPallette,
    errors: state => state.errors.appSettings
  }),
  methods: mapActions([
    'addTag',
    'dropTag',
    'setColors'
  ])
}
</script>