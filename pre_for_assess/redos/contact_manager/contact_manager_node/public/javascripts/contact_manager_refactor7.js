// refactor:

// Understand the Data and Rendering flow of program

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

function ContactManager() {
    this.chosenTags = [];
    this.chosenContacts = [];
    this.queryContacts =  [];
    this.contactState = 'default';
    this.debouncedSearchContact = debounce(this.searchContact, 500, this)

    this.$allTagsUl = $('#all_tag_list'); // here now
    this.$chosenTagUl = $('#chosenTagList ');
    this.$formsContainer = $('.forms');
    this.$searchContactDiv = $('.search_contact');
    this.$allTagsContainer = $('.tags_container');
    this.$contactsContainer = $('.contacts');

    // get contacts, then tags, then render
    this.getContacts().then((contacts) => {
      this.contacts = contacts;
    }).then(() => {
      this.getAllTags(); // tags are extracted from contact data
    }).then(() => {
      this.renderAllTags(); // tags can only be rendered after being extracted fromm contacts
    }).then(() => {
      this.renderContacts(); // contacts must be rendered after contact data retrieval
    });

    this.bindEvents();
};

// retrieve contacts from server
ContactManager.prototype.getContacts = function() {
  return new Promise((succ, rej) => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:3000/api/contacts');
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      succ(xhr.response)
    })
    xhr.send();
  })
};

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
  let $contacts = this.$contactsContainer,
      contactHTML = $('#contact_template').html(),
      contactsToRender;

  if (this.contactState == 'inQuerying') {
    contactsToRender = this.queryContacts;
  } else if (this.contactState == 'inTagFiltering') {
    contactsToRender = this.chosenContacts;
  } else if (this.contactState == 'default') {
    contactsToRender = this.contacts;
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

  if (this.chosenTags.includes(capitalizeString(tag))) {
    e.target.classList.remove('chosen');
    this.chosenTags = this.chosenTags.filter(chosenTag => chosenTag !== tag);
  } else {
    this.chosenTags.push(tag);
  };

  this.filterContactsByChosenTags();
  this.renderAllTags();
  this.renderContacts();
}

ContactManager.prototype.cancelTagChoice = function(cancelTag) {
  this.chosenTags = this.chosenTags.filter(tag => tag !== cancelTag);
};

// render all tags appear in contacts object,
ContactManager.prototype.renderAllTags = function() {
  this.getAllTags();
  this.renderTags(this.allTags.join(','), this.$allTagsUl);
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
  // add color
  $('ul a').each((_, tag) => {
    if (this.chosenTags.includes(tag.textContent.trim())) tag.classList.add('chosen');
  })
}

ContactManager.prototype.renderAvailableTags = function(form) {
  let existingTags = form.querySelector('input[name=tags]').value.split(/\s*,\s*/);
  let available_tags = this.allTags.filter(tag => !existingTags.includes(tag));
  this.renderTags(available_tags.join(','), $('#available_tags'))
}

ContactManager.prototype.renderIndex = function() {
  this.$formsContainer.slideUp() // hide any forms
  this.$searchContactDiv.show(); // show input search bar
  this.$contactsContainer.css('display', 'flex') // show contacts container
  this.$allTagsContainer.show(); // show all tags
  this.chosenTags = [];
  this.renderTags('', this.$chosenTagUl);
  this.renderAllTags();
  this.renderContacts();
}

ContactManager.prototype.renderContactCreationForm = function(e) {
  this.$allTagsContainer.slideUp();
  this.$searchContactDiv.slideUp();
  this.$contactsContainer.slideUp();

  this.$formsContainer.html($('#creating_form').html());
  this.$formsContainer.show();

  this.chosenTags = [];
  this.renderAvailableTags($('form.create_contact')[0]);
}

ContactManager.prototype.renderContactEditForm = function() {
  this.$allTagsContainer.slideUp();
  this.$searchContactDiv.slideUp();
  this.$contactsContainer.slideUp();

  this.$formsContainer.html($('#editing_form').html());
  this.$formsContainer.show();

  let $editingForm = $('form.edit_contact'),
      contact = this.contacts.find(c => c.id == this.editingID)

  for (let field in contact) {
    if (field !== 'id') {
      $editingForm.find(`input[name="${field}"]`).val(contact[field])
    }
  }

  this.renderAvailableTags($editingForm[0]);
};

ContactManager.prototype.processContactFormData = function(formData) {
  let json = {};

  formData.forEach((value, key) => {
    if (key === 'tags') {
      json[key] = value.split(/\s*,\s*/).map(s => capitalizeString(s)).join(',');
    } else {
      json[key] = value;
    }
  });

  return json;
}

ContactManager.prototype.getContactsAndRenderIndex = function(xhr, jsonData) {
  xhr.setRequestHeader('content-type', 'application/json');
  xhr.addEventListener('load', () => {
    this.getContacts().then((contacts) => { // update contacts data
      this.contacts = contacts;
    }).then(() => {
      this.renderIndex();  // reflect updates
    })
  })

  xhr.send(jsonData);
}

ContactManager.prototype.createContact = function(e) { //?
  e.preventDefault();
  let xhr = new XMLHttpRequest(),
      formData = new FormData($('form.create_contact')[0]),
      json = this.processContactFormData(formData),
      jsonData = JSON.stringify(json);

  xhr.open('POST', 'http://localhost:3000/api/contacts/')
  this.getContactsAndRenderIndex(xhr, jsonData);
}

ContactManager.prototype.updateContact = function(e) {
  e.preventDefault();
  let xhr = new XMLHttpRequest(),
      formData = new FormData($('form.edit_contact')[0]);
      formData.set('id', this.editingID);

  let json = this.processContactFormData(formData),
      jsonData = JSON.stringify(json);

  xhr.open('PUT', 'http://localhost:3000/api/contacts/' + this.editingID);
  this.getContactsAndRenderIndex(xhr, jsonData);
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
  $('body').on('click', e => {
    if (e.target.id === 'add_contact') this.renderContactCreationForm();
  });

  this.$formsContainer.on('click', '[name=submitCreate]', e => {
    this.createContact(e);
  });

  $('.main').on('click', '[name=cancel]', e => {
    this.renderIndex()
  });

  this.$formsContainer.on('click', '[name=submitEdit]', e => {
    this.updateContact(e);
  });

  this.$contactsContainer.on('click', '.edit_contact', e => {
    this.handleClickOnEdit(e)
  });

  this.$contactsContainer.on('click', '.delete_contact', e => {
    this.deleteContact(e)
  });

  this.$contactsContainer.on('click', '.tag', e => {
    this.handleClickOnTag(e)
  });

  this.$allTagsUl.on('click', '.tag', e => {
    this.handleClickOnTag(e)
  });

  $('.main').on('click', e => {
    e.preventDefault();
    if (e.currentTarget.querySelector('#available_tags') && e.target.classList.contains('tag')) {
      this.attachTags(e);
    }
  })

  this.$searchContactDiv.on('input', e => {
    this.debouncedSearchContact(e)
  });

} // bind event end

let app;

document.addEventListener('DOMContentLoaded', function() {
  app = new ContactManager();
})
