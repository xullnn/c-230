function addItem(e) {
  e.preventDefault();
  let text = document.querySelector("input[name='item']").value,
      item = {
        text: text,
        done: false,
      };

  items.push(item);

  localStorage.setItem('items', JSON.stringify(items));
  populateList(items, itemsList)
  // store to local storage - LocalStorage.set()

  addItems.reset(); // clear the form
}

function populateList(items = [], platesList) {
  platesList.innerHTML = items.map((item, i) => {
    return `
      <li>
        <input type="checkbox", data-index=${i} id="item${i}" ${item.done ? 'checked' : ''}>
        <label for="item${i}">${item.text}</label>
      </li>
    `
  }).join('');
}

function toggleDone(e) {
  let el = e.target;
  if (!el.matches('input')) return;

  let index = el.dataset.index;
  items[index].done = !items[index].done;
  localStorage.setItem('items', JSON.stringify(items));
  populateList(items, itemsList);
}

let items = JSON.parse(localStorage.getItem('items')) || [],
    itemsList,
    addItems;

document.addEventListener('DOMContentLoaded', function() {
  addItems = document.querySelector('.add-items');
  itemsList = document.querySelector('.plates');

  if (items.length >= 1) populateList(items, itemsList)

  addItems.addEventListener('submit', addItem);
  itemsList.addEventListener('click', toggleDone);
})
