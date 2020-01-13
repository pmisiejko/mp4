//licznik id
let nextId = 1;
//ekstensja klasy (wszystkie obiekty)
const orderExtent = [];

class Order {
    //parametr id jest na końcu, bo jest opcjonalny
    constructor(idZamowienia, IdKlienta, data, daneKlienta,adres, idProduktow,ilosc) {
        this.idZamowienia = idZamowienia;
        this.IdKlienta = IdKlienta;
		this.data=data;
        this.daneKlienta = daneKlienta;
		 this.adres = adres;
        this.idProduktow = idProduktow;
		this.ilosc = ilosc;
      
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
	
			if(orderExtent[i].idZamowienia===d)
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
		 Order.add(new Order('1', '1','01.09.2019','','','111','1'));
		 Order.add(new Order('2', '2','11.09.2019','','','222','1'));
			Order.add(new Order('3', '3','12.09.2019','','','333 111','2 1'));
    
	   
    }
}

Order.initData();

module.exports = Order;