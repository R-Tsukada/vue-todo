const app = Vue.createApp({
  data:() => ({
    newTodo: '',
    todos: []
  }),
  methods: {
    addTask: function(event) {
      console.log('success')
      let todo = {
        task: this.newTodo,
      }
      this.todos.push(todo)
    }
  }
})
app.mount('#app')