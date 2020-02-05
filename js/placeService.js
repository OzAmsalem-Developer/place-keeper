'use strict';
const LOCS_KEY = 'places';
var gPlaces = getPlaces();

function savePlace(gCurrCoords, placeName) {
    gPlaces.push({
        id: makeId(),
        lat: gCurrCoords.lat,
        lng: gCurrCoords.lng,
        name: placeName
    });
    saveToStorage(LOCS_KEY, gPlaces);
}

function getPlaces() {
    let places = getFromStorage(LOCS_KEY);
    if (!places) places = [{
        id: makeId(),
        lat: 29.5587251,
        lng: 34.9524531,
        name: 'Russian Hospital'
    },{
        id: makeId(),
        lat: 29.5537251,
        lng: 34.9524531,
        name: 'Some place'
    }];
    return places;
}

function removePlace(placeId) {
    let placeIdx = gPlaces.findIndex(place => place.id === placeId);
    gPlaces.splice(placeIdx,1);
    saveToStorage(LOCS_KEY, gPlaces);
}