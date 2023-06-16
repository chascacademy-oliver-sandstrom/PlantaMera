import React, { useEffect } from 'react';

const Map = () => {
  useEffect(() => {
    const fetchGoogleMapsKey = async () => {
      try {
        const API_URL = 'https://localhost:8000/api';
        const response = await fetch(`${API_URL}/google-maps-key`);
        const data = await response.json();
        const googleMapsKey = data.googleMapsKey;

        // Kolla om Google Maps JavaScript API redan är laddat
        if (!document.getElementById('google-maps-script')) {
          const script = document.createElement('script');
          script.id = 'google-maps-script';
          script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsKey}&libraries=places`;
          script.async = true;
          script.defer = true;
          script.onload = initMap;
          document.head.appendChild(script);
        } else {
          // Google Maps JavaScript API är redan laddat, initiera kartan direkt
          initMap();
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchGoogleMapsKey();
  }, []);

  const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  }

  const textSearchWithPagination = (map, request, callback) => {
    const placesService = new window.google.maps.places.PlacesService(map);
    placesService.textSearch(request, (results, status, pagination) => {
      if (status !== window.google.maps.places.PlacesServiceStatus.OK) {
        console.error(status);
        return;
      } else {
        callback(results, status);
        if (pagination.hasNextPage) {
          sleep(2000).then(() => pagination.nextPage());
        }
      }
    });
  };

  const initMap = () => {
    // Skapa en ny karta och placera den i kartcontainer-elementet
    const map = new window.google.maps.Map(document.getElementById('map'), {
      zoom: 12,
    });

    textSearchWithPagination(
      map,
      {
        query: 'Hemköp, hemköp, coop, Coop, ica, Ica, willys, Willys, matbutik, Pant, pant, pantstation, Pantstation',
      },
      (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          // Loopa igenom resultaten och lägg till markörer för varje butik
          for (let i = 0; i < results.length; i++) {
            createMarker(results[i], map);
          }
        }
      }
    );

    // Hämta användarens plats och centrerar kartan
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLatLng = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          // Centrera kartan på användarens plats
          map.setCenter(userLatLng);

          // Skapa en markör för användarens plats och placera den på kartan
          new window.google.maps.Marker({
            position: userLatLng,
            map: map,
            title: 'Din plats',
          });
        },
        (error) => {
          console.error(error);
        }
      );
    }
  };

  const createMarker = (place, map) => {
    new window.google.maps.Marker({
      position: place.geometry.location,
      map: map,
    });
  };

  return <div id="map" style={{ height: '77vh', width: '100%', marginTop: '2rem' }} />;
};

export default Map;
