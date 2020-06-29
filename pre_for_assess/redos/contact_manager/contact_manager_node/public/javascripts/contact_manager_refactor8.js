(function ContactManager() {
  // private functions
  function debounce(f, duration=500, context) {
    let id;

    return (function(e) {
      if (id) {
        clearTimeout(id);
        id = setTimeout(f.bind(context, e), duration)
      } else {
        id = setTimeout(f.bind(context, e), duration)
      }
    })
  };

  function capitalizeString(string) {
    return string[0].toUpperCase() + string.slice(1).toLowerCase();
  };

  let contacts,
      tags,
      API,
      UI,
      Contact,
      Tag;

  API = { // all functions return promise for the convenience of chainning further rendering operations
    getContacts: function() {
      return new Promise((succ, rej) => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://localhost:3000/api/contacts');
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
          succ(xhr.response)
        })
        xhr.send();
      })
    },

    createContact: function(e) {
      return Promise.resolve().then(() => {
        let xhr = new XMLHttpRequest(),
            formData = new FormData($('form.create_contact')[0]),
            json = this.processFormData(formData),
            jsonData = JSON.stringify(json);

        xhr.open('POST', 'http://localhost:3000/api/contacts/')
        xhr.setRequestHeader('content-type', 'application/json');
        xhr.send(jsonData);
      })
    },

    updateContact: function(e) {
      return Promise.resolve().then(() => {
        let xhr = new XMLHttpRequest(),
            formData = new FormData($('form.edit_contact')[0]);
            formData.set('id', Contact.editingID);

        let json = this.processFormData(formData),
            jsonData = JSON.stringify(json);

        xhr.open('PUT', 'http://localhost:3000/api/contacts/' + Contact.editingID);
        xhr.setRequestHeader('content-type', 'application/json');
        xhr.send(jsonData);
      })
    },

    deleteContact: function(e) {
      return Promise.resolve().then(() => {
        let xhr = new XMLHttpRequest();
        xhr.open('DELETE', 'http://localhost:3000/api/contacts/' + Contact.editingID)
        xhr.send();
      })
    },

    processFormData: function(formData) {
      let json = {};

      formData.forEach((value, key) => {
        if (key === 'tags') {
          json[key] = value.split(/\s*,\s*/).map(s => capitalizeString(s)).join(',');
        } else {
          json[key] = value;
        }
      });

      return json;
    },

  },

  Contact = {
    all: [],
    tagChosenSet: [],
    searchedSet: [],
    debouncedSearch: null,

    getAll: function() { // return a promise
      return API.getContacts().then((contactsObj) => {
        this.all = contactsObj;
      })
    },

    init: function() {
      return this.getAll();
    },

    create: function(e) {
      e.preventDefault();
      API.createContact(e).then(() => this.getAll()).then(() => UI.renderIndex());
    },

    getId: function(e) {
      return e.target.parentElement.nextElementSibling.getAttribute('data-id');
    },

    update: function(e) {
      e.preventDefault();
      API.updateContact(e).then(() => this.getAll()).then(() => UI.renderIndex());
    },

    delete: function(e) {
      this.editingID = this.getId(e);
      if (!window.confirm()) return;
      API.deleteContact().then(() => {
        this.getAll().then(() => {
          $(`[data-id=${this.editingID}]`).closest('div.contact').slideUp();
        })
      })
    },

    filterByChosenTags: function() {
      if (Tag.chosenTags.length === 0) {
        UI.queryingState = 'default';
      } else {
        UI.queryingState = 'inTagFiltering';
        Contact.tagChosenSet = this.all.filter(contact => {
          return Tag.chosenTags.every(tag => contact.tags.includes(tag))
        })
      }
    },

    search: function(e) {
      let wordInput = e.target.value.trim();
          this.tagChosenSet = [];

      if (wordInput.length === 0) {
        UI.queryingState = 'default';
      } else {
        UI.queryingState = 'inQuerying'
        this.searchedSet = this.all.filter(contact => {
          return contact.full_name.toLowerCase().includes(wordInput.toLowerCase());
        });
      }

      UI.renderContacts();
    },

  },

  Tag = {
    all: [],
    chosenTags: [],

    getAll: function() {
      let allTags = [],
          tags;
      Contact.all.forEach(contact => {
        tags = contact.tags.split(/\s*,\s*/);
        tags.forEach(tag => {
          if (!allTags.includes(tag) && tag.length >= 2) allTags.push(tag)
        })
      })

      this.all = allTags;
    },

    init: function() {
      this.getAll();
    }
  },

  UI = {
    init: function() {
      this.$allTagsUl = $('#all_tag_list');
      this.$chosenTagUl = $('#chosenTagList ');
      this.$formsContainer = $('.forms');
      this.$searchContactDiv = $('.search_contact');
      this.$allTagsContainer = $('.tags_container');
      this.$contactsContainer = $('.contacts');
      this.queryingState = 'default';
      this.renderIndex();

      this.bindEvents();
    },

    renderContactCreationForm: function(e) {
      this.$allTagsContainer.slideUp();
      this.$searchContactDiv.slideUp();
      this.$contactsContainer.slideUp();

      this.$formsContainer.html($('#creating_form').html());
      this.$formsContainer.show();

      Tag.chosenTags = [];
      this.renderAvailableTags($('form.create_contact')[0]);
    },

    renderAvailableTags: function(form) {
      let existingTags = form.querySelector('input[name=tags]').value.split(/\s*,\s*/);
      let available_tags = Tag.all.filter(tag => !existingTags.includes(tag));
      UI.renderTags(available_tags.join(','), $('#available_tags'))
    },

    renderTags: function(tagString, ul) {
      $(ul).empty();
      if (tagString.trim() === '') return;

      let tags = tagString.split(/\s*,\s*/),
          tagHtml;

      tags.forEach(tag => {
        tagHtml = `<li><a  class='tag' href='/' data-tag=${tag}>${tag}</a></li>`;
        $(ul).append(tagHtml);
      })
      // add color
      $('ul a').each((_, tag) => {
        if (Tag.chosenTags.includes(tag.textContent.trim())) tag.classList.add('chosen');
      })
    },

    handleClickOnEdit: function(e) {
      e.preventDefault();
      Contact.editingID = Contact.getId(e);
      this.renderContactEditForm();
    },

    renderContactEditForm: function() {
      this.$allTagsContainer.slideUp();
      this.$searchContactDiv.slideUp();
      this.$contactsContainer.slideUp();

      this.$formsContainer.html($('#editing_form').html());
      this.$formsContainer.show();

      let $editingForm = $('form.edit_contact'),
          contact = Contact.all.find(c => c.id == Contact.editingID)

      for (let field in contact) {
        if (field !== 'id') {
          $editingForm.find(`input[name="${field}"]`).val(contact[field])
        }
      }

      this.renderAvailableTags($editingForm[0]);
    },

    handleClickOnTag: function(e) {
      e.preventDefault();
      let tag = e.target.getAttribute('data-tag');

      if (Tag.chosenTags.includes(capitalizeString(tag))) {
        e.target.classList.remove('chosen');
        Tag.chosenTags = Tag.chosenTags.filter(chosenTag => chosenTag !== tag);
      } else {
        Tag.chosenTags.push(tag);
      };

      Contact.filterByChosenTags();
      this.renderAllTags();
      this.renderContacts();
    },


    bindEvents: function() {
      $('body').on('click', e => {
        if (e.target.id === 'add_contact') UI.renderContactCreationForm();
      });

      this.$formsContainer.on('click', '[name=submitCreate]', e => {
        Contact.create(e);
      });

      $('.main').on('click', '[name=cancel]', e => {
        UI.renderIndex();
      });

      this.$formsContainer.on('click', '[name=submitEdit]', e => {
        Contact.update(e);
      });

      this.$contactsContainer.on('click', '.edit_contact', e => {
        UI.handleClickOnEdit(e);
      });

      this.$contactsContainer.on('click', '.delete_contact', e => {
        Contact.delete(e);
      });

      this.$contactsContainer.on('click', '.tag', e => {
        this.handleClickOnTag(e);
      });

      this.$allTagsUl.on('click', '.tag', e => {
        this.handleClickOnTag(e);
      });

      $('.main').on('click', e => {
        e.preventDefault();
        if (e.currentTarget.querySelector('#available_tags') && e.target.classList.contains('tag')) {
          this.attachTags(e);
        }
      });

      this.$searchContactDiv.on('input', e => {
        Contact.debouncedSearch(e)
      });
    },

    attachTags: function(e) {
      e.preventDefault();
      let existingTags = $('input[name=tags]').val(),
          clickedTag = e.target.getAttribute('data-tag'),
          tagsInputField = $('input[name=tags]');

      if (existingTags.trim() === '') {
        tagsInputField.val(existingTags + clickedTag);
      } else if (!existingTags.includes(clickedTag)) {
        tagsInputField.val(existingTags + ', ' + clickedTag);
      }

      $(e.target.parentElement).slideUp()
    },

    renderIndex: function() {
      this.$formsContainer.slideUp() // hide any forms
      this.$searchContactDiv.show(); // show input search bar
      this.$contactsContainer.css('display', 'flex') // show contacts container
      this.$allTagsContainer.show(); // show all tags
      Tag.chosenTags = [];
      this.queryingState = 'default';
      this.renderTags('', this.$chosenTagUl);
      this.renderAllTags();
      this.renderContacts();
    },

    renderTags: function(tagString, ul) {
      $(ul).empty();
      if (tagString.trim() === '') return;

      let tags = tagString.split(/\s*,\s*/),
          tagHtml;

      tags.forEach(tag => {
        tagHtml = `<li><a  class='tag' href='/' data-tag=${tag}>${tag}</a></li>`;
        $(ul).append(tagHtml);
      })
      // add color
      $('ul a').each((_, tag) => {
        if (Tag.chosenTags.includes(tag.textContent.trim())) tag.classList.add('chosen');
      })
    },

    renderAllTags: function() {
      Tag.getAll();
      this.renderTags(Tag.all.join(','), this.$allTagsUl);
    },

    renderContacts: function() {
      let $contacts = this.$contactsContainer,
          contactHTML = $('#contact_template').html(),
          contactsToRender;

      if (this.queryingState == 'inQuerying') {
        contactsToRender = Contact.searchedSet;
      } else if (this.queryingState == 'inTagFiltering') {
        contactsToRender = Contact.tagChosenSet;
      } else if (this.queryingState == 'default') {
        contactsToRender = Contact.all;
      }

      let $lastContact;

      $contacts.empty().hide(); // clear contact board

      contactsToRender.forEach(contact => {
        $contacts.append(contactHTML);
        $lastContact = $(".contact:last-child");
        for(let key in contact) {
          if (key === 'id') {
            $lastContact.find('span.id').attr('data-id', contact.id);
          } else if (key === 'tags') {
            this.renderTags(contact.tags, $lastContact.find('ul'));
          } else {
            $lastContact.find(`p.${key}`).text(contact[key]);
          }
        }
      })

      $contacts.slideDown();
    },
  },

  App = {
    init: function() {
      Contact.debouncedSearch = debounce(Contact.search, 800, Contact)
      Contact.init().then(() => Tag.init()).then(() => UI.init());
    }
  };

  App.init();
})()
