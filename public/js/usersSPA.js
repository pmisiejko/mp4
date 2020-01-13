
const saveButton = document.getElementById('zapisz');
const formlogin = document.getElementById('login');
const formpassword = document.getElementById('password');
const formimie = document.getElementById('imie');
const formnazwisko = document.getElementById('nazwisko');
const formmail = document.getElementById('mail');
const formtelefon = document.getElementById('telefon');
const formadres = document.getElementById('adres');


const formModes = {
    details: {
        title: "Szczegóły użytkownika",
        readonly: true,
        saveActionApiCall: null
    },
    "new": {
        title: "Nowy użytkownik",
        readonly: false,
        saveActionApiCall: addUserCall
    },
    edit: {
        title: "Edycja użytkownika",
        readonly: false,
        saveActionApiCall: editUserCall
    }
};
 showUserForm('new', {firstName: '', lastName: ''});
//pobranie danych z serwera przez API 
//i przekazanie ich do funkcji aktualizującej widok
function getAndRenderUsers() {
    getUserListCall(renderUsersTable);
}

//tworzymy widok tabeli z danymi użytkowników
//na podstawie listy użytkowników (obiektów typu JSON)
function renderUsersTable(userList) {

}

/**
 * Wyświetla formularz użytkownika
 * @param {String} mode Tryb formularza - szczegóły (details),
 *  nowy użytkownik (new), edycja (edit)
 * @param {User} userData - dane użytkownika do wyświetlenia 
 */
    
function showUserForm(mode, userData) {
    const formModeSettings = formModes[mode];
    // console.log(`showUserForm() mode: ${mode}, settings: ${JSON.stringify(formModeSettings)} userData: ${JSON.stringify(userData)}`);

    if(mode == "new") {
        userData = {firstName: '', lastName: ''};
    }
    
    saveButton.onclick = () => { 
	if(validate()===false)
	{
        alert("Dodano użytkownika!");
		saveForm(formModeSettings.saveActionApiCall);
	}
     };

  
}


function saveForm(apiCall) {
    // console.log(`saveForm(${action})`);

    //pobranie danych z formularza 
    //i utworznie obiektu user-a
    const userData = {
        login: formlogin.value, 
		haslo: formpassword.value, 
		firstName: formimie.value, 
		lastName: formnazwisko.value, 
		adres: formadres.value, 
		punkty: '0', 
		mail: formmail.value, 
		telefon: formtelefon.value
    }
    
    // if('add' == action) {
        apiCall(userData, getAndRenderUsers);
    // } else if('edit' == action) {
    //     editUserCall(userData, getAndRenderUsers);
    // }

    //BARDZO WAŻNE - akcja guzika na formularzu powinna zwrócić false, inaczej
    //formularz będzie wysłany w standardowy sposób, a strona będzie przeładowana
    return false;
}

/**
 *  konfiguracja formularza w zależności od trybu 
 *  title - tytuł formularza
 *  readonly - czy pola formularza będą tylko do odczytu
 *  saveActionApiCall - funkcja (z usersApiCalls.js) wywołująca API back-endu
 */
