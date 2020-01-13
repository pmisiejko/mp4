const produktsView = document.getElementById('view-produkts');
const tbodyProdukts = document.getElementById('tbodyProdukts');

const formView = document.getElementById('view-form');
const formTitle = document.getElementById('form-title');
const saveButton = document.getElementById('form-submit');
const formId = document.getElementById('form-produktId');
const formFirstName = document.getElementById('form-firstName');
const formLastName = document.getElementById('form-lastName');



const iddetails = document.getElementById('iddetails');
const nazwadetails = document.getElementById('nazwadetails');
const zdjeciedetails = document.getElementById('zdjeciedetails');
const kategoriadetails = document.getElementById('kategoriadetails');
const podkategoriadetails = document.getElementById('podkategoriadetails');
const cenadetails = document.getElementById('cenadetails');
const krajdetails = document.getElementById('krajdetails');
const opisdetails = document.getElementById('opisdetails');


let data=[];
let dataciete=[];
var temp=[];

getAndRenderProdukts();
//pobranie danych z serwera przez API 
//i przekazanie ich do funkcji aktualizującej widok
function getAndRenderProdukts() {
    getProduktListCall(renderProduktsTable);
}

//tworzymy widok tabeli z danymi użytkowników
//na podstawie listy użytkowników (obiektów typu JSON)
function renderProduktsTable(produktList) {

    //usuwamy istniejące wiersze z danymi z widoku
    while (tbodyProdukts.firstChild) {
        tbodyProdukts.removeChild(tbodyProdukts.firstChild);
    }
    //tworzymy wiersze tabeli z danymi użytkowników na podstawie listy obiektów
    let produktsHtml = "";
    produktList.forEach(u => {
		
        produktsHtml += `
            <tr>
                <td>${u.zdjecie}</td>            
                <td>${u.nazwa}</td>            
                <td>${u.podkategoria}</td>
                <td class="actions">
					<button class = "edycja" onClick="deleteProdukt(parseInt(${u.id}))">EDYTUJ</button>
					<button class = "edycja" onClick="deleteProdukt(parseInt(${u.id}))">USUŃ</button>
					<button class = "edycja" onClick="showDetails(${u.id})"">SZCZEGÓŁY</button>
                </td>            
            </tr>
        `;
		data+=u.id+"!"+u.nazwa+"!"+u.zdjecie+"!"+u.kategoria+"!"+u.podkategoria+"!"+u.cena+"!"+u.kraj+"!"+u.opis+"_";
    });
	
    tbodyProdukts.innerHTML = produktsHtml;
    //pokaż widok listy użytkowniów
dataciete=data.trim().split("_");


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
 
  
    //ustawiamy wartości pól formularza (dla widoku szczegółów lub edycji)
	
		
   
/* 
 
 */




    //ustawiamy działanie guzika 'zapisz' w zależności od trybu formularza
    saveButton.onclick = () => { 
        saveForm(formModeSettings.saveActionApiCall);
     };

}

function showDetails(produktId) {



	for(i=0;i<dataciete.length;i++){
		let string=[];
		string=dataciete[i].split("!");
		if(parseInt(string[0])===produktId)
		{
		

		iddetails.innerHTML = 'ID: '+string[0];
		nazwadetails.innerHTML = '<b>'+string[1]+'</b>';
		zdjeciedetails.innerHTML = string[2];
		kategoriadetails.innerHTML = 'Kategoria: '+string[3];
		podkategoriadetails.innerHTML = 'Podkategoria: '+string[4];
		cenadetails.innerHTML = 'Cena[PLN]: '+string[5];
		krajdetails.innerHTML = 'Kraj pochodzenia: '+string[6];
		opisdetails.innerHTML = 'Opis: '+string[7];
		
		}
	}
    //sgetProduktDetailsCall(produktId, 'details', showProduktForm);
	window.location = "Rosliny.html#details";
	
}

function showEdit(produktId) {
    getProduktDetailsCall(produktId, 'edit', showProduktForm);
}

function showNew() {
    showProduktForm('new', {firstName: '', lastName: ''});
}

function deleteProdukt(produktId) {
    deleteProduktCall(produktId, getAndRenderProdukts);
}


function saveForm(apiCall) {
    // console.log(`saveForm(${action})`);

    //pobranie danych z formularza 
    //i utworznie obiektu produkt-a
    const produktData = {
        id: formId.value,
        firstName: formFirstName.value,
        lastName: formLastName.value
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

function cancelForm() {
    formView.classList.add("hidden");
    produktsView.classList.remove("hidden");
}


/**
 *  konfiguracja formularza w zależności od trybu 
 *  title - tytuł formularza
 *  readonly - czy pola formularza będą tylko do odczytu
 *  saveActionApiCall - funkcja (z produktsApiCalls.js) wywołująca API back-endu
 */
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