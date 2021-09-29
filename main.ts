import { Course } from './course.js'
import { Student } from './student.js';
import { dataCourses } from './data.js'
import { student } from './data.js';

var coursesTbody: HTMLElement = document.getElementById('courses')!;
var inputSearchBox: HTMLInputElement = (<HTMLInputElement> document.getElementById('search-box'));
var inputCreditSearchBox: HTMLInputElement = (<HTMLInputElement> document.getElementById('credit-min'));
var btnfilterByName: HTMLButtonElement = (<HTMLButtonElement> document.getElementById('button-filter'));
var pNumCredits : HTMLElement = document.getElementById('total-creditos')!;
var title : HTMLElement = document.getElementById('maintitle')!;
var personalTbody: HTMLElement = document.getElementById('personal-info')!;

function renderCoursesInTable(courses: Course[]): void{
    courses.forEach(
        c => {
            let trElement = document.createElement('tr');
            trElement.innerHTML = `<td>${c.name}</td>
                                   <td>${c.professor}</td>
                                   <td>${c.credits}</td>`;
            coursesTbody.appendChild(trElement);
        });
}

function clearCoursesInTable() {
    
    coursesTbody.innerHTML = '';

}

function renderPersonalInfoInTable(currentS: Student): void{
    let subl = document.createElement('tr');
        Object.getOwnPropertyNames(currentS).forEach(
            key => {
                if (key=="name"){return}
                let value = <[string,any]> Object.getOwnPropertyDescriptor(currentS,key)?.value;
                let trElement = document.createElement('tr');
                trElement.innerHTML = `<td>${value[0]}</td>
                                       <td>${value[1]}</td>`;
                personalTbody.appendChild(trElement);
            });
    personalTbody.appendChild(subl);
}

let getTotalCredits = (courses: Course[]) => (courses.map(c => c.credits)).reduce((sum:number,b:number) => sum+b, 0)

function applyFilterByName(lst:Course[]) : Course[]{
    let text = inputSearchBox.value;
    text = (text == null) ? '' : text;
    clearCoursesInTable();
    let coursesFiltered: Course[] = searchCourseByName(text, lst);
    renderCoursesInTable(coursesFiltered);
    return coursesFiltered;
}

function applyFilterByCredits(lst:Course[]) : Course[]{
    let min = inputCreditSearchBox.value;
    min = (min == null) ? '' : min;
    clearCoursesInTable();
    let coursesFiltered: Course[] = filterMinCredits(+min, lst);
    renderCoursesInTable(coursesFiltered);
    return coursesFiltered;
}

function applyFilter() {
    let filtered : Course[] = dataCourses;
    filtered = applyFilterByName(filtered);
    filtered = applyFilterByCredits(filtered);
}

let searchCourseByName = (nameKey:string, courses:Course[]) => nameKey === '' ? courses : courses.filter(c => c.name.toLowerCase().indexOf(nameKey.toLowerCase()) != -1)

let filterMinCredits = (minCred:number, courses:Course[]) => courses.filter(c => c.credits>= minCred)

/* Execution */

btnfilterByName.onclick = () => applyFilter();
renderCoursesInTable(dataCourses);
pNumCredits.innerHTML += getTotalCredits(dataCourses).toString();
renderPersonalInfoInTable(student);
title.innerHTML = student.name;