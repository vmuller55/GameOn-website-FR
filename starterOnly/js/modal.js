// DOM Elements
	/// "Je m'inscris" button
	const modalBtn = document.querySelectorAll(".modal-btn");

	/// Modal
	const modalContent = document.getElementById("content");
	const modalBg = document.querySelector(".bground");
	const closeModalBtn = document.getElementById("close");

	/// Form
	const form = document.getElementById("save_the_date_form");
	const formData = document.querySelectorAll(".formData");
	const submitBtn = document.getElementById("submit");
	
	/// Greeting Modal
	const greetingsModal = document.getElementById("modal-greetings");
	const closeGreetingsModalBtn = document.getElementById("greetings-btn");

	/// Validation of the form
	const firstNameInput = document.getElementById("first");
	const lastNameInput = document.getElementById("last");
	const emailInput = document.getElementById("email");
	const birthdateInput = document.getElementById("birthdate");
	const tournamentNbInput = document.getElementById("quantity");

	/// Alert for Location Missing
	const locationInput = document.getElementsByName('location');
	const locationAlert = document.querySelector(".location-alert");

	/// Delay for Animations
	const delay = 490;


// Actions:
	/// Modal
		//// Launch Modal Event
		modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

		//// Check if CGU is Checked
		checkCGU();
		document.getElementById("checkbox1").addEventListener("click", checkCGU);

		//// Close Modal Event
		closeModalBtn.onclick = function () {
			closeAndClearLocalStorage();
		};
		window.onclick = function(e) {
			if (e.target == modalBg) {
				closeAndClearLocalStorage();
			}
		}
		closeGreetingsModalBtn.onclick = function () {
			closeAndClearLocalStorage();
		};

		////Error Messages when User Input is Incorrect
		let checkForm = new CheckForm();

		firstNameInput.addEventListener("input", () => checkForm.checkTextInput(firstNameInput));

		lastNameInput.addEventListener("input", () => checkForm.checkTextInput(lastNameInput));

		emailInput.addEventListener("input", () => checkForm.checkEmailInput(emailInput));

		birthdateInput.addEventListener("input", () => checkForm.checkBirthdateInput(birthdateInput));

		tournamentNbInput.addEventListener("input", () => checkForm.checkTournamentInput(tournamentNbInput));
		
		////Check if the User has Selected a Location
		function locationIsNotValid () {
			locationAlert.style.borderColor = "red";
			locationAlert.style.borderWidth = "2px";
			locationAlert.style.borderStyle = "solid";
			locationAlert.style.borderRadius = "7px";
			locationAlert.style.padding = "0 5px 10px 0";
			document.getElementsByClassName("locationError")[0].style.display = "block";
			document.getElementsByClassName("locationError")[0].textContent = "Veuillez choisir une ville.";
		}
		function locationIsValid () {
			locationAlert.style.borderStyle = "none";
			locationAlert.style.padding = "0";
			document.getElementsByClassName("locationError")[0].style.display = "none";
		}

		function checkLocationInput() {
			if (getLocation() === undefined) {
				locationIsNotValid();
			} else {
				locationIsValid();
			}
		};

		for (let i = 0; i < locationInput.length; i++) {
			locationInput[i].addEventListener("click", () => checkLocationInput());
		};


//Functions:
	///Animation for Opening and Closing of Modal
		//// Responsive NavBar
		function editNav() {
			var x = document.getElementById("myTopnav");
			if (x.className === "topnav") {
				x.className += " responsive";
			} else {
				x.className = "topnav";
			}
		}

		//// Launch Modal Form
		function launchModal() {
			animateModal1();
			modalBg.style.display = "block";
		}

		function animateModal1() {
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

		function animateModal2() {
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

		function closeAndClearLocalStorage() {
			animateModal2();
			localStorage.clear();
			setTimeout(function () {
			greetingsModal.style.display = "none";
			form.style.display = "block";
			modalBg.style.display = "none";
			form.reset();
			}, delay);
		}

		////CGU Checking
		function checkCGU() {
			if (document.getElementById('checkbox1').checked) {  
			submitBtn.disabled = false;
			} else {
			submitBtn.disabled = true;
			}
		};

		////Get the Location Selected by the User
		function getLocation() {
			var x = document.getElementsByName('location');
			for(let i = 0; i < x.length; i++) {
			if(x[i].checked === true) {
				var locationChoice = x[i].value;
				return locationChoice;
			}
			}
		}

		////Submission of the Form Functions
		function regexValidation()  {
			if (checkForm.checkTextInput(firstNameInput) != true) {
			return false;
			} else if (checkForm.checkTextInput(lastNameInput) != true) {
			return false;
			} else if (checkForm.checkEmailInput(emailInput) != true) {
			return false;
			} else if (checkForm.checkBirthdateInput(birthdateInput) != true) {
			return false;
			} else if (checkForm.checkTournamentInput(tournamentNbInput) != true) {
			return false;
			} else if (getLocation() === undefined) {
				locationIsNotValid();
			return false;
			} else {
			return true;
			}
		}
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
		function validate() {
			if (regexValidation() === true) {
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
				return false;
			} else {
				return false;
			}
		}