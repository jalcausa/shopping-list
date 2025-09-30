const itemForm = document.getElementById("item-form"); // <form>
const itemInput = document.getElementById("item-input"); // <input>
const itemList = document.getElementById("item-list"); // <ul>
const clearButton = document.getElementById("clear"); // <button>
const itemFilter = document.getElementById("filter"); // <input>
const formBtn = itemForm.querySelector("button"); // botón de add item
let isEditMode = false; // Para editar un item al clickarlo

function displayItems() {
  const itemsFromStorage = getItemsFromStorage();

  itemsFromStorage.forEach((item) => {
    addItemToDOM(item);
  });
  checkUI();
}

function onAddItemSubmit(e) {
  e.preventDefault();

  // Extract content from input
  const newItem = itemInput.value;

  // Validate Input
  if (newItem === "") {
    alert("Please add an item");
    return;
  }

  // Añadir el item al DOM
  addItemToDOM(newItem);

  // Añadir el item al localStorage
  addItemToStorage(newItem);

  //Si era el primer elemento que hemos añadido, mostrar botones para filtrar y limpiar todo
  checkUI();

  // Reset the value of the input
  itemInput.value = "";
}

function addItemToDOM(item) {
  // Create list item
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(item));

  // Add the button to the li
  const button = createButton("remove-item btn-link text-red");
  li.appendChild(button);

  // Add the li to the DOM
  itemList.appendChild(li);
}

function createIcon(classes) {
  const icon = document.createElement("i");
  icon.className = classes;
  return icon;
}

function createButton(classes) {
  const button = document.createElement("button");
  button.className = classes;
  const icon = createIcon("fa-solid fa-xmark");
  button.appendChild(icon);
  return button;
}

function addItemToStorage(item) {
  const itemsFromStorage = getItemsFromStorage();

  itemsFromStorage.push(item);

  // Convert to JSON string and set to local storage
  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

function getItemsFromStorage() {
  let itemsFromStorage;

  if (localStorage.getItem("items") === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem("items"));
  }

  return itemsFromStorage;
}

function onClickItem(e) {
  if (e.target.parentElement.classList.contains("remove-item")) {
    removeItem(e.target.parentElement.parentElement);
  } else {
	setItemToEdit(e.target);
  }
}

function setItemToEdit(item) {
	isEditMode = true;

	itemList.querySelectorAll("li").forEach((i) => i.classList.remove("edit-mode"));

	item.classList.add("edit-mode");
	formBtn.innerHTML = '<i class ="fa-solid fa-pen"></i> Update Item';
	formBtn.style.backgroundColor = "#228B22";
	itemInput.value = item.textContent;
}

function removeItem(item) {
	if (confirm("Are you sure?")) {
		// Remove item from DOM
		item.remove();

		// Remove item from storage
		removeItemFromStorage(item.textContent);
		checkUI();
	}
}

function removeItemFromStorage (item) {
	let itemsFromStorage = getItemsFromStorage();

	// Filter out item to be removed
	itemsFromStorage = itemsFromStorage.filter((i) => i !== item);

	localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

function clearItems(e) {
	if(confirm("Are you sure?")){
    while (itemList.firstChild) {
      itemList.removeChild(itemList.firstChild);
    }

    // Clear from localStorage
    localStorage.removeItem("items");

    checkUI();
  }
}

function filterItems(e) {
  const items = itemList.querySelectorAll("li");
  const filter = e.target.value.toLowerCase();
  items.forEach((item) => {
    if (!item.textContent.toLowerCase().includes(filter))
      item.style.display = "none";
    else item.style.display = "flex";
  });
}

function checkUI() {
  const items = itemList.querySelectorAll("li");
  if (items.length === 0) {
    clearButton.style.display = "none";
    itemFilter.style.display = "none";
  } else {
    clearButton.style.display = "block";
    itemFilter.style.display = "block";
  }
}

// Initialize app
function init() {
  // Event Listeners
  itemForm.addEventListener("submit", onAddItemSubmit);
  itemList.addEventListener("click", onClickItem);
  clearButton.addEventListener("click", clearItems);
  itemFilter.addEventListener("input", filterItems);
  document.addEventListener("DOMContentLoaded", displayItems);

  checkUI(); // Al cargar la página lo comprobamos
}

init();
