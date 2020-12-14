let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function makePromiseCall(methodType, url, async = true, data = null) {
    return new Promise(function(resolve, reject) {
        let xhr  = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            console.log("State changed Called Ready state:"+ xhr.readyState + " status: " + xhr.status);
            if (xhr.status.toString().match('^[2][0-9]{2}$')) {
                resolve(xhr.responseText);
            } else if (xhr.status.toString().match('^[4,5][0-9]{2}$')){
                reject({
                    status: xhr.status,
                    statusText: xhr.statusText
                });
                console.log("XHR Failed");    
            }
        }
        xhr.open(methodType,url,async);
        if (data) {
            console.log(JSON.stringify(data));
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(JSON.stringify(data));
        } else
            xhr.send();
        console.log(methodType + " request sent to the server");    
    });
}

const getURL = "http://127.0.0.1:3000/employee_payroll/1";
makePromiseCall("GET",getURL,true)
    .then(responseText => {
        console.log("Get user data: "+ responseText);
    })
    .catch(error => console.log("Get error status:"+ JSON.stringify(error)));

const deleteURL = "http://127.0.0.1:3000/employee_payroll/4";
makePromiseCall("DELETE",deleteURL,false)
    .then(responseText => {
        console.log("DELETE user data: "+ responseText);
    })
    .catch(error => console.log("DELETE error status:"+ JSON.stringify(error)));

const postURL = "http://127.0.0.1:3000/employee_payroll/4";
const empData = {"name": "Harry", "salary": "5000"};
makePromiseCall("POST",postURL,false, empData)
        .then(responseText => {
            console.log("POST user data: "+ responseText);
        })
        .catch(error => console.log("POST error status:"+ JSON.stringify(error)));    
