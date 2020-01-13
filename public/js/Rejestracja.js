function validate() {


    var ids = ["login", "password", "imie", "nazwisko", "mail", "telefon", "adres"];
    var idsPL = ["Login", "Hasło", "Imie", "Nazwisko", "E-mail", "Telefon", "Adres"];

    // Tekst komunikatów
    var polaFormularzu = [], polaInput = [], errors = [], flags = [];

    for (i of ids) {
        polaFormularzu.push(document.getElementById(i));
        polaInput.push(document.getElementById(i).value);
        errors.push(document.getElementById(i.concat("error")));
        flags.push(false);
    }

    var regexs = [
        /^[a-zA-Z0-9\s][^\s]+$/, // Login
        /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&+=.\-_*])([a-zA-Z0-9@#$!%^&+=*.\-_]){3,}$/, // Hasło
        /[A-Z]\D+[- ąćęłńóśźżĄĆĘŁŃÓŚŹŻ]*/,  // Imię
        /[A-Z]\D+[- ąćęłńóśźżĄĆĘŁŃÓŚŹŻ]*/,  // Nazwisko
        /\S+@\S+\.\S+$/,    // Email
        /[+]?\d{3}/,    // Telefon
        /\w+\W*[- ąćęłńóśźżĄĆĘŁŃÓŚŹŻ]*/ // Adres
    ];

    for (var i = 0; i < ids.length; i++) {
        if (polaInput[i] === "") {
            errors[i].innerHTML = "Wpisz " + idsPL[i] + "!";
            wskazError(i);
        }
        else if (polaInput[i].length <= 5 && (i == 0 || i == 1)) {
            errors[i].innerHTML = "Popraw " + idsPL[i] + "!";
            wskazError(i);
        }
        else if (polaInput[i] !== "") {
            if (regexs[i].test(polaInput[i]) === true)
                flags[i] = true;
            else {
                errors[i].innerHTML = "Popraw " + idsPL[i] + "!";
                wskazError(i);
            }
        }

        if (flags[i] == true) {
            polaFormularzu[i].style.backgroundColor = "white";
            errors[i].style.display = "none";
            errors[i].style.display = "block";
            errors[i].innerHTML = "";
        }
    }

    if (flags.every(x => x == true)) {
        window.location = "Logowanie.html";
        return false;
    }

    function wskazError(i) {
        polaFormularzu[i].style.backgroundColor = "#eea4a4";
        errors[i].style.display = "block";
        polaFormularzu[i].focus();
        flags[i] = false;
    }

}