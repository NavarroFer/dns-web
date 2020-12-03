
var switchDesactDNSSECStatus = false;
var switchdetallesDNSSECStatus = false;
//script dns
$('#inputDominio').keyup(function(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      document.getElementById("btnConsultar").click();
    }
  });

  $('#inputEDNS').keyup(function(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
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
    let inputEDNS = $("#inputEDNS").val();
    let desactivarValidacionDNSSEC = switchDesactDNSSECStatus;
    let detallesDNSSEC = switchdetallesDNSSECStatus;

    let url = `https://dns.google/resolve?name=${dominio}`;

    if(tipoRR != "0"){
        url+=`&type=${tipoRR}`;
    }

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
    $('#respuestaJSON').fadeOut();
}


function mostrarRespuesta(){
    $('#respuestaJSON').fadeIn();
    console.log(this.responseText);
    let respuesta = JSON.parse(this.responseText);
    $('#respuestaJSON').empty();
    $('<pre class="text-white">' + JSON.stringify(respuesta, null, 2) + '</pre>').appendTo('#respuestaJSON');

}