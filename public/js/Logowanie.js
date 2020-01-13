function validate() {
    var info = '';
    var login1 = document.getElementById("login")
    var pass1 = document.getElementById("password")
    var logine1 = document.getElementById("loginerror")
    var passer1 = document.getElementById("passworderror")

    var login = document.getElementById("login").value;
    var pass = document.getElementById("password").value;


    if (pass == "Admin" && login == "Admin") {
        window.location = "StronaGlownaPoZalogowaniu.html";
        return false;
    }

    if ((login !== "Admin" || pass !== "Admin") && (login || pass !== "")) {
        info += 'Błędne dane! \n';
        login1.style.backgroundColor = "#ffd5d5";
        pass1.style.backgroundColor = "#ffd5d5";
        login1.focus();

    }

    if (login == "" || pass == "") {
        info = "Uzupełnij pola!";
        login1.style.backgroundColor = "#ffd5d5";
        pass1.style.backgroundColor = "#ffd5d5";

    }
    alert(info);

}