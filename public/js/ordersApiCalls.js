const orderApiBaseUrl = 'http://localhost:3001/api/orders';

//po wykonaniu żądania będzie wywołana funkcja zwrotna (callback) z pobranymi danymi jako parametr
function getOrderListCall(callback) {
    const req = new XMLHttpRequest();
    req.open('GET', orderApiBaseUrl, true);
    req.onreadystatechange = function (aEvt) {
        if (req.readyState == 4) {
            if (req.status == 200) {
                const respText = req.responseText;
                // dump(respText);
                const orderData = JSON.parse(respText);
                callback(orderData);
                // console.log(`orders json: ${JSON.stringify(orderData)}`);
            } else {
                dump("Błąd podczas ładowania strony\n");
            }
        }
    };
    req.send(null);
}

function getOrderDetailsCall(orderId, formMode, callback) {
    const req = new XMLHttpRequest();
    req.open('GET', `${orderApiBaseUrl}/${orderId}`, true);
    req.onreadystatechange = function (aEvt) {
        if (req.readyState == 4) {
            if (req.status == 200) {
                const respText = req.responseText;
                // dump(respText);
                const orderDetailsData = JSON.parse(respText);
                callback(formMode, orderDetailsData);
                // console.log(`orders json: ${JSON.stringify(orderData)}`);
            } else {
                dump("Błąd podczas ładowania strony\n");
            }
        }
    };
    req.send(null);
}

function addOrderCall(orderData, callback) {
    const req = new XMLHttpRequest();
    req.open('POST', orderApiBaseUrl, true);
    req.onreadystatechange = function (aEvt) {
        if (req.readyState == 4) {
            if (req.status == 201) {
                callback();
                // console.log(`orders json: ${JSON.stringify(orderData)}`);
            } else {
                dump("Błąd podczas ładowania strony\n");
            }
        }
    };
    const orderDataString = JSON.stringify(orderData);
    console.log(`addOrder() orderData: ${orderDataString}`);
    req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    req.send(orderDataString);
}

function editOrderCall(orderData, callback) {
    const req = new XMLHttpRequest();
    req.open('PUT', `${orderApiBaseUrl}/${orderData.id}`, true);
    req.onreadystatechange = function (aEvt) {
        if (req.readyState == 4) {
            if (req.status == 204) {
                callback();
            } else {
                dump("Błąd podczas ładowania strony\n");
            }
        }
    };
    const orderDataString = JSON.stringify(orderData);
    console.log(`addOrder() orderData: ${orderDataString}`);
    req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    req.send(orderDataString);
}

function deleteOrderCall(orderId, callback) {
    const req = new XMLHttpRequest();
    req.open('DELETE', `${orderApiBaseUrl}/${orderId}`, true);
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