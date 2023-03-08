class CheckForm {
    /**
     * Regex constructor (use to verify input)
     */
    constructor () {
        this.inputRegex = /^[a-zA-Z éèôâàîêëï-]{2,}$/;
        this.emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        this.birthdateRegex = /^(19[0-9][0-9]|20[01][0-9])[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/
        this.tournamentRegex = /^[0-9]{1,2}$/;
    }
    /**
     * Function wich change input style in case of error // create a div class error 
     * @param {string} input 
     * @param {string} message 
     */
    showErrorMessage (input,message) {
        let parent = input.parentNode;
        let divMessage = parent.querySelector(".error");
        if (!divMessage) {
            input.classList.add("errorBorder");
            divMessage = document.createElement("div");
            divMessage.classList.add("error");
        }
        divMessage.textContent = message;
        parent.appendChild(divMessage);       
    }
    /**
     * Function wich change input style and remove div class error 
     * @param {string} input 
     */
    removeErrorMessage (input) {
        let parent = input.parentNode;
        let divMessage = parent.querySelector(".error");
        if (divMessage) {
            input.classList.remove("errorBorder");
            parent.removeChild(divMessage);
        }
    }
    /**
     * Function wich test input with regex
     * @param {string} input 
     * @returns false or true 
     */
    checkTextInput (input) {
        if (!this.inputRegex.test(input.value.trim())) {
            this.showErrorMessage(input, "2 lettres minimum, pas de chiffres ou caractères spéciaux.");
            return false;
        }
        this.removeErrorMessage(input);
        return true;
    }

    checkEmailInput (input) {
        if (!this.emailRegex.test(input.value.trim())) {
            this.showErrorMessage(input, "Email invalide.");
            return false;
        }
        this.removeErrorMessage(input);
        return true;
    }

    checkBirthdateInput (input) {
        if (!this.birthdateRegex.test(input.value)) {
            this.showErrorMessage(input, "Date invalide. Vérifiez l'année saisie.");
            return false;
        }
        this.removeErrorMessage(input);
        return true;
    }

    checkTournamentInput (input) {
        if (!this.tournamentRegex.test(input.value)) {
            this.showErrorMessage(input, "Nombre de tournois invalide.");
            return false;
        }
        this.removeErrorMessage(input);
        return true;
    }
}