let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function makeAjaxCall(methodType, url, callback, async = true, data = null) {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if(xhr.readyState===4){
            //Matching all 200 series Responses
            if(xhr.status===200||xhr.status===201){
                callback(xhr.responseText);
            }else if(xhr.status>=400){
                console.log("Handle 400 Client Error or 500 Server Error");
            }
        }    
    }
    xhr.open(methodType,url,async);
    if(data){
        console.log(JSON.stringify(data));
        xhr.setRequestHeader("Content-Type","application/json");
        xhr.send(JSON.stringify(data));
    } else xhr.send();
    console.log(methodType+" request sent to the server");
}

const getURL = "http://localhost:3000/employee_payroll/1";
function getUserDetails(data) {
    console.log("Get user data:" + data);
}
makeAjaxCall("GET", getURL, getUserDetails, true);

const deleteURL="http://localhost:3000/employee_payroll/6";
function userDeleted(data){
    console.log("User Deleted "+data);
}
makeAjaxCall("DELETE",deleteURL,userDeleted,false);

const postURL="http://localhost:3000/employee_payroll/";
const emplData={"name":"Madhu","salary":"5000000"};
function userAdded(data){
    console.log("User Added: "+data);
}
makeAjaxCall("POST",postURL,userAdded,true,emplData);