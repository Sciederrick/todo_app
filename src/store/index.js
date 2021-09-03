import Vue from 'vue';
import Vuex from 'vuex';
import webStorage from './../webStorage'
import { v4 as uuidv4 } from 'uuid';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    todos: [],
    appSettings: {
      defaultTags: ['Programming', 'Lifestyle'],
      tags: [],
      colorPallette: ['default', 'dark', 'warm', 'techy'],
      colors: 'default'
    },
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
      deleteTodo: '',
      appSettings: ''
    }
  }, 
  getters: {
    getTodoDeadline: (state) => (deadline) => {
      return state.todos.findIndex(todo => todo.deadline === deadline)
    }
  },
  actions: {
    async fetchTodos({ commit }){
      const todosTable = webStorage.initForage().todos
      let todos = []
        todosTable.iterate((value, key, iterationNumber) => {
          let item = {
            _id: iterationNumber,
            deadline: '',
            todos: []
          }
          item.deadline = key
          item.todos = value
          todos.push(item)
        }).then(() => {
          // Iteration has completed
          commit('setTodos', todos)
        }).catch((err) => {
          // This code runs if there were any errors
          commit('fetchTodoFormErrors', err)
        });

    },
    async addTodo({ getters, commit }, task){
      const todosTable = webStorage.initForage().todos
      commit('addTodoFormHeader', false)
      commit('addTodoFormSpinner', true)
      //  Create new object called rest without deadline
      const omit = task.deadline
      const rest = {
        _id: uuidv4(),
        description: task.description,
        priority: task.priority,
        tag: task.tag,
        title: task.title
      }
      //  Find deadline
      const keys = await todosTable.keys()
      if(keys.indexOf(task.deadline) > -1) {// If found push to existing deadline
        todosTable.getItem(task.deadline).then((value) => {
          value.push(rest)
          todosTable.setItem(task.deadline, value).then((value) => {
            const index = getters.getTodoDeadline(task.deadline)
            commit('updateTodo', {index:index, item:value})
            commit('addTodoFormStatus', true)
            commit('addTodoFormHeader', true)
            commit('addTodoFormSpinner', false)
          }).catch(function(err) {
            // This code runs if there were any errors
            commit('addTodoFormErrors', err)
            commit('addTodoFormStatus', false)
            commit('addTodoFormHeader', true)
            commit('addTodoFormSpinner', false)
          });
        }).catch((err) => {
          commit('addTodoFormErrors', err)
          commit('addTodoFormStatus', false)
          commit('addTodoFormHeader', true)
          commit('addTodoFormSpinner', false)
        });
      } else {
        //  Create new deadline
        const todo = [rest]
        todosTable.setItem(omit, todo).then((value) => {
          /**
           * Reconstruct FE object
           * {
           *  deadline:'',
           *  todos: [
           *    _id: String,
           *    completed: bool,
           *    description: String,
           *    priority: String,
           *    tag: String,
           *    title: String
           *  ]
           * }
           */
          const FE_Object = {
            deadline: omit,
            todos: [value]
          }
          commit('newTodo', FE_Object);
          commit('addTodoFormStatus', true)
          commit('addTodoFormHeader', true)
          commit('addTodoFormSpinner', false)
        }).catch((err) => {
          // This code runs if there were any errors
          commit('addTodoFormErrors', err)
          commit('addTodoFormStatus', false)
          commit('addTodoFormHeader', true)
          commit('addTodoFormSpinner', false)
        });
      }
    },
    async deleteTodo({ commit, dispatch }, todo){
      try {
        const todosTable = webStorage.initForage().todos
        const todosWithCommonDeadline = await todosTable.getItem(todo.deadline)
        const updatedTodo = todosWithCommonDeadline.filter(todoItem => todoItem._id !== todo.id)
        if(updatedTodo.length > 0) {
          // update deadline
          await todosTable.setItem(todo.deadline, updatedTodo)
          console.log(todo.id, todo.index)
          commit('removeTodoById', {_id:todo.id, index:todo.index})
          dispatch('fetchTodos')
          /**
           * implement deep watcher for component update
           */
        } else {
          // clear the empty deadline
          await todosTable.removeItem(todo.deadline)
          commit('removeTodosByDeadline', todo.deadline)
        }

      } catch(e) {
        commit('deleteTodoFormErrors', e)
      }
    },
    async initAppSettings({ state, commit }) {
      try {
        const settingsTable = webStorage.initForage().settings
        const settings = await settingsTable.keys()
        if(settings.indexOf('tags') === -1) { // If no tags in webStorage
          const value = await settingsTable.setItem('tags', [...state.appSettings.defaultTags])
          commit('setTags', value)
        } else { 
          const value = await settingsTable.getItem('tags')
          commit('setTags', value)
        }

        if(!settings.indexOf('appColors') > -1) { // If no appColors in webStorage
          const value = await settingsTable.setItem('appColors', state.appSettings.colors)
          commit('setColors', value)
        } else {
          const value = await settingsTable.getItem('appColors')
          commit('setColors', value)
        }
      } catch(e) {
        commit('appSettingsErrors', e)
      }
    },
    async addTag({ commit }, tag) {
      try {
        const settingsTable = webStorage.initForage().settings
        const settings = await settingsTable.keys()
        if(settings.indexOf('tags') > -1) {
          let value = await settingsTable.getItem('tags')
          value.push(tag)
          value = await settingsTable.setItem('tags', value)
          commit('setTags', value)
        }
      } catch(e) {
        commit('appSettingsErrors', e)
      }
    },
    async dropTag({ commit }, tag) {
      try {
        const settingsTable = webStorage.initForage().settings
        const settings = await settingsTable.keys()
        if(settings.indexOf('tags') > -1) {
          let tags = await settingsTable.getItem('tags')
          let indexOfTagToDrop = tags.indexOf(tag)
          tags.splice(indexOfTagToDrop, 1)
          const value = await settingsTable.setItem('tags', tags)
          commit('setTags', value)
        }
      } catch(e) {
        commit('appSettingsErrors', e)
      }
    },
    async setColors({ commit }, colors) {
      try {
        const settingsTable = webStorage.initForage().settings
        const settings = await settingsTable.keys()
        if(settings.indexOf('appColors') > -1) {
          const value = await settingsTable.setItem('appColors', colors)        
          commit('setColors', value)
        }
      } catch(e) {
        commit('appSettingsErrors', e)
      }
    }
  },  
  mutations: {
    setTodos: (state, todos) => state.todos = todos,
    newTodo: (state, todo) => state.todos.unshift(todo),
    updateTodo: (state, todo) => state.todos[todo.index] = todo.item,
    removeTodosByDeadline: (state, deadline) => state.todos = state.todos.filter(todo => todo.deadline !== deadline),
    removeTodoById: (state, {_id, index}) => state.todos = state.todos[index].todos.filter(todo => todo._id !== _id),
    addTodoFormHeader: (state, bool) => state.systemInfo.addTodo.showFormHeader = bool,
    addTodoFormSpinner: (state, bool) => state.systemInfo.addTodo.showSpinner = bool,
    addTodoFormStatus: (state, bool) => state.systemInfo.addTodo.showFormStatus = bool,
    fetchTodoFormErrors: (state, msg) => state.errors.fetchTodos = msg,
    addTodoFormErrors: (state, msg) => state.errors.addTodo = msg,
    deleteTodoFormErrors: (state, msg) => state.errors.deleteTodo = msg,
    setTags: (state, tags) => state.appSettings.tags = tags,
    setColors: (state, colors) => state.appSettings.colors = colors,
    appSettingsErrors: (state, msg) => state.errors.appSettings =msg
  }
});


