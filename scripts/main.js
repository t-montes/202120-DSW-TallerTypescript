import { dataCourses } from './data.js';
import { student } from './data.js';
var coursesTbody = document.getElementById('courses');
var inputSearchBox = document.getElementById('search-box');
var inputCreditSearchBox = document.getElementById('credit-min');
var btnfilterByName = document.getElementById('button-filter');
var pNumCredits = document.getElementById('total-creditos');
var title = document.getElementById('maintitle');
var personalTbody = document.getElementById('personal-info');
function renderCoursesInTable(courses) {
    courses.forEach(function (c) {
        var trElement = document.createElement('tr');
        trElement.innerHTML = "<td>" + c.name + "</td>\n                                   <td>" + c.professor + "</td>\n                                   <td>" + c.credits + "</td>";
        coursesTbody.appendChild(trElement);
    });
}
function clearCoursesInTable() {
    coursesTbody.innerHTML = '';
}
function renderPersonalInfoInTable(currentS) {
    var subl = document.createElement('tr');
    Object.getOwnPropertyNames(currentS).forEach(function (key) {
        var _a;
        if (key == "name") {
            return;
        }
        var value = (_a = Object.getOwnPropertyDescriptor(currentS, key)) === null || _a === void 0 ? void 0 : _a.value;
        var trElement = document.createElement('tr');
        trElement.innerHTML = "<td>" + value[0] + "</td>\n                                       <td>" + value[1] + "</td>";
        personalTbody.appendChild(trElement);
    });
    personalTbody.appendChild(subl);
}
var getTotalCredits = function (courses) { return (courses.map(function (c) { return c.credits; })).reduce(function (sum, b) { return sum + b; }, 0); };
function applyFilterByName(lst) {
    var text = inputSearchBox.value;
    text = (text == null) ? '' : text;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByName(text, lst);
    renderCoursesInTable(coursesFiltered);
    return coursesFiltered;
}
function applyFilterByCredits(lst) {
    var min = inputCreditSearchBox.value;
    min = (min == null) ? '' : min;
    clearCoursesInTable();
    var coursesFiltered = filterMinCredits(+min, lst);
    renderCoursesInTable(coursesFiltered);
    return coursesFiltered;
}
function applyFilter() {
    var filtered = dataCourses;
    filtered = applyFilterByName(filtered);
    filtered = applyFilterByCredits(filtered);
}
var searchCourseByName = function (nameKey, courses) { return nameKey === '' ? courses : courses.filter(function (c) { return c.name.toLowerCase().indexOf(nameKey.toLowerCase()) != -1; }); };
var filterMinCredits = function (minCred, courses) { return courses.filter(function (c) { return c.credits >= minCred; }); };
/* Execution */
btnfilterByName.onclick = function () { return applyFilter(); };
renderCoursesInTable(dataCourses);
pNumCredits.innerHTML += getTotalCredits(dataCourses).toString();
renderPersonalInfoInTable(student);
title.innerHTML = student.name;
