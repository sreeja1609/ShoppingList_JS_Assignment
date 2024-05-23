class ShoppingItem {
  constructor(description) {
      this._description = description;
      this._deleted = false;
      this._done = false;
  }

  get description() {
      return this._description;
  }

  get deleted() {
      return this._deleted;
  }

  get done() {
      return this._done;
  }

  set description(description) {
      this._description = description;
  }

  set deleted(status) {
      this._deleted = status;
  }

  set done(status) {
      this._done = status;
  }

  toggleDone() {
      this.done = !this.done;
  }
}

const shoppingList = [];
const newItemInput = document.getElementById('new-item');
const shoppingListElement = document.getElementById('shopping-list');
const itemsCountElement = document.getElementById('items-count');
const hideCompletedCheckbox = document.getElementById('hide-completed');

function renderList() {
  shoppingListElement.innerHTML = '';
  let totalCount = 0;
  let markedCount = 0;
  let unmarkedCount = 0;
  const hideCompleted = hideCompletedCheckbox.checked;

  shoppingList.forEach((item, index) => {
      if (!item.deleted) {
          totalCount++;
          if (item.done) {
              markedCount++;
          } else {
              unmarkedCount++;
          }

          if (!hideCompleted || !item.done) {
              const itemElement = document.createElement('li');
              itemElement.className = item.done ? 'shopping-item marked-item' : 'shopping-item';

              const itemText = document.createElement('span');
              itemText.className = 'item-text';
              itemText.textContent = item.description;
              itemElement.appendChild(itemText);

              const deleteButton = document.createElement('button');
              deleteButton.className = 'delete-button';
              deleteButton.textContent = 'X';
              deleteButton.addEventListener('click', (event) => {
                  event.stopPropagation();
                  item.deleted = true;
                  renderList();
              });

              itemElement.addEventListener('click', () => {
                  item.toggleDone();
                  renderList();
              });

              itemElement.appendChild(deleteButton);
              shoppingListElement.appendChild(itemElement);
          }
      }
  });

  itemsCountElement.innerHTML = `
      Total items: ${totalCount} |
      Marked items: ${markedCount} |
      Unmarked items: ${unmarkedCount}
  `;
}

newItemInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter' && newItemInput.value.trim() !== '') {
      const newItem = new ShoppingItem(newItemInput.value.trim());
      shoppingList.push(newItem);
      newItemInput.value = '';
      renderList();
  }
});

hideCompletedCheckbox.addEventListener('change', () => {
  renderList();
});

renderList();
