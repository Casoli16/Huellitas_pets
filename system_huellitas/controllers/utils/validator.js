class validator {
    // Para usar y está clase solo debemos crear una instancia de la misma y llamar a sus métodos según necesitemos
    // Tambien debemos crear un array que es el que contendrá los errores que se vayan generando para que podamos mostrarlo al usuario
    // En caso de que no haya errores, el array estará vacío y crearemos un if else que si this.error esta vacio es porque no se han tenido errores.
    // En caso de que si haya errores, recorremos el array con un forEach y mostramos los errores al usuario. 
    constructor() {
        this.errors = [];
    }
    isEmail(email) {
        if (!email.includes('@') || !email.includes('.')) {
            this.errors.push('Email is not valid');
        }
    }
    isPassword(password) {
        if (password.length < 8 || password.length > 70) {
            this.errors.push('Password must be at least 8 characters');
        }
    }
    isRequired(value) {
        if (value === '') {
            this.errors.push('This field is required');
        }
    }
    isNumber(value) {
        if (isNaN(value)) {
            this.errors.push('This field must be a number');
        }
    }
    isMoney(value) {
        if (isNaN(value)) {
            this.errors.push('This field must be a number');
        }
    }
    isLength(value, min, max) {
        if (value.length < min || value.length > max) {
            this.errors.push(`This field must be between ${min} and ${max} characters`);
        }
    }
    // Crea un metodo que valide si un valor es un numero de telefono, tomando en cuenta que solo puede contener numeros y tener una longitud de 10 digitos, un signo de mas y espacios
    isPhoneNumber(value) {
        if (value.length != 8 || isNaN(value)) {
            this.errors.push('This field must be a phone number');
        }
    }
    isDate(value, min, max) {
        // Convierte las cadenas de fecha en objetos de fecha
        const dateValue = new Date(value);
        const minDate = new Date(min);
        const maxDate = new Date(max);
        
        // Comprueba si el valor está dentro del rango de fechas
        if (!(dateValue >= minDate && dateValue <= maxDate)) {
            this.errors.push('This field must be a date within the specified range');
        }
    }
    toLowerCase(value) {
        return value.toLowerCase();
    }    
    getErrors() {
        return this.errors;
    }

}
