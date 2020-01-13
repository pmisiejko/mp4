
const saveButton = document.getElementById('zapisz');
const formfoto = document.getElementById('foto');
const formid= document.getElementById('id');
const formkategoria = document.getElementById('kategoria');
const formnazwa = document.getElementById('nazwa');
const formpodkategoria = document.getElementById('podkategoria');
const formcena = document.getElementById('cena');
const formkraj = document.getElementById('kraj');
const formopis = document.getElementById('opis');


const formModes = {
    details: {
        title: "Szczegóły użytkownika",
        readonly: true,
        saveActionApiCall: null
    },
    "new": {
        title: "Nowy użytkownik",
        readonly: false,
        saveActionApiCall: addProduktCall
    },
    edit: {
        title: "Edycja użytkownika",
        readonly: false,
        saveActionApiCall: editProduktCall
    }
};
 showProduktForm('new', {firstName: '', lastName: ''});
//pobranie danych z serwera przez API 
//i przekazanie ich do funkcji aktualizującej widok
function getAndRenderProdukts() {
    getProduktListCall(renderProduktsTable);
}

//tworzymy widok tabeli z danymi użytkowników
//na podstawie listy użytkowników (obiektów typu JSON)
function renderProduktsTable(produktList) {

}

/**
 * Wyświetla formularz użytkownika
 * @param {String} mode Tryb formularza - szczegóły (details),
 *  nowy użytkownik (new), edycja (edit)
 * @param {Produkt} produktData - dane użytkownika do wyświetlenia 
 */
    
function showProduktForm(mode, produktData) {
    const formModeSettings = formModes[mode];
    // console.log(`showProduktForm() mode: ${mode}, settings: ${JSON.stringify(formModeSettings)} produktData: ${JSON.stringify(produktData)}`);

    if(mode == "new") {
        produktData = {firstName: '', lastName: ''};
    }
    
    saveButton.onclick = () => { 
	if(validate('Rosliny')===false)
	{
        alert("Dodano produkt!");
		saveForm(formModeSettings.saveActionApiCall);
		window.location = "Rosliny.html";
	}
     };

  
}


function saveForm(apiCall) {
    // console.log(`saveForm(${action})`);

    //pobranie danych z formularza 
    //i utworznie obiektu produkt-a
    const produktData = {
        id: formid.value, 
		zdjecie: '<img src="images/'+formfoto.files[0].name+'" height="100" width="100">', 
		nazwa: formnazwa.value, 
		kategoria: formkategoria.value, 
		podkategoria: formpodkategoria.value, 
		cena: formcena.value, 
		kraj: formkraj.value, 
		opis: formopis.value
    }
    
    // if('add' == action) {
        apiCall(produktData, getAndRenderProdukts);
    // } else if('edit' == action) {
    //     editProduktCall(produktData, getAndRenderProdukts);
    // }

    //BARDZO WAŻNE - akcja guzika na formularzu powinna zwrócić false, inaczej
    //formularz będzie wysłany w standardowy sposób, a strona będzie przeładowana
    return false;
}

/**
 *  konfiguracja formularza w zależności od trybu 
 *  title - tytuł formularza
 *  readonly - czy pola formularza będą tylko do odczytu
 *  saveActionApiCall - funkcja (z produktsApiCalls.js) wywołująca API back-endu
 */
