const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");

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

// Event Listeners
itemForm.addEventListener("submit", addItem);