// when initiated
  // get all dom objects and save as properties of the app for later reference
  // this.submitButton = query....
  // set some states (if needed)
  // a render page function that can 'refresh' the page content after check some global states of the app

// refactor:

// 1. first remove the localStorage part(left for future if needed)
// 2. checking each function to see
  // - if the name of function makes sense
  // - if there is redundant code
// 3. extract some repeatitive code into functions

function ContactManager() {
    this.chosenTags = [];
    this.chosenContacts = [];
    this.queryContacts =  [];
    this.contactState = 'default';

    this.allTagsUl = document.querySelector('#all_tag_list'); // here now
    this.chosenTagUl = document.querySelector('#chosenTagList ');
    this.formsContainer = document.querySelector('.forms');
    this.searchContactDiv = document.querySelector('.search_contact');
    this.allTagsContainer = document.querySelector('.tags_container');

    this.contactHtml = document.querySelector('#contact_template').innerHTML;
    this.creatingFormHTML = document.querySelector('#creating_form').innerHTML;
    this.editingFormHTML = document.querySelector('#editing_form').innerHTML;

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
  return document.querySelector('.contacts');
}

// render all tags appear in contacts object,
ContactManager.prototype.renderAllTags = function() {
  let allTagsString = this.allTags.join(',');
  this.renderTags(allTagsString, this.allTagsUl);
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
  let contacts = this.getContactsDiv(),
      contactHTML = this.contactHtml,
      contactsToRender;

  if (this.contactState == 'inQuerying') {
    contactsToRender = this.queryContacts;
  }  else if (this.contactState == 'inTagFiltering') {
    contactsToRender = this.chosenContacts;
  } else if (this.contactState == 'default') {
    contactsToRender = this.contacts;
  }

  document.querySelectorAll('.main .contact').forEach(c => c.remove()) // clear every contact board
  contactsToRender.forEach(contact => {
    contacts.insertAdjacentHTML('beforeend', contactHTML)
    let lastContact = contacts.lastElementChild
    for(let key in contact) {
      if (key === 'id') {
        lastContact.querySelector('span.id').setAttribute('data-id', contact.id)
      } else if (key === 'tags') {
        this.renderTags(contact.tags, lastContact.querySelector('ul'))
      } else {
        lastContact.querySelector(`p.${key}`).textContent = contact[key];
      }
    }
  })
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

  if (!this.chosenTags.includes(tag)) {
    this.chosenTags.push(tag);
    let tagUl = this.chosenTagUl;

    this.renderTags(this.chosenTags.join(','), tagUl)
  }

  this.filterContactsByChosenTags()
  this.renderContacts();
}

ContactManager.prototype.renderTags = function(tagString, ul) {
  ul.innerHTML = '';
  if (tagString.trim() === '') return;

  let tags = tagString.split(/\s*,\s*/),
      tagHtml;

  tags.forEach(tag => {
    tagHtml = `<li><a  class='tag' href='/' data-tag=${tag}>${tag}</a></li>`;
    ul.insertAdjacentHTML('beforeend', tagHtml);
  })
}

ContactManager.prototype.renderIndex = function() {
  this.formsContainer.style.display = 'none'; // hide any forms
  this.searchContactDiv.style.display = 'block'; // show input search bar
  this.getContactsDiv().style.display = 'flex'; // show contacts container
  this.allTagsContainer.style.display = 'block'; // show all tags
  this.chosenTags = [];
  this.renderTags('', this.chosenTagUl)
  this.renderContacts();
}

ContactManager.prototype.renderContactCreationForm = function(e) {
  this.allTagsContainer.style.display = 'none';
  this.searchContactDiv.style.display = 'none';
  this.getContactsDiv().style.display = 'none';

  this.formsContainer.innerHTML = this.creatingFormHTML;
  this.formsContainer.style.display = 'block';

  this.renderAvailableTags(document.querySelector('form.create_contact'));
}

ContactManager.prototype.renderAvailableTags = function(form) {
  let existingTags = form.querySelector('input[name=tags]').value.split(/\s*,\s*/);
  let available_tags = this.allTags.filter(tag => !existingTags.includes(tag));
  this.renderTags(available_tags.join(','), document.querySelector('#available_tags'))
}

ContactManager.prototype.renderContactEditForm = function() {
  let contact = this.contacts.find(c => c.id == this.editingID)
  this.allTagsContainer.style.display = 'none';
  this.searchContactDiv.style.display = 'none';
  this.getContactsDiv().style.display = 'none';

  this.formsContainer.innerHTML = this.editingFormHTML;
  this.formsContainer.style.display = 'block';

  let editingForm = document.querySelector('form.edit_contact')

  for (let field in contact) {
    if (field !== 'id') {
      editingForm.querySelector(`input[name="${field}"]`).value = contact[field]
    }
  }

  this.renderAvailableTags(editingForm);
};

ContactManager.prototype.createContact = function(e) { //?
  e.preventDefault();
  let xhr = new XMLHttpRequest(),
      formData = new FormData(document.querySelector('form.create_contact')),
      json = {},
      jsonData;

  formData.forEach((value, key) => json[key] = value);
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
      formData = new FormData(document.querySelector('form.edit_contact')),
      json = {},
      jsonData;

  formData.set('id',  this.editingID);
  formData.forEach((value, key) => json[key] = value);
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
      this.renderIndex();
    })
  })

  xhr.send();
};

ContactManager.prototype.attachTags = function(e) {
  e.preventDefault();
  let existingTags = document.querySelector('input[name=tags]').value,
      clickedTag = e.target.getAttribute('data-tag'),
      tagsInputField = document.querySelector('input[name=tags]');

  if (existingTags.trim() === '') {
    tagsInputField.value = existingTags + clickedTag;
  } else if (!existingTags.includes(clickedTag)) {
    tagsInputField.value = existingTags + ', ' + clickedTag;
  }

  e.target.parentElement.style.display = 'none';
}

ContactManager.prototype.cancelTagChoice = function(cancelTag) {
  this.chosenTags = this.chosenTags.filter(tag => tag !== cancelTag);
  this.filterContactsByChosenTags();
  this.renderTags(this.chosenTags.join(','), this.chosenTagUl);
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
  document.querySelector('body').addEventListener('click', function(e) {
    if (e.target.id === 'add_contact') this.renderContactCreationForm();
  }.bind(this));

  this.formsContainer.addEventListener('click', function(e) {
    if (e.target.name === 'submitCreate') this.createContact(e);
  }.bind(this));

  document.querySelector('.main').addEventListener('click', function(e) {
    if (e.target.name === 'cancel') this.renderIndex()
  }.bind(this));

  this.formsContainer.addEventListener('click', function(e) {
    if (e.target.name === 'submitEdit') this.updateContact(e);
  }.bind(this));

  this.getContactsDiv().addEventListener('click', function(e) {
    if (e.target.classList.contains('edit_contact')) this.handleClickOnEdit(e)
  }.bind(this));

  this.getContactsDiv().addEventListener('click', function(e) {
    if (e.target.classList.contains('delete_contact')) this.deleteContact(e)
  }.bind(this));

  this.getContactsDiv().addEventListener('click', function(e) {
    if (e.target.classList.contains('tag')) this.handleClickOnTag(e)
  }.bind(this));

  this.allTagsUl.addEventListener('click', function(e) {
    if (e.target.classList.contains('tag')) this.handleClickOnTag(e)
  }.bind(this));

  this.chosenTagUl.addEventListener('click', function(e) {
    e.preventDefault();
    if (e.target.classList.contains('tag')) {
      let cancelTag = e.target.getAttribute('data-tag');
      this.cancelTagChoice(cancelTag);
    }
  }.bind(this))

  document.querySelector('.main').addEventListener('click', function(e) {
    e.preventDefault();
    if (e.currentTarget.querySelector('#available_tags') && e.target.classList.contains('tag')) {
      this.attachTags(e);
    }
  }.bind(this))

  this.searchContactDiv.addEventListener('input', function(e) {
    this.searchContact(e);
  }.bind(this))
} // bind event end

let app;

document.addEventListener('DOMContentLoaded', function() {
  app = new ContactManager();
})
