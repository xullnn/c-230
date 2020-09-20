let Todo = {
    dueDateOf: function(todo) {
      if (todo.year.length > 0 && todo.month.length > 0) {
        return todo.month + "/" + todo.year.slice(2);
      } else {
        return "No Due Date"
      }
    },

    getAllTodos: function() { // return promise resolve to an array of todo objects
      return fetch('http://localhost:3000/api/todos').then(response => response.json());
    },

    createTodo: function(param) {
      console.log(JSON.stringify(param))
      return new Promise((resolve) => {
        let xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost:3000/api/todos');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.addEventListener('load', () => {
          resolve(xhr)
        })
        xhr.send(JSON.stringify(param));
      })
    },

    updateTodo: function(param, id) {
      return new Promise((resolve) => {
        let xhr = new XMLHttpRequest();
        xhr.open('PUT', 'http://localhost:3000/api/todos/' + id);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.addEventListener('load', () => {
          resolve(xhr.response)
        })
        xhr.send(JSON.stringify(param));
      })
    },

    getTodoById: function(id) { // don't have to fetch single item from server just get it from App.lists.todos
      // return fetch('http://localhost:3000/api/todos/' + id).then(response => response.json())
      return App.lists.todos.find(e => e.id == id) // in order to return a promise
    },

    deleteTodoById: function(id) {
      return new Promise((resolve) => {
        let xhr = new XMLHttpRequest();
        xhr.open('DELETE', 'http://localhost:3000/api/todos/' + id);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.addEventListener('load', () => {
          resolve(xhr.response)
        })
        xhr.send();
      })
    },

    sortTodosByCompletion: function(todos) { // move completed items to bottom
      let notYet = todos.filter(todo => todo.completed === false);
      let completed = todos.filter(todo => todo.completed === true);
      return notYet.concat(completed);
    },

    groupTodosByDates: function(todos) {
      let uniqueDates = uniqueArray(todos.map(todo => todo.month  + "/" + todo.year.slice(2))),
          result = {};

      uniqueDates.forEach(date => {
        [month, year] = date.split("/");
        result[date] = todos.filter(todo => todo.year.slice(2) === year && todo.month === month)
      })

      return result;
    },
  };

let dataset = [
  {title: 'Make coffee',     day: '02',  month: '10', year: '2021', completed: false, description: 'Energize yourself with coffee',},
  {title: 'Learn to swim',   day: '29', month: '03',  year: '2022', completed: false, description: 'Almost got it...',},
  {title: 'Reading',         day: '',   month: '10',  year: '2021', completed: false, description: 'Keep reading, do not stop',},
  {title: 'Practice Tennis', day: '22', month: '',   year: '2015', completed: true,  description: 'Love tennis.',},
  {title: 'Go to the beach', day: '13', month: '10',  year: '2021', completed: true,  description: 'This happens when I have mastered swimming.',},
  {title: 'Latern Festival', day: '01',  month: '01',  year: '2023', completed: false, description: 'Messed up with Spring Festival',},
  {title: 'Buy fish',        day: '25', month: '08',  year: '2024', completed: true,  description: 'Eating fish is good for your health',},
  {title: 'Go dating',                  month: '',   year: '2023', completed: false, description: 'Go dating, be crazy',},
  {title: 'See dentist',     day: '12',                            completed: false, description: 'An important routine',},
  {title: 'Writing assay',                                                           description: 'This is a crucial skill',},
  {title: 'Nobody knows who created this item...',},
];

function batchCreatingTodo(dataset) {
  dataset.forEach(param => Todo.createTodo(param));
};

function resetDataBase() {
  fetch('http://localhost:3000/api/reset');
}
