//licznik id
let nextId = 1;
//ekstensja klasy (wszystkie obiekty)
const userExtent = [];

class User {
    //parametr id jest na końcu, bo jest opcjonalny
    constructor(firstName, lastName, adres, punkty,login, haslo,mail,telefon,id) {
        this.id = id;
        this.firstName = firstName;
		this.lastName = lastName;
        this.adres = adres;
		 this.punkty = punkty;
        this.login = login;
		 this.haslo = haslo;
        this.mail = mail;
		 this.telefon = telefon;
      
    }

    //dodawanie obiektu do bazy
    static add(user) {
        user.id = nextId++;
        userExtent.push(user);
        return user;
    }
    //pobranie listy obiektów
    //metoda nie powinna pobierać nadmiarowych danych
    //(np. przez złączenia JOIN w relacyjnej bazie danych)
    //które nie będą wyświetlane na liście
    static list() {
        return userExtent;
    }
    //edycja obiektu
    static edit(user) {
        //FIXME
    }
    //usuwanie obiektu po id
    static delete(id) {
        //FIXME
    } 
    //pobieranie obiektu do widoku szczegółów
    //może być potrzebne pobranie dodatkowych danych
    //np. przez złączenia JOIN w relacyjnej bazie danych
    static details(id) {
        //FIXME
    }
    //metoda resetuje stan bazy i dodaje rekordy testowe
    //przydatna do testów
    static initData() {
        //usuwamy zawartość tablicy
        userExtent.splice(0, userExtent.length);
        //resetujemy licznik id
        nextId = 1;
        User.add(new User('Jan', 'Kowalski','ul.Marszałkowska 32/208, Warszawa','0','jkowalski','zaqwsx','jkowalski@gmail.com','100200300'));
       User.add(new User('Adam', 'Nowak','ul.Marszałkowska 33/208, Warszawa','0','anowak','zaqwsx123','anowak@gmail.com','100200333'));
	   User.add(new User('Michał', 'Wiśniewski','ul.Marszałkowska 33/218, Warszawa','1','miwisniewski','zaqwsx321','mwisniewski@gmail.com','111200300'));
    }
}

User.initData();

module.exports = User;