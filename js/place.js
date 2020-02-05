'use strict';
var gCurrCoords;

function onMapInit() {
    initMap();
    renderPlaces();
}

function initMap(lat = 29.557449, lng = 34.94821) {
    let map = new google.maps.Map(
        document.getElementById('map'),
        {
            center: { lat, lng },
            zoom: 10
        }
    );

    let marker = new google.maps.Marker({
        position: { lat, lng },
        map: map
    });

    map.addListener('click', e => {
        let lat = e.latLng.lat();
        let lng = e.latLng.lng();

        $('.place-name-container').attr('hidden', false);
        gCurrCoords = {lat, lng};
        marker.setPosition(e.latLng);
    });
}

function renderPlaces() {
    let places = getPlaces();
    let strHtmls = places.map(place => {
        let closeBtn = `<button type="button" onclick="onRemovePlace('${place.id}')" class="close" aria-label="Close">
        <span aria-hidden="true">&times;</span>
        </button>`;
        return `<li class="list-group-item bg-dark">${place.name + closeBtn}</li>`
    }).join('');

    $('.places-list').html(strHtmls);
}

function getPosition() {
    if (!navigator.geolocation) {
        alert("HTML5 Geolocation is not supported in your browser.");
        return;
    }
    // One shot position getting
    navigator.geolocation.getCurrentPosition(showLocation, handleLocationError);
    // continus watch
    // navigator.geolocation.watchPosition(showLocation, handleLocationError);
}

function showLocation(position) {
    console.log(position);
    initMap(position.coords.latitude, position.coords.longitude);
}

function handleLocationError(error) {
    var locationError = document.getElementById("locationError");

    switch (error.code) {
        case 0:
            locationError.innerHTML = "There was an error while retrieving your location: " + error.message;
            break;
        case 1:
            locationError.innerHTML = "The user didn't allow this page to retrieve a location.";
            break;
        case 2:
            locationError.innerHTML = "The browser was unable to determine your location: " + error.message;
            break;
        case 3:
            locationError.innerHTML = "The browser timed out before retrieving the location.";
            break;
    }
}

function onSavePlace() {
    // Switch to destruction
    $('.place-name-container').attr('hidden', true);
    let placeName = $('.place-name').val();
    if (!gCurrCoords) return;
    savePlace(gCurrCoords, placeName);
    renderPlaces();
    $('.place-name').val('');
}

function onRemovePlace(placeId) {
    removePlace(placeId);
    renderPlaces();
}