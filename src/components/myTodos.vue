<template>
  <div class="mt-2 py-2 mx-auto lg:w-4/5">
    <div class="mx-2 mb-6 flex flex-col flex-wrap justify-center items-stretch  flex-grow md:flex-row md:justify-start">
      <div v-for="todo in allTodos" :key="todo._id" class="relative p-2 border border-4 border-white bg-red-200 md:w-1/3 lg:w-1/4">
        {{todo.title}}
        <button @click="deleteTodo(todo._id)" class="btn absolute bottom-0 right-0 bg-transparent text-red-800" style="cursor:pointer;"><i class="far fa-trash-alt"></i></button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  methods: {
    ...mapActions(['fetchTodos', 'deleteTodo'])
  },
  computed: mapGetters(['allTodos']),
  created(){
    this.fetchTodos();
  }
}
</script>
