const STORAGE_KEY = "todos-vuejs";
const todoStorage = {
  fetch() {
    const todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    todos.forEach((todo, index) => {
      todo.id = index;
    });
    todoStorage.uid = todos.length;
    return todos;
  },
  save(todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }
};

const app = Vue.createApp({
  data:() => ({
    newTodo: '',
    todos: todoStorage.fetch(),
  }),
  methods: {
    addTask: function(event, value) {
      let task = this.$refs.task
      this.todos.push({
        task: task.value
      })
    },
    deleteTask: function(index) {
      this.todos.splice(index, 1)
    }
  },

  watch: {
    todos: {
      handler: function(todos) {
        todoStorage.save(todos)
      },
      deep: true
    }
  }
})
app.mount('#app')