import axios from 'axios';

const state = {
  todos: []
};

const getters = {
  allTodos: state => state.todos
};

const actions = {
  async fetchTodos({ commit }){
    const response = await axios.get('http://localhost:3000/todos');
    commit('setTodos', response.data);
  },
  async addTodo({ commit }, {title, datetime}){
    let response = await axios.post('http://localhost:3000/todos',
    {
     title,
     datetime,
     completed:false,
    });
    commit('newTodo', response.data);
  },
  async deleteTodo({ commit }, _id){
    await axios.delete(`http://localhost:3000/todos/${_id}`);
    commit('removeTodo', _id);
  }
};

const mutations = {
  setTodos: (state, todos) => state.todos = todos,
  newTodo: (state, todo) => state.todos.unshift(todo),
  removeTodo: (state, _id) => {
    state.todos = state.todos.filter(todo => todo._id !== _id)
  },
};

export default {
  state,
  getters,
  actions,
  mutations
};
