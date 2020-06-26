// refactor:

// Try adding jquery

function ContactManager() {
    this.chosenTags = [];
    this.chosenContacts = [];
    this.queryContacts =  [];
    this.contactState = 'default';

    this.$allTagsUl = $('#all_tag_list'); // here now
    this.$chosenTagUl = $('#chosenTagList ');
    this.$formsContainer = $('.forms');
    this.$searchContactDiv = $('.search_contact');
    this.$allTagsContainer = $('.tags_container');

    this.contactHtml = $('#contact_template').html();
    this.creatingFormHTML = $('#creating_form').html();
    this.editingFormHTML = $('#editing_form').html();

    // get contacts and render
    this.getContacts().then((contacts) => {
      this.contacts = contacts;
    }).then(() => {
      this.getAllTags();
    }).then(() => {
      this.renderAllTags();
    }).then(() => {
      this.renderContacts();
    })
    this.bindEvents();
}

function capitalizeString(string) {
  return string[0].toUpperCase() + string.slice(1).toLowerCase();
}

// retrieve contacts from server
ContactManager.prototype.getContacts = function() {
  return new Promise((succ, rej) => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:3000/api/contacts');
    xhr.responseType = 'json'
    xhr.addEventListener('load', () => {
      succ(xhr.response)
    })
    xhr.send();
  })
};

ContactManager.prototype.getContactsDiv = function() {
  return $('.contacts');
}

// render all tags appear in contacts object,
ContactManager.prototype.renderAllTags = function() {
  this.getAllTags();
  this.renderTags(this.allTags.join(','), this.$allTagsUl);
}

ContactManager.prototype.getAllTags = function() {
  let allTags = [],
      tags;
  this.contacts.forEach(contact => {
    tags = contact.tags.split(/\s*,\s*/);
    tags.forEach(tag => {
      if (!allTags.includes(tag) && tag.length >= 2) allTags.push(tag)
    })
  })

  this.allTags = allTags;
}

ContactManager.prototype.renderContacts = function() {
  let $contacts = $(this.getContactsDiv()),
      contactHTML = this.contactHtml,
      contactsToRender;

  if (this.contactState == 'inQuerying') {
    contactsToRender = this.queryContacts;
  }  else if (this.contactState == 'inTagFiltering') {
    contactsToRender = this.chosenContacts;
  } else if (this.contactState == 'default') {
    contactsToRender = this.contacts;
  }

  let $lastContact;

  $('.contacts').empty(); // clear every contact board
  $contacts.hide();
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
};

ContactManager.prototype.filterContactsByChosenTags = function() {
  if (this.chosenTags.length === 0) {
    this.contactState = 'default';
  } else {
    this.contactState = 'inTagFiltering';
    this.chosenContacts = this.contacts.filter(contact => {
      return this.chosenTags.every(tag => contact.tags.includes(tag))
    })
  }
}

ContactManager.prototype.handleClickOnTag = function(e) {
  e.preventDefault();
  let tag = e.target.getAttribute('data-tag');

  if (this.chosenTags.includes(capitalizeString(tag))) return;

  this.chosenTags.push(tag);
  this.renderTags(this.chosenTags.join(','), this.$chosenTagUl);
  this.filterContactsByChosenTags();
  this.renderContacts();
}

ContactManager.prototype.renderTags = function(tagString, ul) {
  $(ul).empty();
  if (tagString.trim() === '') return;

  let tags = tagString.split(/\s*,\s*/),
      tagHtml;

  tags.forEach(tag => {
    tagHtml = `<li><a  class='tag' href='/' data-tag=${tag}>${tag}</a></li>`;
    $(ul).append(tagHtml);
  })
}

ContactManager.prototype.renderIndex = function() {
  this.$formsContainer.slideUp() // hide any forms
  this.$searchContactDiv.show(); // show input search bar
  this.getContactsDiv().css('display', 'flex') // show contacts container
  this.$allTagsContainer.show(); // show all tags
  this.chosenTags = [];
  this.renderTags('', this.$chosenTagUl);
  this.renderAllTags();
  this.renderContacts();
}

ContactManager.prototype.renderContactCreationForm = function(e) {
  this.$allTagsContainer.slideUp()
  this.$searchContactDiv.slideUp()
  this.getContactsDiv().slideUp()

  this.$formsContainer.html(this.creatingFormHTML);
  this.$formsContainer.show();

  this.renderAvailableTags($('form.create_contact')[0]);
}

ContactManager.prototype.renderAvailableTags = function(form) {
  let existingTags = form.querySelector('input[name=tags]').value.split(/\s*,\s*/);
  let available_tags = this.allTags.filter(tag => !existingTags.includes(tag));
  this.renderTags(available_tags.join(','), $('#available_tags'))
}

ContactManager.prototype.renderContactEditForm = function() {
  let contact = this.contacts.find(c => c.id == this.editingID)
  this.$allTagsContainer.slideUp()
  this.$searchContactDiv.slideUp()
  this.getContactsDiv().slideUp()

  this.$formsContainer.html(this.editingFormHTML);
  this.$formsContainer.show();

  let $editingForm = $('form.edit_contact')

  for (let field in contact) {
    if (field !== 'id') {
      $editingForm.find(`input[name="${field}"]`).val(contact[field])
    }
  }

  this.renderAvailableTags($editingForm[0]);
};

ContactManager.prototype.createContact = function(e) { //?
  e.preventDefault();
  let xhr = new XMLHttpRequest(),
      formData = new FormData($('form.create_contact')[0]),
      json = {},
      jsonData;

  formData.forEach((value, key) => {
    if (key === 'tags') {
      json[key] = value.split(/\s*,\s*/).map(s => capitalizeString(s)).join(',');
    } else {
      json[key] = value;
    }
  })

  console.log(...formData.entries())

  jsonData = JSON.stringify(json);

  xhr.open('POST', 'http://localhost:3000/api/contacts/')
  xhr.setRequestHeader('content-type', 'application/json');
  xhr.addEventListener('load', () => {
    this.getContacts().then((contacts) => {
      this.contacts = contacts;
    }).then(() => {
      this.renderIndex();
    })
  })

  xhr.send(jsonData)
}

ContactManager.prototype.updateContact = function(e) {
  e.preventDefault();
  let xhr = new XMLHttpRequest(),
      formData = new FormData($('form.edit_contact')[0]),
      json = {},
      jsonData;

  formData.set('id', this.editingID);
  
  formData.forEach((value, key) => {
    if (key === 'tags') {
      json[key] = value.split(/\s*,\s*/).map(s => capitalizeString(s)).join(',');
    } else {
      json[key] = value;
    }
  })

  jsonData = JSON.stringify(json);

  xhr.open('PUT', 'http://localhost:3000/api/contacts/' + this.editingID);
  xhr.setRequestHeader('content-type', 'application/json');

  xhr.addEventListener('load', () => {
    this.getContacts().then((contacts) => {
      this.contacts = contacts;
    }).then(() => {
      this.renderIndex();
    })
  })

  xhr.send(jsonData)
};

ContactManager.prototype.getContactId = function(e) {
  return e.target.parentElement.nextElementSibling.getAttribute('data-id');
};

ContactManager.prototype.handleClickOnEdit = function(e) {
  e.preventDefault();
  this.editingID = this.getContactId(e);
  this.renderContactEditForm();
};

ContactManager.prototype.deleteContact = function(e) {
  this.editingID = this.getContactId(e);
  if (!window.confirm()) return;

  let xhr = new XMLHttpRequest();
  xhr.open('DELETE', 'http://localhost:3000/api/contacts/' + this.editingID)
  xhr.addEventListener('load', () => {
    this.getContacts().then((contacts) => {
      this.contacts = contacts;
    }).then(() => {
      $(`[data-id=${this.editingID}]`).closest('div.contact').slideUp();
    })
  })

  xhr.send();
};

ContactManager.prototype.attachTags = function(e) {
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
}

ContactManager.prototype.cancelTagChoice = function(cancelTag) {
  this.chosenTags = this.chosenTags.filter(tag => tag !== cancelTag);
  this.filterContactsByChosenTags();
  this.renderTags(this.chosenTags.join(','), this.$chosenTagUl);
  this.renderContacts();
};

ContactManager.prototype.searchContact = function(e) {
  let wordInput = e.target.value.trim();
      this.chosenContacts = [];

  if (wordInput.length === 0) {
    this.contactState = 'default';
  } else {
    this.contactState = 'inQuerying'
    this.queryContacts = this.contacts.filter(contact => {
      return contact.full_name.toLowerCase().includes(wordInput.toLowerCase());
    });
  }

  this.renderContacts();
}

ContactManager.prototype.bindEvents = function() {
  $('body').on('click', function(e) {
    if (e.target.id === 'add_contact') this.renderContactCreationForm();
  }.bind(this));

  this.$formsContainer.on('click', '[name=submitCreate]', function(e) {
    this.createContact(e);
  }.bind(this));

  $('.main').on('click', '[name=cancel]', function(e) {
    this.renderIndex()
  }.bind(this));

  this.$formsContainer.on('click', '[name=submitEdit]', function(e) {
    this.updateContact(e);
  }.bind(this));

  this.getContactsDiv().on('click', '.edit_contact', function(e) {
    this.handleClickOnEdit(e)
  }.bind(this));

  this.getContactsDiv().on('click', '.delete_contact', function(e) {
    this.deleteContact(e)
  }.bind(this));

  this.getContactsDiv().on('click', '.tag', function(e) {
    this.handleClickOnTag(e)
  }.bind(this));

  this.$allTagsUl.on('click', '.tag', function(e) {
    this.handleClickOnTag(e)
  }.bind(this));

  this.$chosenTagUl.on('click', '.tag', function(e) {
    e.preventDefault();
    let cancelTag = e.target.getAttribute('data-tag');
    this.cancelTagChoice(cancelTag);
  }.bind(this))

  $('.main').on('click', function(e) {
    e.preventDefault();
    if (e.currentTarget.querySelector('#available_tags') && e.target.classList.contains('tag')) {
      this.attachTags(e);
    }
  }.bind(this))

  this.$searchContactDiv.on('input', function(e) {
    this.searchContact(e);
  }.bind(this))
} // bind event end

let app;

document.addEventListener('DOMContentLoaded', function() {
  app = new ContactManager();
})
