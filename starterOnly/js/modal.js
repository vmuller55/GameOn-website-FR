/**
* DOM ELEMENTS
*/
/**
* MODAL
*/
const modalBtn = document.querySelectorAll(".modal-btn");
const modalContent = document.getElementById("content");
const modalBg = document.querySelector(".bground");
const closeModalBtn = document.getElementById("close");
/**
* FORM 
*/
const form = document.getElementById("save_the_date_form");
const formData = document.querySelectorAll(".formData");
const submitBtn = document.getElementById("submit");
/**
* FORM VALIDATION
*/
const firstNameInput = document.getElementById("first");
const lastNameInput = document.getElementById("last");
const emailInput = document.getElementById("email");
const birthdateInput = document.getElementById("birthdate");
const tournamentNbInput = document.getElementById("quantity");
/**
* MISSING LOCATION ON FORM
*/
const locationInput = document.getElementsByName('location');
const locationAlert = document.querySelector(".location-alert");
/**
* GREETINGS
*/
const greetingsModal = document.getElementById("modal-greetings");
const closeGreetingsModalBtn = document.getElementById("greetings-btn");

/**
* CONST
*/
/**
* LOCAL STORAGE DURATION
*/
const delay = 490;


/**
* METHOD
*/
/**
* Listener on btn to execute launchModal function
*/
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
/**
* Check if CGU is checked
*/
checkCGU();
document.getElementById("checkbox1").addEventListener("click", checkCGU);
/**
* Execute close function on click (close button)
*/
closeModalBtn.addEventListener("click", function () {
	closeAndClearLocalStorage();
});
/**
* Execute close function on click (oustide modal)
*/
window.addEventListener("click", function(e) {
	if (e.target == modalBg) {
		closeAndClearLocalStorage();
	}
})
/**
* Execute close function (close button after form)
*/
closeGreetingsModalBtn.addEventListener("click", function () {
	closeAndClearLocalStorage();
});
/**
* Use formCheck.js functions to check input 
*/
let checkForm = new CheckForm();

firstNameInput.addEventListener("input", () => checkForm.checkTextInput(firstNameInput));
lastNameInput.addEventListener("input", () => checkForm.checkTextInput(lastNameInput));
emailInput.addEventListener("input", () => checkForm.checkEmailInput(emailInput));
birthdateInput.addEventListener("input", () => checkForm.checkBirthdateInput(birthdateInput));
tournamentNbInput.addEventListener("input", () => checkForm.checkTournamentInput(tournamentNbInput));
/**
* Check if location is selected
*/
for (let i = 0; i < locationInput.length; i++) {
	locationInput[i].addEventListener("click", () => checkLocationInput());
};
function checkLocationInput() {
	if (getLocation() === undefined) {
		locationIsNotValid();
	} else {
		locationIsValid();
	}
};
/**
* If it's not valid => user alert
*/
function locationIsNotValid () {
	locationAlert.classList.add("errorLocation")
	document.getElementsByClassName("locationError")[0].style.display = "block";
	document.getElementsByClassName("locationError")[0].textContent = "Veuillez choisir une ville.";
}
function locationIsValid () {
	locationAlert.classList.remove("errorLocation")
	document.getElementsByClassName("locationError")[0].style.display = "none";
}

/**
* Functions
*/
function editNav() {
	let opacityMain = document.querySelector("main");
	let opacityFooter = document.querySelector("footer");
	var x = document.getElementById("myTopnav");
	if (x.className === "topnav") {
		x.className += " responsive";	
		opacityMain.style.opacity = "10%"
		opacityFooter.style.opacity = "10%"
	}	
	 else {
		x.className = "topnav";
		opacityMain.style.opacity = "100%"
		opacityFooter.style.opacity = "100%"
	}
}

/**
* Function wich change modal display from none to block
*/
function launchModal() {
	openModalAnimation();
	modalBg.style.display = "block";
}
/**
* Function wich change modal display from block to none // clear local storage // add Timeout 
*/
function closeAndClearLocalStorage() {
	closeModalAnimation();
	localStorage.clear();
	setTimeout(function () {
		greetingsModal.style.display = "none";
		form.style.display = "block";
		modalBg.style.display = "none";
		form.reset();
	}, delay);
}
/**
* Function wich change modalContent class at oppening and closing modal
*/
function openModalAnimation() {
	if (modalContent.classList.contains("content_reverse")) {
		modalContent.classList.remove("content_reverse");
		modalContent.classList.add("content");
	} else if (modalContent.classList.contains("content")) {
		modalContent.classList.remove("content");
		modalContent.classList.add("content");
	} else {
		modalContent.classList.add("content");
	}
}
function closeModalAnimation() {
	if (modalContent.classList.contains("content")) {
		modalContent.classList.remove("content");
		modalContent.classList.add("content_reverse");
	} else if (modalContent.classList.contains("content_reverse")) {
		modalContent.classList.remove("content_reverse");
		modalContent.classList.add("content_reverse");
	} else {
		modalContent.classList.add("content_reverse");
	}
}
/**
* Function wich check if CGU is checked and allow click on submit button 
*/
function checkCGU() {
	if (document.getElementById('checkbox1').checked) {  
		submitBtn.disabled = false;
	} else {
		submitBtn.disabled = true;
	}
};

/**
* Function wich check selected location 
* @returns value of input selected
*/
function getLocation() {
	let location = document.getElementsByName('location');
	for(let i = 0; i < location.length; i++) {
		if(location[i].checked) {
			return location[i].value;
		}
	}
}
/**
* Function wich check all input
* @returns true after check all input or false 
*/

function regexValidation()  {
	if (!checkForm.checkTextInput(firstNameInput)) {
		return false;
	} else if (!checkForm.checkTextInput(lastNameInput)) {
		return false;
	} else if (!checkForm.checkEmailInput(emailInput)) {
		return false;
	} else if (!checkForm.checkBirthdateInput(birthdateInput)) {
		return false;
	} else if (!checkForm.checkTournamentInput(tournamentNbInput)) {
		return false;
	} else if (getLocation() === undefined) {
		locationIsNotValid();
		return false;
	} 
	return true;
}
/**
* Function wich store user data in local storage
*/
function storeUserData() {
	localStorage.setItem("firstName", firstNameInput.value);
	localStorage.setItem("lastName", lastNameInput.value);
	localStorage.setItem("email", emailInput.value);
	localStorage.setItem("birthdate", birthdateInput.value);
	localStorage.setItem("tournamentNb", tournamentNbInput.value);
	localStorage.setItem("locationChoice", getLocation());
	if(document.getElementById('checkbox2').checked === true) {
		localStorage.setItem("inscription Newsletter", "true");
	} else {
		localStorage.setItem("inscription Newsletter", "false");
	}
}
/**
* Function wich check if inputs are correctly done, execute storeUserData, show greetings message
* @returns 
*/
function validate() {
	if (regexValidation() == true) {
		storeUserData();
		document.getElementById("registered_user_name").textContent = localStorage.getItem("firstName") + " " + localStorage.getItem("lastName");
		document.getElementById("chosen_location").textContent = localStorage.getItem("locationChoice");
		if(localStorage.getItem("inscription Newsletter") === "true") {
			document.getElementById("greetings-message").style.display = "block";
		} else {
			document.getElementById("greetings-message").style.display = "none";
		};
		form.style.display = "none";
		greetingsModal.style.display = "flex";
		return false
	}
	return false
}