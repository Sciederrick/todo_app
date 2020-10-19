<template>
<div class="fixed inset-0 h-screen w-screen overflow-x-hidden flex flex-col items-center justify-center bg-teal-lightest font-sans bg-yellow-500 bg-opacity-75 z-10">
	<div v-if="modal.visible" @click.self="modal.visible = true" class="h-screen w-full absolute flex items-center justify-center">
      <div class="relative bg-white rounded shadow p-8 m-4 max-h-full text-center overflow-y-auto">
        <fa-icon @click="$router.go(-1)" class="absolute top-0 right-0 m-1 text-2xl cursor-pointer" :icon="['fas', 'times']" color="maroon" size="1x"/>
        <div class="mb-8">
            <div v-if="!post.status" class="text-sm h-8 p-1">
							<p v-if="!post.loading"><span class="text-base">&#9749;</span> Lets plan some tasks!</p>
							<p v-else><fa-icon :icon="['fas','spinner']" size="2x" color="darkBlue" spin/></p>
						</div>
						<div v-else :class="[post.success ? 'bg-green-200' : 'bg-red-200']" class="w-full h-8">
							<p v-if="post.success" class="p-1">
								<fa-icon class="float-left m-1 text-lg" :icon="['fas','check-circle']" size="1x" color="green"/>
								<span class="text-center text-sm text-green-800 font-mono">Task added successfully</span>
							</p>
							<p v-else class="p-1">
								<fa-icon class="float-left m-1 text-lg" :icon="['fas','exclamation-circle']" size="1x" color="maroon"/>
								<span class="text-center text-sm text-red-800 font-mono">{{post.errorMessage}}</span>
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
									<input class="w-full mr-1 border-0 focus:outline-none" v-model="task.deadline" type="date" name="deadline">
								</div>
								<div class="flex justify-between w-full my-8 mx-2 border-b-2 border-gray-700 hover:border-green-800">
									<select class="w-full ml-1" v-model="task.priority">
										<option disabled value="">priority</option>
										<option>Critical</option>
										<option>Important</option>
										<option>Optional</option>
									</select>
								</div>
							</div>
              <div class="flex justify-center items-center my-8 mx-2">
                <select class="focus:outline-none" v-model="task.tag">
                  <option disabled value="">select tag</option>
                  <option>Programming</option>
                  <option>Lifestyle</option>
                  <option>Fitness</option>
                </select>
              </div>
            </form>
        </div>
        <div class="flex justify-center h-10">
            <button v-show="!post.loading" @click="postTodo()" class="flex-no-shrink text-white py-2 px-4 rounded bg-teal-400 hover:bg-teal-700 focus:outline-none cursor-pointer">Let's Go</button>
        </div>
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
			task:{
				userId:'1', //@todo: create user auth
				title:'',
				description:'',
				deadline:'',
				priority:'',
				tag:''
			},
			post:{
				status:false,
				success:false,
				loading:false,
				errorMessage:''
			}
    }
  },
	methods:{
		async postTodo(){
			this.post.status = false
			this.post.loading = true
			const url = '/api/todos'
			try{
				await this.$axios.post(url, this.task, {timeout:20000})
				this.post.status = true
				this.post.success = true
				this.post.loading = false
				setTimeout(()=>this.post.status = false, 10000)
			}catch(err){
				this.post.errorMessage = err.response.data.error
				this.post.status = true
				this.post.success = false
				this.post.loading = false
			}
		}
	}
}
</script>
