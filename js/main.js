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
    beforeEditCache: null
  }),
  methods: {
    addTask: function(event, value) {
      let task = this.$refs.task
      this.todos.push({
        task: task.value,
        isDone: false
      })
    },
    deleteTask: function(index) {
      this.todos.splice(index, 1)
    },
    editTodo(todo) {
      this.beforeEditCache = todo
    },
    doneEdit(todo) {
      if (!this.beforeEditCache) {
        return;
      }
      this.beforeEditCache = null;
      const task = todo.task.trim()
      if (task) {
        todo.task = task
      } else {
        this.deleteTask(todo)
      }
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