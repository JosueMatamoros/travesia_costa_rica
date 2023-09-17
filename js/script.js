function initMap() {
  const ubicacionInput = document.getElementById('ubicacion');
  const destinoInput = document.getElementById('destino');
  const mapContainer = document.getElementById('mapa');
  const directionsService = new google.maps.DirectionsService();
  const directionsRenderer = new google.maps.DirectionsRenderer();

  // Crear instancia de mapa centrado en Costa Rica
  const mapOptions = {
    center: { lat: 9.7489, lng: -83.7534 },
    zoom: 8
  };

  // Crear mapa en el contenedor especificado
  const map = new google.maps.Map(mapContainer, mapOptions);
  directionsRenderer.setMap(map);

  // Autocompletado para ubicación
  const autocompleteUbicacion = new google.maps.places.Autocomplete(ubicacionInput);
  autocompleteUbicacion.bindTo('bounds', map);

  // Autocompletado para destino
  const autocompleteDestino = new google.maps.places.Autocomplete(destinoInput);
  autocompleteDestino.bindTo('bounds', map);

  // Agregar evento click al botón de cotizar
  const cotizarButton = document.getElementById('cotizar-button');
  cotizarButton.addEventListener('click', function () {
    const ubicacion = ubicacionInput.value;
    const destino = destinoInput.value;

    if (ubicacion && destino) {
      // Realizar la solicitud de dirección
      calculateAndDisplayRoute(directionsService, directionsRenderer, ubicacion, destino);
    }
  });
}

function calculateAndDisplayRoute(directionsService, directionsRenderer, ubicacion, destino) {
  directionsService.route(
    {
      origin: ubicacion,
      destination: destino,
      travelMode: google.maps.TravelMode.DRIVING
    },
    function (response, status) {
      if (status === google.maps.DirectionsStatus.OK) {
        // Mostrar la ruta trazada en el mapa
        directionsRenderer.setDirections(response);

        // Mostrar información de duración y distancia
        const route = response.routes[0];
        if (route && route.legs && route.legs.length > 0) {
          const leg = route.legs[0];
          const durationText = leg.duration.text;
          const distanceTextInKm = leg.distance.text;
          const distanceValueInKm = leg.distance.value / 1000; // Convertir la distancia a kilómetros

          // Calcular la distancia en millas
          const distanceValueInMiles = distanceValueInKm * 0.621371;
          const distanceTextInMiles = distanceValueInMiles.toFixed(2) + ' miles'; // Redondear a 2 decimales

          const infoDiv = document.getElementById('info');
          const durationElement = document.getElementById('duration');
          const distanceElement = document.getElementById('distance');
    
          durationElement.textContent = 'Duration: ' + durationText;
          distanceElement.textContent = `Distance: ${distanceTextInKm} km / ${distanceTextInMiles}`;
          infoDiv.style.display = 'block';
          
          // Actualizar los elementos de los párrafos con la información
          const ubicacionCorreoElement = document.getElementById('UbicacionCorreo');
          const destinoCorreoElement = document.getElementById('DestinoCorreo');

          ubicacionCorreoElement.textContent = ubicacion;
          destinoCorreoElement.textContent = destino;

        }
      } else {
        // Manejar el caso de error
        console.log('Error al trazar la ruta: ' + status);
      }
    }
  );
}


document.addEventListener('DOMContentLoaded', initMap);

// Opcional: Si deseas utilizar la función toggleInfo para mostrar/ocultar el div "info" desde otro botón
function toggleInfo(targetId, buttonId) {
  var infoDiv = document.getElementById(targetId);
  var button = document.getElementById(buttonId);

  if (infoDiv.style.display === 'none') {
    infoDiv.style.display = 'block';
    button.innerHTML = 'See Less <span class="caret-up"></span>';
  } else {
    infoDiv.style.display = 'none';
    button.innerHTML = 'See More  <span class="caret-down"></span>';
  }
}

document.addEventListener('DOMContentLoaded', function () {
  flatpickr("#fecha-hora", {
    enableTime: true,
    dateFormat: "Y-m-d H:i",
    appendTo: document.body, // Asegura que el calendario se agregue al final del documento
  });
});


document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('miFormulario');
  const dropdownButton = document.getElementById('dropdownButton');
  const fechaHoraInput = document.getElementById('fecha-hora');
  const alertContainer = document.getElementById('alertContainer');

  form.addEventListener('submit', function (event) {
    const fechaHoraValue = fechaHoraInput.value.trim();
    const dropdownText = dropdownButton.textContent.trim();

    if (fechaHoraValue === 'Selecciona fecha y hora' || dropdownText === 'Choose your shuttle based on your needs') {
      event.preventDefault();
      alertContainer.style.display = 'block';
    } else {
      alertContainer.style.display = 'none'; // Oculta la alerta si los campos están completos
      
      const ubicacionCorreo = document.getElementById('UbicacionCorreo').textContent;
      const destinoCorreo = document.getElementById('DestinoCorreo').textContent;
      const opcionSeleccionada = dropdownText;

      const ubicacionInput = createHiddenInput('ubicacion', ubicacionCorreo);
      const destinoInput = createHiddenInput('destino', destinoCorreo);
      const fechaHoraInputHidden = createHiddenInput('fecha-hora', fechaHoraValue);
      const opcionInput = createHiddenInput('opcion-seleccionada', opcionSeleccionada);

      form.appendChild(ubicacionInput);
      form.appendChild(destinoInput);
      form.appendChild(fechaHoraInputHidden);
      form.appendChild(opcionInput);
    }
  });

  function createHiddenInput(name, value) {
    const input = document.createElement('input');
    input.setAttribute('type', 'hidden');
    input.setAttribute('name', name);
    input.setAttribute('value', value);
    return input;
  }
});

document.addEventListener('DOMContentLoaded', function () {
  const dropdownButton = document.getElementById('dropdownButton');
  const dropdownItems = document.querySelectorAll('.dropdown-item');

  dropdownItems.forEach(item => {
    item.addEventListener('click', function (event) {
      event.preventDefault();
      const optionText = this.getAttribute('data-option');
      const passengersText = this.getAttribute('data-passengers');
      dropdownButton.textContent = `${optionText} - ${passengersText}`;
    });
  });
});


document.addEventListener('DOMContentLoaded', function () {
  const bookNowAirportButton = document.getElementById('BookNowAirport');
  bookNowAirportButton.addEventListener('click', function () {
    const ubicacionInput = document.getElementById('ubicacion');
    const destinoInput = document.getElementById('destino');

    ubicacionInput.value = "Provincia de Alajuela, La Fortuna, Costa Rica";
    destinoInput.value = "Aeropuerto Juan Santamaría, Provincia de Alajuela, Río Segundo, Costa Rica";
  });

  //const bookNowFaunaButton = document.getElementById('BookNowFauna');
  //bookNowFaunaButton.addEventListener('click', function () {
  // const ubicacionInput = document.getElementById('ubicacion');
  //const destinoInput = document.getElementById('destino');

  //ubicacionInput.value = "Provincia de Alajuela, La Fortuna, Costa Rica";
  //destinoInput.value = "Manuel Antonio, Provincia de Puntarenas, Quepos, Costa Rica";


  const bookNowBeachesButton = document.getElementById('BookNowBeaches');
  bookNowBeachesButton.addEventListener('click', function () {
    const ubicacionInput = document.getElementById('ubicacion');
    const destinoInput = document.getElementById('destino');

    ubicacionInput.value = "Provincia de Alajuela, La Fortuna, Costa Rica";
    destinoInput.value = "Playa Conchal, Provincia de Guanacaste, Costa Rica";
  });

});


