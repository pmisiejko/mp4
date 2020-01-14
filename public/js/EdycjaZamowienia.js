function validate(url) {


    function validate(url) {


        var ids = ["data", "status", "rabat", "adres"];
        var idsPL = ["Data", "Status", "Rabat", "Adres"];

        // Tekst komunikat�w
        var polaFormularzu = [], polaInput = [], errors = [], flags = [];

        for (i of ids) {
            polaFormularzu.push(document.getElementById(i));
            polaInput.push(document.getElementById(i).value);
            errors.push(document.getElementById(i.concat("error")));
            flags.push(false);
        }

        var regexs = [
            /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/, //Data
            /[A-Z]\D+[- ąćęłńóśźżĄĆĘŁŃÓŚŹŻ]*/,  // Status
            /\d/,                               // Rabat
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
            window.location = url.concat(".html");

            return false;
        }

        function wskazError(i) {
            polaFormularzu[i].style.backgroundColor = "#eea4a4";
            errors[i].style.display = "block";
            polaFormularzu[i].focus();
            flags[i] = false;
        }
    }
}