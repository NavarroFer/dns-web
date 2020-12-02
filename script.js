
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
    //TODO XHR GET
}
