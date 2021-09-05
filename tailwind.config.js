module.exports = {
  purge: {
    enabled:true,
    content: [
    './src/App.vue',
    './src/components/AddTask.vue',
    './src/components/Calendar.vue',
    './src/components/CardSkeleton.vue',
    './src/components/DummyNoTodoCard.vue',
    './src/components/ErrorList.vue',
    './src/components/Nav.vue',
    './src/components/Settings.vue',
    './src/components/Tasks.vue'
  ]
  },
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
}
