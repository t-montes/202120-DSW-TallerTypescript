var Student = /** @class */ (function () {
    function Student(name, code, id, age, address, phone) {
        this.name = name;
        this.code = ["Código", code];
        this.id = [(age >= 18) ? "Cédula" : "Tarjeta Identidad", id];
        this.age = ["Edad", age];
        this.address = ["Dirección", address];
        this.phone = ["Teléfono", phone];
    }
    return Student;
}());
export { Student };
