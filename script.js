const itemForm = document.getElementById("item-form"); // <form>
const itemInput = document.getElementById("item-input"); // <input>
const itemList = document.getElementById("item-list"); // <ul>
const clearButton = document.getElementById("clear"); // <button>

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

	itemList.appendChild(li);

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
		e.target.parentElement.parentElement.remove();
	}
}

function clearItems(e) {
	while (itemList.firstChild) {
		itemList.removeChild(itemList.firstChild);
	}
}

// Event Listeners
itemForm.addEventListener("submit", addItem);
itemList.addEventListener("click", removeItem);
clearButton.addEventListener("click", clearItems);