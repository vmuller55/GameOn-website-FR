class CheckForm {
    constructor () {
        this.inputRegex = /^[a-zA-Z éèôâàîêëï-]{2,}$/;
        this.emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        this.birthdateRegex = /^(19[0-9][0-9]|20[01][0-9]|2020|2021|2022)[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/
        this.tournamentRegex = /^[0-9]{1,2}$/;
    }

    showErrorMessage (input,message) {
        let parent = input.parentNode;
        let divMessage = parent.querySelector(".error");
        if (divMessage == null) {
            input.style.border = "outset";
			input.style.borderColor = "red";
			input.style.borderWidth = "3px";
            divMessage = document.createElement("div");
            divMessage.classList.add("error");
        }
        divMessage.textContent = message;
        parent.appendChild(divMessage);
    }

    removeErrorMessage (input) {
        let parent = input.parentNode;
        let divMessage = parent.querySelector(".error");
        if (divMessage != null) {
            input.style.borderColor = "transparent";
            parent.removeChild(divMessage);
        }
    }

    checkTextInput (input) {
        if (this.inputRegex.test(input.value) != true) {
            this.showErrorMessage(input, "2 lettres minimum, pas de chiffres ou caractères spéciaux.");
            return false;
        }
        this.removeErrorMessage(input);
        return true;
    }

    checkEmailInput (input) {
        if (this.emailRegex.test(input.value) != true) {
            this.showErrorMessage(input, "Email invalide.");
            return false;
        }
        this.removeErrorMessage(input);
        return true;
    }

    checkBirthdateInput (input) {
        if (this.birthdateRegex.test(input.value) != true) {
            this.showErrorMessage(input, "Date invalide. Vérifiez l'année saisie.");
            return false;
        }
        this.removeErrorMessage(input);
        return true;
    }

    checkTournamentInput (input) {
        if (this.tournamentRegex.test(input.value) != true) {
            this.showErrorMessage(input, "Nombre de tournois invalide.");
            return false;
        }
        this.removeErrorMessage(input);
        return true;
    }
}