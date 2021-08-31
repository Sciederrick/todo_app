import axios from 'axios';

const state = {
  todos: [],
  systemInfo: {
    addTodo: {
      showFormHeader: false,
      showSpinner: false,
      showFormStatus: false,
    }
  },
  errors: {
    fetchTodos: '',
    addTodo: '',
    deleteTodo: ''
  }
};

// const getters = {
//   allTodos: state => state.todos,
//   getAddTodoFormHeader: state => state.systemInfo.addTodo.showFormHeader,
//   getAddTodoSpinner: state => state.systemInfo.addTodo.showSpinner,
//   getAddTodoFormStatus: state => state.systemInfo.addTodo.showFormStatus,
//   getFetchTodoFormErrors: state => state.errors.fetchTodos,
//   getAddTodoFormErrors: state => state.errors.addTodo,
//   getDeleteTodoFormErrors: state => state.errors.deleteTodo
// };

const actions = {
  async fetchTodos({ commit }){
    const url = '/api/todos'
    try{
      const response = await axios.get(url, {timeout:20000})
      const todos = response.data.sort((a, b)=>{
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
      })
      commit('setTodos', todos)
    }catch(err){
      commit('fetchTodoFormErrors', err)
    }
  },
  async addTodo({ commit }, task){
    commit('addTodoFormHeader', false)
    commit('addTodoFormSpinner', true)
    const url = '/api/todos'
    try{
      await axios.post(url, task, {timeout:20000})
      commit('newTodo', task);
      commit('addTodoFormStatus', true)
      commit('addTodoFormHeader', true)
      commit('addTodoFormSpinner', false)
      // setTimeout(()=>commit('addTodoFormStatus', true), 10000)
    }catch(err){
      commit('addTodoFormErrors', err.response.data.error)
      commit('addTodoFormStatus', false)
      commit('addTodoFormHeader', true)
      commit('addTodoFormSpinner', false)
    }
  },
  async deleteTodo({ commit }, todo){
    const url = `/api/todos/${todo.deadline}/${todo.id}`
    try{
      await axios.delete(url, {timeout:20000})
      commit('removeTodo', todo.id);
    }catch(err){
      commit('deleteTodoFormErrors', err)
    }
  },
};

const mutations = {
  setTodos: (state, todos) => state.todos = todos,
  newTodo: (state, todo) => state.todos.unshift(todo),
  removeTodo: (state, _id) => state.todos = state.todos.filter(todo => todo._id !== _id),
  addTodoFormHeader: (state, bool) => state.systemInfo.addTodo.showFormHeader = bool,
  addTodoFormSpinner: (state, bool) => state.systemInfo.addTodo.showSpinner = bool,
  addTodoFormStatus: (state, bool) => state.systemInfo.addTodo.showFormStatus = bool,
  fetchTodoFormErrors: (state, msg) => state.errors.fetchTodos = msg,
  addTodoFormErrors: (state, msg) => state.errors.addTodo = msg,
  deleteTodoFormErrors: (state, msg) => state.errors.deleteTodo = msg
};

export default {
  state,
  actions,
  mutations
};
