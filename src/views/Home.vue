<template>
  <div class="clear-both px-2 pt-2 lg:pl-8 md:pt-0 text-sm md:text-base" id="main">
    <ErrorList v-if="deleteErrors" :error="deleteErrors"/>
    <!-- component -->
    <div class="relative w-7/8 m-2 md:m-8 md:mt-0">
      <div class="border-r-2 border-gray-500 absolute h-full top-0 linePosition"></div>
      <ul class="list-none m-0 p-0">
        <li 
          v-for="todo in todos" 
          :key="todo._id" 
          class="mb-2">
            <div class="flex items-center mb-1">
              <div class="bg-gray-500 rounded-full h-3 w-3 md:h-8 md:w-8"></div>
              <div class="flex-1 ml-2 font-mono md:font-medium text-xs md:text-base lg:text-lg text-blue-600">
                <sup>{{new Date(todo.deadline).toString().split(" ")[0]}}</sup>
                {{new Date(todo.deadline).toString().split(" ")[2]}},
                {{new Date(todo.deadline).toString().split(" ")[1]}}
                {{new Date(todo.deadline).toString().split(" ")[3]}}
              </div>
            </div>
            <div class="flex flex-wrap">
              <!-- card container -->
              <div 
                v-for="task in todo.todos" 
                :key="task._id" 
                class="m-4 ml-8 lg:ml-24">
                <!-- card -->
                <div class="max-w-sm md:max-w-xs flex flex-no-wrap">
                  <div class="rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden opacity-75" style="width:30px;">
                    <img class="h-full w-full object-cover" :src="require(`@/assets/img/hugo-barbosa-TnG2q8FtXsg-unsplash.jpg`)" alt="tag">
                  </div>
                  <div class="relative border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal" style="width:220px;">
                    <div class="mb-1">
                      <button 
                        :id="task._id" 
                        @click.prevent="deleteTodo(todo._id, task._id)" 
                        type="submit" 
                        class="absolute right-0 top-0 m-1 px-2 hover:bg-gray-200 focus:outline-none">
                        <fa-icon :icon="['fas', 'times']" color="red"/>
                      </button>
                      <div class="text-gray-900 font-bold text-base mb-2">{{task.title}}</div>
                      <p class="pb-4 text-gray-700 text-xs">{{task.description}}</p>
                      <span class="absolute right-0 bottom-0 m-1 rounded text-xs text-red-500">
                        {{task.priority}}
                      </span>
                      <span class="absolute left-0 bottom-0 m-1 ml-3 rounded text-xs text-red-500">
                        <fa-icon 
                          v-if="task.completed" 
                          :icon="['fas', 'check-circle']" 
                          color="green"/>
                        <fa-icon 
                          v-else 
                          :icon="['fas', 'hourglass-half']" 
                          color="gold"/>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="todo.todos.length==2||todo.todos.length==1" class="hidden lg:block ml-4 md:ml-16 opacity-25">
                <!-- dummy card placeholder -->
                <div class="relative w-48">
                  <div class="w-full bg-gray-600 my-2 border-8 rounded-lg border-gray-500"></div>
                  <div class="w-full bg-gray-500 my-6 border rounded-lg border-gray-500"></div>
                  <div class="w-full bg-gray-500 my-6 border rounded-lg border-gray-500"></div>
                  <div class="w-full bg-gray-500 my-6 border rounded-lg border-gray-500"></div>
                  <div class="absolute right-0 w-1/4 bg-gray-500 mb-4 border rounded-lg border-gray-500"></div>
                </div>
              </div>
              <div v-if="todo.todos.length==1" class="hidden lg:block ml-4 md:ml-16 opacity-25">
                <!-- dummy card placeholder -->
                <div class="relative w-48">
                  <div class="w-full bg-gray-600 my-2 border-8 rounded-lg border-gray-500"></div>
                  <div class="w-full bg-gray-500 my-6 border rounded-lg border-gray-500"></div>
                  <div class="w-full bg-gray-500 my-6 border rounded-lg border-gray-500"></div>
                  <div class="w-full bg-gray-500 my-6 border rounded-lg border-gray-500"></div>
                  <div class="absolute right-0 w-1/4 bg-gray-500 mb-4 border rounded-lg border-gray-500"></div>
                </div>
              </div>
          </div>
          </li>
          <li v-if="todos.length==0" class="mb-2">
            <div class="flex items-center mb-1">
              <div class="bg-gray-500 rounded-full h-3 w-3 md:h-8 md:w-8"></div>
              <div class="flex-1 ml-2 font-mono md:font-medium text-xs md:text-base lg:text-lg text-blue-600">
                <sup>{{new Date().toDateString().split(' ')[0]}}</sup>
                {{new Date().toDateString().split(' ')[2]}},
                {{new Date().toDateString().split(' ')[1]}}
                {{new Date().toDateString().split(' ')[3]}}
                {{new Date().toDateString().split(' ')[4]}} - Track your todos today
              </div>
            </div>
            <div class="ml-8 md:ml-16">
              v0.1.0 - v0.2.2
              <p class="text-gray-700 text-xs">
              Coz failing to plan is planning to fail.
              </p>
              <p class="text-gray-700 text-xs pb-4">
              Add and delete todos in the most fun interactive interface, curated by d* enterprises
              </p>
            </div>
            <div class="flex flex-wrap">
              <div class="lg:block ml-12 md:ml-16 opacity-25">
                <!-- dummy card placeholder -->
                <div class="relative w-48">
                  <div class="w-full bg-gray-600 my-2 border-8 rounded-lg border-gray-500"></div>
                  <div class="w-full bg-gray-500 my-6 border rounded-lg border-gray-500"></div>
                  <div class="w-full bg-gray-500 my-6 border rounded-lg border-gray-500"></div>
                  <div class="w-full bg-gray-500 my-6 border rounded-lg border-gray-500"></div>
                  <div class="absolute right-0 w-1/4 bg-gray-500 mb-4 border rounded-lg border-gray-500"></div>
                </div>
              </div>
              <div class="hidden md:block ml-4 md:ml-16 opacity-25">
                <!-- dummy card placeholder -->
                <div class="relative w-48">
                  <div class="w-full bg-gray-600 my-2 border-8 rounded-lg border-gray-500"></div>
                  <div class="w-full bg-gray-500 my-6 border rounded-lg border-gray-500"></div>
                  <div class="w-full bg-gray-500 my-6 border rounded-lg border-gray-500"></div>
                  <div class="w-full bg-gray-500 my-6 border rounded-lg border-gray-500"></div>
                  <div class="absolute right-0 w-1/4 bg-gray-500 mb-4 border rounded-lg border-gray-500"></div>
                </div>
              </div>
              <div class="hidden lg:block ml-4 md:ml-16 opacity-25">
                <!-- dummy card placeholder -->
                <div class="relative w-48">
                  <div class="w-full bg-gray-600 my-2 border-8 rounded-lg border-gray-500"></div>
                  <div class="w-full bg-gray-500 my-6 border rounded-lg border-gray-500"></div>
                  <div class="w-full bg-gray-500 my-6 border rounded-lg border-gray-500"></div>
                  <div class="w-full bg-gray-500 my-6 border rounded-lg border-gray-500"></div>
                  <div class="absolute right-0 w-1/4 bg-gray-500 mb-4 border rounded-lg border-gray-500"></div>
                </div>
              </div>
              <div class="hidden lg:block ml-4 md:ml-16 opacity-25">
                <!-- dummy card placeholder -->
                <div class="relative w-48">
                  <div class="w-full bg-gray-600 my-2 border-8 rounded-lg border-gray-500"></div>
                  <div class="w-full bg-gray-500 my-6 border rounded-lg border-gray-500"></div>
                  <div class="w-full bg-gray-500 my-6 border rounded-lg border-gray-500"></div>
                  <div class="w-full bg-gray-500 my-6 border rounded-lg border-gray-500"></div>
                  <div class="absolute right-0 w-1/4 bg-gray-500 mb-4 border rounded-lg border-gray-500"></div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
  </div>
</template>

<script>
import {bus} from '@/main.js'
import ErrorList from '@/components/ErrorList.vue'
export default{
  components: {
    ErrorList
  },
  data() {
    return {
      index: 0
    }
  },
  computed: {
    todos() {
      return this.$store.getters.allTodos
    },
    deleteErrors() {
      return this.$store.getters.getDeleteTodoFormErrors
    }
  },
  methods:{
    fetchTodos() {
      this.$store.dispatch('fetchTodos')
    },
    deleteTodo(deadline_id, todo_id) {
      const todo = {deadline: deadline_id, id:todo_id}
      this.$store.dispatch('deleteTodo', todo)
      this.fetchTodos()
    },
    todoAdded(todo) {
      this.$store.dispatch('addTodo', todo)
      this.fetchTodos()
    }
  },
  created(){
    this.fetchTodos()
    bus.$on('todo added', todo => this.todoAdded(todo))
  }
}
</script>

<style scoped>
/* 'sm': '640px', */
/* @media (min-width: 640px) { */
  .linePosition{
    left:5px;
  }
/* } */

/* 'md': '768px', */
@media (min-width: 768px) {
  .linePosition{
    left:15px;
  }
}
</style>
