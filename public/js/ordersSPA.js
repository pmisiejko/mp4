const ordersView = document.getElementById('view-orders');
const tbodyOrders = document.getElementById('tbody-orders');

/* const formView = document.getElementById('view-form');
const formTitle = document.getElementById('form-title');
const saveButton = document.getElementById('form-submit');
const formId = document.getElementById('form-orderId');
const formFirstName = document.getElementById('form-firstName');
const formLastName = document.getElementById('form-lastName');
 */
 const idZamowienia = document.getElementById('idZamowienia');
const IdKlienta = document.getElementById('IdKlienta');
const data = document.getElementById('data');
const daneKlienta = document.getElementById('daneKlienta');
const adres = document.getElementById('adres');
const idProduktow = document.getElementById('idProduktow');
const ilosc = document.getElementById('ilosc');
const cena = document.getElementById('cena');
const produkty = document.getElementById('produkty');
let dane=[];
let dataciete=[];
let daneroslin=[]
let daneroslinciete=[]
let daneuserow=[]
let daneuserowciete=[]
let uzytkownik=[]
let useridentyfikator;
let temp=[]
let items = [];
let itemsnumber =[];
let suma;
getAndRenderUsers();
getAndRenderProdukts();
getAndRenderOrders();

//pobranie danych z serwera przez API 
//i przekazanie ich do funkcji aktualizującej widok
function getAndRenderOrders() {
    getOrderListCall(renderOrdersTable);
}

//tworzymy widok tabeli z danymi użytkowników
//na podstawie listy użytkowników (obiektów typu JSON)
function renderOrdersTable(orderList) {

    //usuwamy istniejące wiersze z danymi z widoku
    while (tbodyOrders.firstChild) {
        tbodyOrders.removeChild(tbodyOrders.firstChild);
    }
    //tworzymy wiersze tabeli z danymi użytkowników na podstawie listy obiektów
    let ordersHtml = "";
    orderList.forEach(u => {
        ordersHtml += `
            <tr>
                <td>${u.idZamowienia}</td>            
                <td>${u.data}</td>           
                <td class="actions">
                    <button class = "edycja" onClick="deleteProdukt(parseInt(${u.id}))">EDYTUJ</button>
					<button class = "edycja" onClick="deleteOrder(parseInt(${u.idZamowienia}))">USUŃ</button>
					<button class = "edycja" onClick="showDetails(${u.idZamowienia})"">SZCZEGÓŁY</button>
                </td>            
            </tr>
        `;
		dane+=u.idZamowienia+"!"+u.IdKlienta+"!"+u.data+"!"+u.daneKlienta+"!"+u.adres+"!"+u.idProduktow+"!"+u.ilosc+"_";
		
		
    });
    tbodyOrders.innerHTML = ordersHtml;
    dataciete=dane.trim().split("_");
}

/**
 * Wyświetla formularz użytkownika
 * @param {String} mode Tryb formularza - szczegóły (details),
 *  nowy użytkownik (new), edycja (edit)
 * @param {Order} orderData - dane użytkownika do wyświetlenia 
 */
function showOrderForm(mode, orderData) {
    const formModeSettings = formModes[mode];
    // console.log(`showOrderForm() mode: ${mode}, settings: ${JSON.stringify(formModeSettings)} orderData: ${JSON.stringify(orderData)}`);

    if(mode == "new") {
        orderData = {firstName: '', lastName: ''};
    }
    //ustawiamy tytuł formularza w zależności od typu
    formTitle.innerText = formModeSettings.title;
    //dla widoku szczegółów pola formularza będą tylko do odczytu
    //a guzik 'Zapisz' nie będzie widoczny
    if(formModeSettings.readonly === true) {
        formFirstName.readOnly = true;
        formLastName.readOnly = true;
        saveButton.classList.add('hidden');
    } else {
        formFirstName.readOnly = false;
        formLastName.readOnly = false;
        saveButton.classList.remove('hidden');
    }
    //ustawiamy wartości pól formularza (dla widoku szczegółów lub edycji)
    formId.value = orderData.id;
    formFirstName.value = orderData.firstName;
    formLastName.value = orderData.lastName;

    //ustawiamy działanie guzika 'zapisz' w zależności od trybu formularza
    saveButton.onclick = () => { 
        saveForm(formModeSettings.saveActionApiCall);
     };

    formView.classList.remove("hidden");
    ordersView.classList.add("hidden");
}

function showDetails(orderId) {
   // getOrderDetailsCall(orderId, 'details', showOrderForm);
   suma=0;
   for(i=0;i<dataciete.length;i++){
		let string=[];
		string=dataciete[i].split("!");
		if(parseInt(string[0])===orderId)
		{
		
		useridentyfikator=string[1];
		idZamowienia.innerHTML = 'ID zamowienia: '+string[0];
		IdKlienta.innerHTML = 'ID klienta: '+string[1]+'</b>';
		data.innerHTML = 'Data zamówienia: '+string[2];
		daneKlienta.innerHTML = 'Dane klienta: ';
		adres.innerHTML = 'Adres: ';
		//idProduktow.innerHTML = 'Produkty: '+string[5];
		//ilosc.innerHTML = 'Ilość: '+string[6];
	items = string[5].split(" ");
	itemsnumber = string[6].split(" ");
		cena.innerHTML = 'Cena:';
		produkty.innerHTML='Produkty: '+'<br/>';
		}
   }
   
 

		
		for(i=0; i<daneuserowciete.length;i++)
		{
			temp=daneuserowciete[i].split("!");
			if(temp[0]===useridentyfikator)
			{
				daneKlienta.innerHTML += temp[1]+' '+temp[2];
					adres.innerHTML += temp[3];
			}
		}
		
		
		
		for(j=0; j<items.length;j++)
		{
		for(i=0; i<daneroslinciete.length;i++)
		{
			temp=daneroslinciete[i].split("!");
			if(temp[0]===items[j])
			{
				produkty.innerHTML+=temp[1]+' sztuk '+itemsnumber[j]+'<br/>';
				suma+=parseInt(itemsnumber[j])*parseInt(temp[2]);
				
			}
		}
		
		
		}
			
		cena.innerHTML = 'Suma: '+suma+'zł';
		
		
		
		
	
	window.location = "Zamowienia.html#details";


}

function showEdit(orderId) {
    getOrderDetailsCall(orderId, 'edit', showOrderForm);
}

function showNew() {
    showOrderForm('new', {firstName: '', lastName: ''});
}

function deleteOrder(orderId) {
    deleteOrderCall(orderId, getAndRenderOrders);
}


function saveForm(apiCall) {
    // console.log(`saveForm(${action})`);

    //pobranie danych z formularza 
    //i utworznie obiektu order-a
    const orderData = {
        id: formId.value,
        firstName: formFirstName.value,
        lastName: formLastName.value
    }
    
    // if('add' == action) {
        apiCall(orderData, getAndRenderOrders);
    // } else if('edit' == action) {
    //     editOrderCall(orderData, getAndRenderOrders);
    // }

    //BARDZO WAŻNE - akcja guzika na formularzu powinna zwrócić false, inaczej
    //formularz będzie wysłany w standardowy sposób, a strona będzie przeładowana
    return false;
}

function cancelForm() {
    formView.classList.add("hidden");
    ordersView.classList.remove("hidden");
}


//pobranie danych z serwera przez API 
//i przekazanie ich do funkcji aktualizującej widok
function getAndRenderProdukts() {
    getProduktListCall(renderProdukts);
}

//tworzymy widok tabeli z danymi użytkowników
//na podstawie listy użytkowników (obiektów typu JSON)
function renderProdukts(produktList) {

    //tworzymy wiersze tabeli z danymi użytkowników na podstawie listy obiektów
    let produktsHtml = "";
    produktList.forEach(u => {

		daneroslin+=u.id+"!"+u.nazwa+"!"+u.cena+"_";
    });
	
   
    //pokaż widok listy użytkowniów
daneroslinciete=daneroslin.split("_");


}
function getAndRenderUsers() {
    getUserListCall(renderUsers);
}

//tworzymy widok tabeli z danymi użytkowników
//na podstawie listy użytkowników (obiektów typu JSON)
function renderUsers(userList) {

    //tworzymy wiersze tabeli z danymi użytkowników na podstawie listy obiektów
  
    userList.forEach(u => {

		daneuserow+=u.id+"!"+u.firstName+"!"+u.lastName+"!"+u.adres+"_";
    });
	
   
    //pokaż widok listy użytkowniów
daneuserowciete=daneuserow.split("_");


}
/**
 *  konfiguracja formularza w zależności od trybu 
 *  title - tytuł formularza
 *  readonly - czy pola formularza będą tylko do odczytu
 *  saveActionApiCall - funkcja (z ordersApiCalls.js) wywołująca API back-endu
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
        saveActionApiCall: addOrderCall
    },
    edit: {
        title: "Edycja użytkownika",
        readonly: false,
        saveActionApiCall: editOrderCall
    }
};