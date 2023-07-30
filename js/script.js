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
        } else {
          // Manejar el caso de error
          console.log('Error al trazar la ruta: ' + status);
        }
      }
    );
  }
  
  document.addEventListener('DOMContentLoaded', initMap);

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
