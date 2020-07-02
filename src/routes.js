import blankTask from './components/blankTask.vue'
import addTask from './components/addTask.vue'
import myTodos from './components/myTodos.vue'

export default [
  {path:'/', component:blankTask},
  {path:'/add', component:addTask},
  {path:'/todos', component:myTodos}
]
