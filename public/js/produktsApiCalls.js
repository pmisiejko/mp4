const produktApiBaseUrl = 'http://localhost:3001/api/produkts';

//po wykonaniu żądania będzie wywołana funkcja zwrotna (callback) z pobranymi danymi jako parametr
function getProduktListCall(callback) {
    const req = new XMLHttpRequest();
    req.open('GET', produktApiBaseUrl, true);
    req.onreadystatechange = function (aEvt) {
        if (req.readyState == 4) {
            if (req.status == 200) {
                const respText = req.responseText;
                // dump(respText);
                const produktData = JSON.parse(respText);
                callback(produktData);
                // console.log(`produkts json: ${JSON.stringify(produktData)}`);
            } else {
                dump("Błąd podczas ładowania strony\n");
            }
        }
    };
    req.send(null);
}

function getProduktDetailsCall(produktId, formMode, callback) {
    const req = new XMLHttpRequest();
    req.open('GET', `${produktApiBaseUrl}/${produktId}`, true);
    req.onreadystatechange = function (aEvt) {
        if (req.readyState == 4) {
            if (req.status == 200) {
                const respText = req.responseText;
                // dump(respText);
                const produktDetailsData = JSON.parse(respText);
                callback(formMode, produktDetailsData);
                // console.log(`produkts json: ${JSON.stringify(produktData)}`);
            } else {
                dump("Błąd podczas ładowania strony\n");
            }
        }
    };
    req.send(null);
}

function addProduktCall(produktData, callback) {
    const req = new XMLHttpRequest();
    req.open('POST', produktApiBaseUrl, true);
    req.onreadystatechange = function (aEvt) {
        if (req.readyState == 4) {
            if (req.status == 201) {
                callback();
                // console.log(`produkts json: ${JSON.stringify(produktData)}`);
            } else {
                dump("Błąd podczas ładowania strony\n");
            }
        }
    };
    const produktDataString = JSON.stringify(produktData);
    console.log(`addProdukt() produktData: ${produktDataString}`);
    req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    req.send(produktDataString);
}

function editProduktCall(produktData, callback) {
    const req = new XMLHttpRequest();
    req.open('PUT', `${produktApiBaseUrl}/${produktData.id}`, true);
    req.onreadystatechange = function (aEvt) {
        if (req.readyState == 4) {
            if (req.status == 204) {
                callback();
            } else {
                dump("Błąd podczas ładowania strony\n");
            }
        }
    };
    const produktDataString = JSON.stringify(produktData);
    console.log(`addProdukt() produktData: ${produktDataString}`);
    req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    req.send(produktDataString);
}

function deleteProduktCall(produktId, callback) {
    const req = new XMLHttpRequest();
    req.open('DELETE', `${produktApiBaseUrl}/${produktId}`, true);
    req.onreadystatechange = function (aEvt) {
        if (req.readyState == 4) {
            if (req.status == 204) {
                callback();
            } else {
                dump("Błąd podczas ładowania strony\n");
            }
        }
    };
    req.send(null);
}

function dump(text) {
    console.log(text);
}