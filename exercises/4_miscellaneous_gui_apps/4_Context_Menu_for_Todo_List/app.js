var todoItems = [{id: 1, title: 'Homework'},
                {id: 2, title: 'Shopping'},
                {id: 3, title: 'Calling Mom'}];

var App = {
  todos: todoItems,
  todosTemplate: Handlebars.compile($('#todos_template').html()),
  confirmTemplate: Handlebars.compile($('#confirm_template').html()),
  $todos: $('ul#todos'),
  $confirm: $('.confirm_prompt'),
  $contextMenu: $('.context_menu'),
  contextMenuTemplate: Handlebars.compile($('#context_menu_template').html()),

  renderTodos: function() {
    this.$todos.html(this.todosTemplate({ todos: this.todos }));
  },

  handleDeleteClick: function(e) {
    e.preventDefault();
    var todoId   = Number($(e.target).closest('li').attr('data-id'));
    this.showPrompt(todoId);
  },

  handleConfirmYes: function(e) {
    e.preventDefault();
    todoId = Number($(e.target).closest('.confirm_wrapper').attr('data-id'));
    this.removeTodo(todoId);
  },

  removeTodo: function(id) {
    this.todos = this.todos.filter(function(todo) {
      return todo.id !== id;
    });

    this.hidePrompt();
    this.renderTodos();
  },

  showPrompt: function(todoId) {
    this.$confirm.html(this.confirmTemplate({id: todoId}));
    this.$confirm.add('.overlay').fadeIn(300);
    this.bindPromptEvents();
  },

  bindPromptEvents: function() {
    this.$confirm.one('click', '.confirm_no', this.hidePrompt.bind(this));
    this.$confirm.one('click', '.confirm_yes', this.handleConfirmYes.bind(this));
  },

  hidePrompt: function() {
    this.$confirm.add('.overlay').hide();
  },

  handleContextMenu: function(e) {
    var left  = e.clientX;
    var top = e.clientY;
    var id    = +$(e.target).attr('data-id');

    this.displayContextMenu(id, {left: left, top: top});
    return false;
  },

  displayContextMenu: function(id, coords) {
    this.hideContextMenu();
    this.$contextMenu.html(this.contextMenuTemplate({id: id}));
    this.$contextMenu.fadeIn(300);
    this.$contextMenu.offset(coords);
    this.$contextMenu.one('click', '.remove', this.handleDeleteClick.bind(this));
  },

  hideContextMenu: function() {
    this.$contextMenu.hide();
  },

  init: function() {
    this.renderTodos();
    this.$todos.on('contextmenu', 'li', this.handleContextMenu.bind(this));
    $('.overlay').on('click', this.hidePrompt.bind(this));
    $(document.body).on('click', this.hideContextMenu.bind(this));
  }
};

App.init();
