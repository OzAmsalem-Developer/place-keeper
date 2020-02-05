'use strict';
const PREFS_KEY = 'userData';
var gUserData = getUserData();

function setUserData(userData) {
    gUserData = userData;
    saveToStorage(PREFS_KEY, gUserData);
}

function getUserData() {
    let userData = getFromStorage(PREFS_KEY);
    if (!userData) userData = {
        bgColor: 'black',
        txtColor: '#35d2c2'
    };
    return userData;
}

function setData(dataKey, val) {
    gUserData[dataKey] = val;
    saveToStorage(PREFS_KEY, gUserData);
}