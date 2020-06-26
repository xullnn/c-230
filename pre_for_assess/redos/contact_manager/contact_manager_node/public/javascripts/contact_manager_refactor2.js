// when initiated
  // get all dom objects and save as properties of the app for later reference
  // this.submitButton = query....
  // set some states (if needed)
  // a render page function that can 'refresh' the page content after check some global states of the app

// refactor:
// 
// 1. bug fix on the coordination between input search and tag search. This is done
//    by adding a `contactState` state to the app which indicates if we are
//     - at default state -> all contacts show
//     - in input searching -> show querying result
//     - in tag filtering -> show tag searching result

function ContactManager() {
    this.chosenTags = [];
    this.choseContacts = [];
    this.queryContacts =  [];
    this.contactState = 'default';

    this.allTagList = document.querySelector('#all_tag_list');
    this.chosenTagUl = document.querySelector('#chosenTagList ');
    this.formsContainer = document.querySelector('.forms');
    this.searchContactDiv = document.querySelector('.search_contact');
    this.allTagsContainer = document.querySelector('#chosenTags')

    this.contactHtml = document.querySelector('#contact_template').innerHTML;
    this.creatingFormHTML = document.querySelector('#creating_form').innerHTML;
    this.editingFormHTML = document.querySelector('#editing_form').innerHTML;

    // get contacts and render
    this.getContacts().then((contacts) => {
      this.contacts = contacts;
    }).then(() => {
      this.renderAllTags();
    }).then(() => {
      window.localStorage.setItem('contacts', this.contacts)
    }).then(this.renderContacts.bind(this))

    this.bindEvents();
}

ContactManager.prototype.renderAllTags = function() {
  let allTagsString = this.allTags().join(',');
  this.renderTags(allTagsString, this.allTagList);

}

ContactManager.prototype.generateContactHTML = function(contact) {
  return `${this.contactHtml}`;
}

ContactManager.prototype.allTags = function() {
  let allTags = [],
      tags;
  this.contacts.forEach(contact => {
    tags = contact.tags.split(/\s*,\s*/);
    tags.forEach(tag => {
      if (!allTags.includes(tag) && tag.length >= 2) allTags.push(tag)
    })
  })

  return allTags;
}

ContactManager.prototype.getContactsDiv = function() {
  return document.querySelector('.contacts');
}

ContactManager.prototype.renderContacts = function() {
  let contacts = this.getContactsDiv(),
      contactHTML = this.contactHtml,
      contactsToRender;

  if (this.contactState == 'inQuerying') {
    contactsToRender = this.queryContacts;
  }  else if (this.contactState == 'inTagFiltering') {
    contactsToRender = this.choseContacts;
  } else if (this.contactState == 'default') {
    contactsToRender = this.contacts;
  }
  document.querySelectorAll('.main .contact').forEach(c => c.remove())
  contactsToRender.forEach(contact => {
    contacts.insertAdjacentHTML('beforeend', contactHTML)
    let lastContact = contacts.lastElementChild
    for(let key in contact) {
      if (key === 'id') {
        lastContact.querySelector('span.id').setAttribute('data-id', contact.id)
      } else if (key === 'tags') {
        this.renderTags(contact.tags, lastContact.querySelector('ul'))
      }
      else {
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
    this.choseContacts = this.contacts.filter(contact => {
      return this.chosenTags.every(tag => contact.tags.includes(tag))
    })

    this.renderContacts()
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
  let tags = tagString.split(/\s*,\s*/),
      tagHtml;
  ul.innerHTML = '';
  if (tags[0].trim() === '') return;
  tags.forEach(tag => {
    tagHtml = `<li><a  class='tag' href='/' data-tag=${tag}>${tag}</a></li>`;
    ul.insertAdjacentHTML('beforeend', tagHtml);
  })
}

ContactManager.prototype.renderIndex = function() {
  this.formsContainer.style.display = 'none';
  this.searchContactDiv.style.display = 'block';
  // document.querySelector('.contacts').innerHTML = '';
  this.getContactsDiv().style.display = 'flex';
  this.allTagsContainer.forEach(container => container.style.display = 'block');
  this.chosenTags = [];
  this.renderTags('', this.chosenTagUl)


  this.renderContacts();
}

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
}

ContactManager.prototype.renderContactCreationForm = function(e) {
  console.log('in renderContactCreationForm')
  this.allTagsContainer.forEach(container => container.style.display = 'none');
  this.searchContactDiv.style.display = 'none';

  this.getContactsDiv().style.display = 'none';
  this.formsContainer.innerHTML = this.creatingFormHTML;
  this.formsContainer.style.display = 'block';
  let form = document.querySelector('form.create_contact');
  this.renderAvailableTags(form);
}

ContactManager.prototype.renderAvailableTags = function(form) {
  let existingTags = form.querySelector('input[name=tags]').value.split(/\s*,\s*/);
  let allTags = this.allTags();
  let available_tags = allTags.filter(tag => !existingTags.includes(tag));
  this.renderTags(available_tags.join(','), document.querySelector('#available_tags'))
  console.log(existingTags)
  console.log(available_tags)
}

ContactManager.prototype.renderContactEditForm = function() {
  let contact = this.contacts.find(c => c.id == this.editingID)
  this.allTagsContainer.forEach(container => container.style.display = 'none');
    this.searchContactDiv.style.display = 'none';
  console.log(contact)
  this.getContactsDiv().style.display = 'none';
  this.formsContainer.innerHTML = this.editingFormHTML;
  this.formsContainer.style.display = 'block';
  let editingForm = document.querySelector('form.edit_contact')
  for (let field in contact) {
    if (field !== 'id') {
      editingForm.querySelector(`input[name="${field}"]`).value = contact[field]
    }
  }

  let form = document.querySelector('form.edit_contact');
  this.renderAvailableTags(form);
}

ContactManager.prototype.handleContactCreation = function(e) { //?
  e.preventDefault();
  let xhr = new XMLHttpRequest(),
      formData = new FormData(document.querySelector('form.create_contact'));

  console.log(formData)
  let json = {}
  formData.forEach((value, key) => {
    json[key] = value;
  })
  let jsonData = JSON.stringify(json);

  console.log([...formData.entries()])
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

ContactManager.prototype.handleContactEditing = function(e) {
  e.preventDefault();
  let xhr = new XMLHttpRequest(),
      formData = new FormData(document.querySelector('form.edit_contact'));
      formData.set('id',  this.editingID)

  let json = {}
  formData.forEach((value, key) => {
    json[key] = value;
  })
  let jsonData = JSON.stringify(json);

  console.log([...formData.entries()])
  xhr.open('PUT', 'http://localhost:3000/api/contacts/' + this.editingID);
  xhr.setRequestHeader('content-type', 'application/json');

  console.log([...formData.entries()])
  xhr.addEventListener('load', () => {
    this.getContacts().then((contacts) => {
      this.contacts = contacts;
    }).then(() => {
      this.renderIndex();
    })
  })

  xhr.send(jsonData)
}

ContactManager.prototype.handleEdit = function(e) {
  this.editingID = e.target.parentElement.nextElementSibling.getAttribute('data-id');
  console.log(this.editingID)
  e.preventDefault();
  this.renderContactEditForm()
  console.log(this.editingID)
}

ContactManager.prototype.handleDeletion = function(e) {
  this.editingID = e.target.parentElement.nextElementSibling.getAttribute('data-id');
  if (window.confirm()) {
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
  } else {
    return;
  }
}

ContactManager.prototype.attachTags = function(e) {
  e.preventDefault();
  let existingTags = document.querySelector('input[name=tags]').value,
      clickedTag = e.target.getAttribute('data-tag');

  if (existingTags.trim() === '') {
    document.querySelector('input[name=tags]').value = existingTags + clickedTag;
  } else if (!existingTags.includes(clickedTag)) {
    document.querySelector('input[name=tags]').value = existingTags + ', ' + clickedTag;
  }

  e.target.parentElement.style.display = 'none';

}

ContactManager.prototype.cancelTagChoice = function(cancelTag) {
  this.chosenTags = this.chosenTags.filter(tag => tag !== cancelTag);
  console.log(this.chosenTags)
  this.filterContactsByChosenTags()
  console.log(this.choseContacts)
  this.renderTags(this.chosenTags.join(','), this.chosenTagUl)

  console.log(this.choseContacts)
  this.renderContacts()
}

ContactManager.prototype.searchContact = function(e) {
  let wordInput = e.target.value.trim();
      this.choseContacts = [];

  if (wordInput.length === 0) {
    this.contactState = 'default';
  } else {
    this.contactState = 'inQuerying'
    this.queryContacts = this.contacts.filter(contact => {
      return contact.full_name.toLowerCase().includes(wordInput.toLowerCase());
    });
  }

  console.log(this.queryContacts)
  this.renderContacts();
}

ContactManager.prototype.bindEvents = function() {
  document.querySelector('body').addEventListener('click', function(e) {
    if (e.target.id === 'add_contact') this.renderContactCreationForm();
  }.bind(this));

  this.formsContainer.addEventListener('click', function(e) {
    if (e.target.name === 'submitCreate') this.handleContactCreation(e);
  }.bind(this));

  document.querySelector('.main').addEventListener('click', function(e) {
    if (e.target.name === 'cancel') this.renderIndex()
  }.bind(this));

  this.formsContainer.addEventListener('click', function(e) {
    if (e.target.name === 'submitEdit') this.handleContactEditing(e);
  }.bind(this));

  this.getContactsDiv().addEventListener('click', function(e) {
    if (e.target.classList.contains('edit_contact')) this.handleEdit(e)
  }.bind(this));

  this.getContactsDiv().addEventListener('click', function(e) {
    if (e.target.classList.contains('delete_contact')) this.handleDeletion(e)
  }.bind(this));

  this.getContactsDiv().addEventListener('click', function(e) {
    if (e.target.classList.contains('tag')) this.handleClickOnTag(e)
  }.bind(this));

  this.allTagList.addEventListener('click', function(e) {
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
