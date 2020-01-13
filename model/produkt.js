//licznik id
let nextId = 1;
//ekstensja klasy (wszystkie obiekty)
const produktExtent = [];

class Produkt {
    //parametr id jest na końcu, bo jest opcjonalny
    constructor(id,nazwa, zdjecie, kategoria, podkategoria,cena, kraj,opis) {
        this.id = id;
        this.nazwa = nazwa;
        this.zdjecie = zdjecie;
		 this.kategoria = kategoria;
        this.podkategoria = podkategoria;
		 this.cena = cena;
        this.kraj = kraj;
		 this.opis = opis;
      
    }

    //dodawanie obiektu do bazy
    static add(produkt) {
       // produkt.id = nextId++;
        produktExtent.push(produkt);
        return produkt;
    }
    //pobranie listy obiektów
    //metoda nie powinna pobierać nadmiarowych danych
    //(np. przez złączenia JOIN w relacyjnej bazie danych)
    //które nie będą wyświetlane na liście
    static list() {
        return produktExtent;
    }
    //edycja obiektu
    static edit(produkt) {
        //FIXME
    }
    //usuwanie obiektu po id 
    static delete(d) {
		for(let i=0;i<produktExtent.length;i++) 
		{
			if(produktExtent[i].id===d)
			{
			produktExtent.splice(produktExtent[i],1);
			}
	
    }  
	}
    //pobieranie obiektu do widoku szczegółów
    //może być potrzebne pobranie dodatkowych danych
    //np. przez złączenia JOIN w relacyjnej bazie danych
    static details(id) {
        
		for(i=0; i<produktExtent.length;i++)
			if(produktExtent[i]===parseInt(id))
				return produktExtent[i];
    }
    //metoda resetuje stan bazy i dodaje rekordy testowe
    //przydatna do testów
    static initData() {
        //usuwamy zawartość tablicy
        produktExtent.splice(0, produktExtent.length);
        //resetujemy licznik id
        nextId = 1;
        Produkt.add(new Produkt('111', 'Monstera dziurawa','<img src="images/Monstera1.jpg" height="100" width="100">','Roślina','Rośliny doniczkowe','80','Brazylia','Monstera dziurawa jest rośliną tolerancyjną na różne warunki. Dobrze rośnie nawet w zacienionych miejscach, dlatego często jest wybierana do biur i mieszkań.'));
       Produkt.add(new Produkt('222', 'Pelargonia','<img src="images/Pelargonia1.jpg" height="100" width="100">','Roślina','Rośliny doniczkowe','70','Polska','Pelargonia jest rośliną tolerancyjną na różne warunki. Dobrze rośnie nawet w zacienionych miejscach, dlatego często jest wybierana do biur i mieszkań.'));
	   Produkt.add(new Produkt('333', 'Kolendra','<img src="images/Kolendra1.jpg" height="100" width="100">','Roślina','Rośliny doniczkowe','120','Polska','Kolendra jest rośliną tolerancyjną na różne warunki. Dobrze rośnie nawet w zacienionych miejscach, dlatego często jest wybierana do biur i mieszkań.'));
    }
}

Produkt.initData();

module.exports = Produkt;