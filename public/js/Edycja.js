function validate(url) {


    var ids = ["kategoria", "nazwa", "podkategoria", "cena", "kraj", "opis"];
    var idsPL = ["Kategoria", "Nazwa", "Podkategoria", "Cena", "Kraj pochodzenia", "Opis"];

    // Tekst komunikatów
    var polaFormularzu = [], polaInput = [], errors = [], flags = [];

    for (i of ids) {
        polaFormularzu.push(document.getElementById(i));
        polaInput.push(document.getElementById(i).value);
        errors.push(document.getElementById(i.concat("error")));
        flags.push(false);
    }

    var regexs = [
        /[A-Z]\D+[- ¹æê³ñóœŸ¿¥ÆÊ£ÑÓŒ¯]*/,  // Kategoria
        /[A-Z]\D+[- ¹æê³ñóœŸ¿¥ÆÊ£ÑÓŒ¯]*/,  // Nazwa
        /[A-Z]\D+[- ¹æê³ñóœŸ¿¥ÆÊ£ÑÓŒ¯]*/,  // Podkategoria
        /\d/,                        // Cena
        /[A-Z]\D+[- ¹æê³ñóœŸ¿¥ÆÊ£ÑÓŒ¯]*/,  // Kraj
        /[A-Z]\D+[- ¹æê³ñóœŸ¿¥ÆÊ£ÑÓŒ¯]*/,  // Opis
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


        return false;
    }

    function wskazError(i) {
        polaFormularzu[i].style.backgroundColor = "#eea4a4";
        errors[i].style.display = "block";
        polaFormularzu[i].focus();
        flags[i] = false;
    }
}