'use strict';
$(document).ready(onPrefInit);

var gForecasts = ['Today should go well for you Sagittarius. Expect to feel a renewed energy and perspective on things especially those that are work related.', 'Today may well find you in the mood to head out on a venture or visit someone, Sagittarius. When was the last time you took a day for something like this? Chances are its been too long.', 'Home and family life perk up this week as convivial Mercury moves into this sector and encourages conversations about key issues.']

function onPrefInit() {
    renderPrefs();
}

function onSetPrefs(ev) {
    ev.preventDefault();
    let email = $('#email').val();
    let bgColor = $('#bg-color').val();
    let txtColor = $('#txt-color').val();
    let bDate = $('#b-date').val();
    let bTime = $('#b-time').val();
    let age = $('#age').val();

    let userData = { email, bgColor, txtColor, bDate, bTime, age };
    setUserData(userData);

    $('body').css("background-color", bgColor);
    $('body').css("color", txtColor);
    $('.forecast p').text(gForecasts[getRandomInt(0, 2)]);
    resetForm();
}

function renderPrefs() {
    let userData = getUserData();
    $('body').css("background-color", userData.bgColor);
    $('body').css("color", userData.txtColor);
}

function onSetBgColor(color) {
    $('body').css("background-color", color);
    setData('bgColor', color)
}

function onSetTxtColor(color) {
    $('body').css("color", color);
    setData('txtColor', color)
}

function showAge(newVal) {
    $('#sAge').html(newVal);
}

function resetForm() {
    $('input:not(input[type="color"])').val('');
}