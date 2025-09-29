const itemForm = document.getElementById("item-form"); // <form>
const itemInput = document.getElementById("item-input"); // <input>
const itemList = document.getElementById("item-list"); // <ul>
const clearButton = document.getElementById("clear"); // <button>
const itemFilter = document.getElementById("filter"); // <input>

function addItem(e) {
	e.preventDefault();

	// Extract content from input 
	const newItem = itemInput.value;

	// Validate Input
	if (newItem === "") {
		alert("Please add an item");
		return;
	}

	// Create list item
	const li = document.createElement("li");
	li.appendChild(document.createTextNode(newItem));

	// Add the button to the li
	const button = createButton("remove-item btn-link text-red");
	li.appendChild(button);

	// Add the li to the DOM
	itemList.appendChild(li);

	//Si era el primer elemento que hemos añadido, mostrar botones para filtrar y limpiar todo
	checkUI();

	// Reset the value of the input
	itemInput.value = "";
}

function createIcon (classes) {
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

function removeItem(e) {
	if (e.target.parentElement.classList.contains("remove-item")) {
		// cofirm lanza un alert para confirmar que queremos borrarlo
		if (confirm("Are you sure?")) {
			e.target.parentElement.parentElement.remove();
			checkUI();
		}
	}
	// Si era el último item ocultamos las opciones de filtrar y clear
}

function clearItems(e) {
	while (itemList.firstChild) {
		itemList.removeChild(itemList.firstChild);
	}
	checkUI();
}



function filterItems(e) {
	const items = itemList.querySelectorAll("li");
	const filter = e.target.value.toLowerCase();
	items.forEach(item => {
		if (!item.textContent.toLowerCase().includes(filter))
			item.style.display = "none";
		else
			item.style.display = "flex";
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

// Event Listeners
itemForm.addEventListener("submit", addItem);
itemList.addEventListener("click", removeItem);
clearButton.addEventListener("click", clearItems);
itemFilter.addEventListener("input", filterItems);

checkUI(); // Al cargar la página lo comprobamos