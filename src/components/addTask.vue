<template>
	<div class="w-full h-3/4 flex items-center justify-center">
		<div class="w-full md:w-1/2 bg-white rounded shadow p-4 m-4 mt-10 max-h-full text-center overflow-y-auto">
			<div class="mb-8">
				<div 
					v-if="!formHeader" 
					class="text-sm h-4 md:h-8 p-1">
					<p 
						v-if="!formSpinner"><span class="text-base md:text-lg">&#9749;</span> Lets plan some tasks!</p>
					<p 
						v-else><fa-icon :icon="['fas','spinner']" size="2x" color="darkBlue" spin/></p>
				</div>
				<div 
					v-else 
					:class="[formStatus ? 'bg-green-200' : 'bg-red-200']" 
					class="w-full h-8">
					<p 
						v-if="formStatus" 
						class="p-1">
						<fa-icon class="float-left m-1 text-lg" :icon="['fas','check-circle']" size="1x" color="green"/>
						<span class="text-center text-sm text-green-800 font-mono">Task added successfully</span>
					</p>
					<p v-else class="p-1">
						<fa-icon class="float-left m-1 text-lg" :icon="['fas','exclamation-circle']" size="1x" color="maroon"/>
						<span class="text-center text-sm text-red-800 font-mono">{{formErrorMessage||'Something went wrong...'}}</span>
					</p>
				</div>
				<form>
					<div class="flex flex-col my-8 mx-2 border-b-2 border-gray-700 hover:border-green-800">
						<label class="text-left text-xs">Title:<span class="text-red-500 pl-4 font-hairline opacity-50">(* required)</span></label>
						<input class="w-full py-3 pl-2 md:pl-8 border-0 focus:outline-none placeholder-blue-300" v-model="task.title" type="text" placeholder="UI/UX Design" autocomplete="on" required>
					</div>
					<div class="flex flex-col my-8 mx-2 border-b-2 border-gray-700 hover:border-green-800">
						<label class="text-left text-xs">Description:</label>
						<textarea class="w-full border-0 focus:outline-none" v-model="task.description" name="description"></textarea>
					</div>
					<div class="flex justify-between">
						<div class="flex justify-between w-full my-8 mx-2 border-b-2 border-gray-700 hover:border-green-800">
							<input class="w-full mr-1 border-0 focus:outline-none" v-model="task.deadline" type="date" name="deadline" required>
						</div>
						<div class="flex justify-between w-full my-8 mx-2 border-b-2 border-gray-700 hover:border-green-800">
							<select class="w-full ml-1 py-3" v-model="task.priority" required>
								<option disabled value="">priority</option>
								<option>Critical</option>
								<option>Important</option>
								<option>Optional</option>
							</select>
						</div>
					</div>
					<div class="flex justify-center items-center my-8 mx-2">
						<select class="py-3 focus:outline-none" v-model="task.tag" required>
							<option disabled value="">select tag</option>
							<option v-for="(tag, index) in tags" :key="tag+index">{{tag}}</option>
						</select>
					</div>
					<div class="flex justify-center h-10">
							<button v-show="!formSpinner" type="submit" @click.prevent="postTodo(task)" class="flex-no-shrink text-white py-2 px-4 rounded bg-teal-400 hover:bg-teal-700 focus:outline-none cursor-pointer">Let's Go</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default{
  data(){
    return{
			task:{
				deadline:'',
				title:'',
				description:'',
				priority:'',
				tag:''
			},
    }
  },
	computed: mapState({
		'formHeader': state => state.systemInfo.addTodo.showFormHeader,
		'formSpinner': state => state.systemInfo.addTodo.showSpinner,
		'formStatus': state => state.systemInfo.addTodo.showFormStatus,
		'formErrorMessage': state => state.errors.addTodo,
		'tags': state => state.appSettings.tags
  }),
	methods: mapActions({
		postTodo: 'addTodo'
	})
}
</script>
