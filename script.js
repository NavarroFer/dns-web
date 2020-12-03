
var switchDesactDNSSECStatus = false;
var switchdetallesDNSSECStatus = false;
//script dns
$('#inputDominio').keyup(function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      document.getElementById("btnConsultar").click();
    }
  });

  $('#inputEDNS').keyup(function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      document.getElementById("btnConsultar").click();
    }
  });

  $('#btnConsultar').click("keyup", function() {
      consultarDNS();
  });

$("#desactivarDNSSEC").on('change', function() {
    if ($(this).is(':checked')) {
        switchDesactDNSSECStatus = $(this).is(':checked');
    }
    else {
        switchDesactDNSSECStatus = $(this).is(':checked');
    }
});

$("#detalleDNSSEC").on('change', function() {
    if ($(this).is(':checked')) {
        switchdetallesDNSSECStatus = $(this).is(':checked');
    }
    else {
        switchdetallesDNSSECStatus = $(this).is(':checked');
    }
});

  function consultarDNS(){
      let dominio = $("#inputDominio").val();
      if(dominio == "")
        return alert("Ingrese un dominio");
      getDominioAPI(dominio);
  }

function getDominioAPI(dominio){

    let tipoRR = $("#ddlTipoDNS").val();
    if(tipoRR == "0"){
        return alert("Elija un campo");
    }
    let inputEDNS = $("#inputEDNS").val();
    let desactivarValidacionDNSSEC = switchDesactDNSSECStatus;
    let detallesDNSSEC = switchdetallesDNSSECStatus;

    let url = `https://dns.google/resolve?name=${dominio}&type=${tipoRR}`;

    if(inputEDNS != ""){
        url+= `&edns_client_subnet=${inputEDNS}`;
    }
    if(desactivarValidacionDNSSEC){
        url+= `&cd=true`;
    }
    if(detallesDNSSEC){
        url+= `&do=true`;
    }
    

    var XHR = new XMLHttpRequest();
    XHR.addEventListener("load",mostrarRespuesta);
    XHR.open("GET", url);
    XHR.send();
    //TODO XHR GET
}


function mostrarRespuesta(){
    console.log(this.responseText);
    let respuesta = this.responseText;
    JSON.parse(respuesta);
    $("#respuestaJSON").textContent = JSON.stringify(respuesta, undefined, 2);

}