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
    addTask: function(event) {
      console.log('success')
      let todo = {
        task: this.newTodo,
      }
      this.todos.push(todo)
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