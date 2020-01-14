//licznik id
let nextId = 1;
//ekstensja klasy (wszystkie obiekty)
const orderExtent = [];
const db = require('../db.js');

class Order {
    //parametr id jest na końcu, bo jest opcjonalny
/*     constructor(idZamowienia, IdKlienta, data, daneKlienta,adres, idProduktow,ilosc) {
        this.idZamowienia = idZamowienia;
        this.IdKlienta = IdKlienta;
		this.data=data;
        this.daneKlienta = daneKlienta;
		this.adres = adres;
        this.idProduktow = idProduktow;
		this.ilosc = ilosc;      
    } */

    // Konstruktor pasujacy do bazy danych
    constructor(ID_zamowienia, data_zamowienia, data_dostawy, adres_dostawy, Klient_ID_klienta, status, rabat, imie_klienta, nazwisko_klienta) {
        this.ID_zamowienia = ID_zamowienia;
        this.data_zamowienia = data_zamowienia;
        this.data_dostawy = data_dostawy;
        this.adres_dostawy = adres_dostawy;
        this.Klient_ID_klienta = Klient_ID_klienta;
        this.status = status;
        this.rabat = rabat; 
        this.imie_klienta = imie_klienta;
        this.nazwisko_klienta = nazwisko_klienta
    }


    //dodawanie obiektu do bazy
    static add(order) {
        //order.idZamowienia = nextId++;
        orderExtent.push(order);
        return order;
    }
    //pobranie listy obiektów
    //metoda nie powinna pobierać nadmiarowych danych
    //(np. przez złączenia JOIN w relacyjnej bazie danych)
    //które nie będą wyświetlane na liście
    static list() {
        return orderExtent;
    }
    //edycja obiektu
    static edit(order) {
        //FIXME
    }
    //usuwanie obiektu po id
    static delete(d) {
        for(let i=0;i<orderExtent.length;i++)
		{	
			if(orderExtent[i].ID_zamowienia===d)
			{
			orderExtent.splice(orderExtent[i],1);
			}	
		}
    } 
    //pobieranie obiektu do widoku szczegółów
    //może być potrzebne pobranie dodatkowych danych
    //np. przez złączenia JOIN w relacyjnej bazie danych
    static details(id) {
        for(i=0; i<orderExtent.length;i++)
			if(orderExtent[i].idZamowienia===parseInt(id))
				return orderExtent[i];
    }
    //metoda resetuje stan bazy i dodaje rekordy testowe
    //przydatna do testów
    static initData() {
        //usuwamy zawartość tablicy
        orderExtent.splice(0, orderExtent.length);
        //resetujemy licznik id
        nextId = 1;

        
        db.query('SELECT * FROM Zamowienie', (err, rows, fields)=>{
            if (!err){            
            
            rows.forEach(element => {
                Order.add(new Order(element.ID_zamowienia, element.data_zamowienia, element.data_dostawy, element.adres_dostawy, 
                    element.Klient_ID_klienta, element.status, element.rabat, element.imie_klienta, element.nazwisko_klienta));  
             });
            }
            else
              console.log(err);
          });
    }
}

Order.initData();

module.exports = Order;