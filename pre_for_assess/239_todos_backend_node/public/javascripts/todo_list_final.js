function uniqueArray(array) {
  let result = [];
  array.forEach(e => {
    if (!result.includes(e)) result.push(e);
  })
  return result;
};

(function() {

let App =  {
    init: async function() {
      this.templates = {};
      this.lists = new Lists();
      await this.lists.init(); // get new data, categorize them
      this.initializePartials();
      this.initializeTemplates();
      this.initializeHTML();
      $("header#all_header").addClass("active");
      this.bindEvents();
      this.inCompletedGroup = false;
    },

    resetFormFields: function(form) {
      form.reset();
      $("option").attr('selected', false);
    },

    initializeHTML: function() {
      document.body.innerHTML = '';
      document.body.insertAdjacentHTML('beforeend', this.templates.main_template(this.lists));
    },
    // update `selected todos` and the count when create/update/complete/delete todo
    // this happens at data level, before calling `initializeHTML`
    updateSelectedAndLength: function() {
      let selected;
      if (this.lists.current_section.title === 'All Todos') {  // choose all todos
        selected = this.lists.todos;
      } else if (this.lists.current_section.title === 'Completed') { // choose all completed
        selected = this.lists.done;
      } else if ($(".active").closest('section')[0].id === 'completed_items') { // at specific 'due_date' in completed group
        selected = this.lists.done_todos_by_date[this.lists.current_section.title] || [];
      } else { // at specific 'due_date' in all todos group
        selected = this.lists.todos_by_date[this.lists.current_section.title] || []
      }

      this.lists.selected = Todo.sortTodosByCompletion(selected)
      this.lists.current_section.data = this.lists.selected.length;
    },

    // update highlighted section in the side bar when create/update/complete/delete todo
    // this happens at view level, after calling `initializeHTML`
    markActive: function() {
      let activeSection;
      if (!this.inCompletedGroup) {
        if (this.lists.current_section.title === 'All Todos') { // focus at 'All Todos' section
          activeSection = document.querySelector("header#all_header")
        } else { // in all todos group but focus at specific 'due_date'
          activeSection = [...document.querySelectorAll('#all dl')].find(el => el.getAttribute('data-title') === this.lists.current_section.title)
        }
      } else {
        if (this.lists.current_section.title === 'Completed') { // focus at 'Completed' section
          activeSection = document.querySelector("header#all_done_header")
        } else { // in completed todos group but focus at specific 'due_date'
          activeSection = [...document.querySelectorAll('#completed_items dl')].find(el => el.getAttribute('data-title') === this.lists.current_section.title)
        }
      };

      $(activeSection).addClass("active");
    },

    serializeFormData: function(form) {
      let formData = new FormData(form);
      let dataObj = {};

      for(let pair of formData.entries()) { dataObj[pair[0]] = pair[1] }

      if (dataObj.day === 'day') dataObj.day = '';
      if (dataObj.month === 'month') dataObj.month = '';
      if (dataObj.year === 'year') dataObj.year = '';

      return dataObj;
    },

    renderForm: function() {
      $(".modal").fadeIn();
      $("#modal_layer").on("click", (e) => {
        $(".modal").fadeOut();
        $('form').off();
        this.resetFormFields($('form')[0])
      });

      $(document).on("keydown", (e) => {
        if (e.key === "Escape") {
          $(".modal").fadeOut();
          $('form').off();
          this.resetFormFields($('form')[0])
        }
      })
    },

    repaintPage: function() {
      this.updateSelectedAndLength();
      this.initializeHTML();
      this.markActive();
    },

    handleCreateNewTodo: function(e) {   // create new form
      e.preventDefault();

      this.renderForm();

      $("form").on('submit', (e) => {
        e.preventDefault();
        let form = e.target,
            dataObj = this.serializeFormData(form);

        if (dataObj.title.trim().length === 0) {
          alert("Todo title cannot be empty");
        } else if (dataObj.title.trim().length < 3) {
          alert("You must enter a title at least 3 characters long.");
        } else {
          Todo.createTodo(dataObj);
          // $(".modal").fadeOut();
          this.lists.init()
            .then(() => {
              this.lists.current_section.title = "All Todos";
              this.inCompletedGroup = false;
            })
           .then(() => this.repaintPage());
        }
      })

      $('form').on('click', "button[name='complete']", (e) => { // update an item
        e.preventDefault();
        alert("Cannot mark as complete as item has not been created yet!");
      });
    },

    handleUpdateTodo: function(e) { // render edit form with id
      e.preventDefault();
      e.stopPropagation(); // prevent click event continues bubbling up to trigger toggle complete of item

      let id = e.target.closest('tr').getAttribute('data-id'),
          theTodo = Todo.getTodoById(id),
          form = document.querySelector('form');

      this.renderForm();
      this.renderDataToForm(theTodo, form);

      $('form').on('submit', (e) => {
        e.preventDefault();
        let form = e.currentTarget,
            param = this.serializeFormData(form);

        Todo.updateTodo(param, id)
          // .then(() => {$(".modal").fadeOut()})
          .then(() => this.lists.init())
          .then(() => this.repaintPage())
      })

      $(form).on('click', "button[name='complete']", (e) => { // mark as completed
        e.preventDefault();
        let form = e.target.closest('form'),
            param = this.serializeFormData(form);

        if (theTodo.completed === true) {
          $(".modal").fadeOut();
          $('form').off();
          this.resetFormFields($('form')[0])
          return;
        }

        param.completed = true;

        Todo.updateTodo(param, id)
          .then(() => this.lists.init())
          .then(() => this.repaintPage())
      });
    },

    handleClickOnSubSections: function(e) { // when click on dates in nav, update Nav selected data set
      e.preventDefault();
      let dl = e.currentTarget,
          due = dl.getAttribute('data-title'), // get due_date like '09/21' without knowing in completed group or not
          currentDl;

      if (dl.closest('section').id === "all") { // determine now in all/completed group
        this.inCompletedGroup = false;
        this.lists.selected = Todo.sortTodosByCompletion(this.lists.todos_by_date[due])
      } else if (dl.closest('section').id === "completed_items") {
        this.inCompletedGroup = true;
        this.lists.selected = Todo.sortTodosByCompletion(this.lists.done_todos_by_date[due])
      };

      this.lists.current_section.title = due;
      this.lists.current_section.data = this.lists.selected.length
      this.initializeHTML();

      // based on 1. group 2.due date, find out the section dl we want to add '.active' class. should be performed after rerender html
      if (!this.inCompletedGroup) {
        currentDl = [...document.querySelectorAll('#all dl')].find(el => el.getAttribute('data-title') === due)
      } else {
        currentDl = [...document.querySelectorAll('#completed_items dl')].find(el => el.getAttribute('data-title') === due)
      }

      currentDl.classList.add("active");
    },

    handleClickOnAllTodosGroup: function(e) { // update selected data set
      e.preventDefault();
      if (e.target.closest('section').id === "all") {
        this.inCompletedGroup = false;
      } else if (e.target.closest('section').id === "completed_items") {
        this.inCompletedGroup = true;
      };

      this.lists.selected = Todo.sortTodosByCompletion(this.lists.todos)
      this.lists.current_section.title = "All Todos";
      this.lists.current_section.data = this.lists.selected.length;
      this.initializeHTML();
      $("header#all_header").addClass("active");
    },

    handleClickOnCompletedGroup: function(e) { // update selected data set
      e.preventDefault();

      if (e.target.closest('section').id === "all") {
        this.inCompletedGroup = false;
      } else if (e.target.closest('section').id === "completed_items") {
        this.inCompletedGroup = true;
      };

      this.lists.selected = Todo.sortTodosByCompletion(this.lists.done)
      this.lists.current_section.title = "Completed";
      this.lists.current_section.data = this.lists.selected.length;
      this.initializeHTML();
      $("header#all_done_header").addClass("active");
    },

    handleToggleComplete: function(e) { // toggle complete
      e.preventDefault();
      let id = e.target.closest('tr').getAttribute('data-id'),
          theTodo = Todo.getTodoById(id);

      theTodo.completed = !theTodo.completed;

      Todo.updateTodo(theTodo, id).then(() => {
        this.lists.init()
          .then(lists => {this.lists = lists})
          .then(() => this.updateSelectedAndLength())
          .then(() => {this.initializeHTML()})
          .then(() => this.markActive());
      })
    },

    handleDeleteTodo: function(e) { // delete a todo
      e.preventDefault();
      let id = e.target.closest('tr').getAttribute('data-id');

      Todo.deleteTodoById(id)
        .then(() => this.lists.init())
        .then(() => this.repaintPage())
    },

    bindEvents: function() {
      $(document.body).on('click', "label[for='new_item']", this.handleCreateNewTodo.bind(this));

      $(document.body).on('click', "tbody label", this.handleUpdateTodo.bind(this));

      $(document.body).on('click', "dl[data-title]", this.handleClickOnSubSections.bind(this));

      $(document.body).on('click', "header#all_header", this.handleClickOnAllTodosGroup.bind(this));

      $(document.body).on('click', "header#all_done_header", this.handleClickOnCompletedGroup.bind(this));

      $(document.body).on('click', "td.list_item", this.handleToggleComplete.bind(this));

      $(document.body).on('click', "td.delete", this.handleDeleteTodo.bind(this));
    },

    renderDataToForm: function(obj, form) {
      for(let key in obj) {
        if (key === 'day') {
          if (obj[key].length > 0) {
            { $(`#due_day option[value=${obj[key]}]`).attr('selected', true) }
          } else {
            { $(`#due_day option[value=day]`).attr('selected', true) }
          }
        } else if (key === 'month') {
          if (obj[key].length > 0) {
            { $(`#due_month option[value=${obj[key]}]`).attr('selected', true) }
          } else {
            { $(`#due_month option[value=month]`).attr('selected', true) }
          }
        } else if (key === 'year') {
          if (obj[key].length > 0) {
            { $(`#due_year option[value=${obj[key]}]`).attr('selected', true) }
          } else {
            { $(`#due_year option[value=year]`).attr('selected', true) }
          }
        } else {
          let field = form.querySelector(`[name=${key}]`);
          if (field) field.value = obj[key]
        }
      }
    },

    initializePartials: function() {
      let partialNodes = [...document.querySelectorAll("[data-type='partial']")];
      partialNodes.forEach(node => {
        Handlebars.registerPartial(String(node.id), String(node.innerHTML))
      })
    },

    initializeTemplates: function() {
      let temp = Handlebars.compile(document.querySelector('#main_template').innerHTML);
      this.templates.main_template = temp;
    },
  }

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

  function Lists() {  // Constructor
    this.todos = [];
    this.todos_by_date = [];
    this.done = [];
    this.done_todos_by_date = [];
    this.selected = undefined;
    this.current_section = undefined;
  };

  Lists.prototype = {
    init: async function() {  // update data, return a promise resolve to an processed object containing all sorts of lists
      let allTodos = await Todo.getAllTodos(); // wait promise resolve to array of all todos, must happen before other subsequent steps
      allTodos.forEach(todo => todo['due_date'] = Todo.dueDateOf(todo))
      this.todos = allTodos; // an instance of `Lists`
      this.categorizeLists();

      if (!this.selected) this.selected = Todo.sortTodosByCompletion(this.todos)
      if (!this.current_section) this.current_section = { title: "All Todos", data: this.selected.length };
      return this;
    },

    categorizeLists: function() {
      let haveDueDate = this.todos.filter(todo => todo.month.length > 0 && todo.year.length > 0);
      let noDueDate = this.todos.filter(todo => todo.month.length === 0 || todo.year.length === 0);
      let doneWithDueDate = haveDueDate.filter(todo => todo.completed === true);
      let doneWithoutDueDate = noDueDate.filter(todo => todo.completed === true);

      this.todos_by_date = Todo.groupTodosByDates(haveDueDate)
      if (noDueDate.length > 0) this.todos_by_date["No Due Date"] = noDueDate;
      this.done = this.todos.filter(todo => todo.completed === true);
      this.done_todos_by_date = Todo.groupTodosByDates(doneWithDueDate);
      if (doneWithoutDueDate.length > 0) this.done_todos_by_date["No Due Date"] = doneWithoutDueDate;
    }
  };

  Lists.prototype.constructor = Lists;
App.init();
})()
