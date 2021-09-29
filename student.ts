export class Student {
    name:string;
    code:[string,string];
    id:[string,string];
    age:[string,number];
    address:[string,string];
    phone:[string,string];

    constructor(name:string, code:string, id:string, age:number, address:string, phone:string) {
        this.name = name;
        this.code = ["Código",code];
        this.id = [(age>=18) ? "Cédula" : "Tarjeta Identidad" ,id];
        this.age = ["Edad",age];
        this.address = ["Dirección",address];
        this.phone = ["Teléfono",phone];
    }
}