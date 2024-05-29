export default function validation(inputs){

    let errors= {};

   
    //Se chequea que existan los inputs
    (!inputs.firstName) ? errors.firstName = 'El nombre es obligatorio' : errors.firstName = '';
    (!inputs.lastName) ? errors.lastName = 'El apellido es obligatorio' : errors.lastName = '';
    (!inputs.birthDate) ? errors.birthDate = 'La fecha de nacimiento es obligatoria' : errors.birthDate = '';
    (!inputs.phoneNumber) ? errors.phoneNumber = 'El número de celular es obligatorio' : errors.phoneNumber = '';
    (!inputs.email) ? errors.email = 'El email es obligatorio' : errors.email = '';
    (!inputs.password) ? errors.password = 'La contraseña es obligatoria' : errors.password = '';
    console.log(inputs)

    //funcion para chequear que word contenga solo letras minusculas o mayusculas (o espacios)
    const isWord = (word) => {
      let isWord = true;
      word.forEach((letter) => {
        if (!(letter.charCodeAt() === 32 || (letter.charCodeAt()>=65 && letter.charCodeAt()<=90) || (letter.charCodeAt()>=97 && letter.charCodeAt()<=122) || (letter.charCodeAt()>=128 && letter.charCodeAt()<=165))){
          isWord = false;
        }
      })
      return isWord
    }

    //Validaciones del nombre
    if (inputs.firstName) {
      if (!isWord(inputs.firstName.split(''))){
        errors.firstName='El nombre debe ser escrito solo en letras mayúsculas y minúsculas.'
      } else {
        errors.firstName += '';
      }
      if (inputs.firstName.length >= 30) {
        errors.firstName='El nombre debe ser menor a 30 caracteres.'
      }
    }

    //Validaciones del apellido
    if (inputs.lastName) {
        if (!isWord(inputs.lastName.split(''))){
          errors.lastName='El apellido debe ser escrito solo en letras mayúsculas y minúsculas.'
        } else {
          errors.lastName += '';
        }
        if (inputs.lastName.length >= 30) {
          errors.lastName='El apellido debe ser menor a 30 caracteres.'
        }
      }

    //Validaciones de la fecha de nacimiento
    if (inputs.birthDate){
        let mesDiaAño = inputs.birthDate.split('-');
        const fechaActual = new Date().toISOString().slice(0, 10).split('-');
        

        if (mesDiaAño[0] > fechaActual[0] - 18) {
            errors.birthDate = 'Debes tener al menos 18 años de edad para registrarte.'
        }
        else if (mesDiaAño[0]===fechaActual[0] && mesDiaAño[0] > fechaActual[0]) {
            errors.birthDate = 'Debes tener al menos 18 años de edad para registrarte.'
        }
        else if (mesDiaAño[0]===fechaActual[0] && mesDiaAño[1] === fechaActual[1] && mesDiaAño[2] > fechaActual[2]) {
            errors.birthDate = 'Debes tener al menos 18 años de edad para registrarte.'
        }
        else {
            errors.birthDate = ''
        }
    }

    //Validaciones de numero de telefono
    if (inputs.phoneNumber) {
        if (inputs.phoneNumber.length < 6 || inputs.phoneNumber.length > 15){
            errors.phoneNumber = 'El número de telefono es inválido.'
        }
        for (let i = 0; i<inputs.phoneNumber.length; i++){
            if (inputs.phoneNumber[i].charCodeAt(0) < 48 || inputs.phoneNumber[i].charCodeAt(0) > 57){
                errors.phoneNumber = 'El número de telefono es inválido. Debe estar conformado solo por números'
            }
        }
    }

    //Validaciones de email
    if (inputs.email) {
        const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        if (!regex.test(inputs.email)){
            errors.email = 'La dirección de correo electrónico no es válida'
        }
    }

    //Validaciones de contraseña
    //7 caracteres minimo
    //20 caracteres maximo
    //Al menos una letra minuscula
    //Al menos una letra mayuscula
    //Al menos un numero o caracter especial
    if (inputs.password) {
        let minus = false;
        let mayus = false;
        let num = false;
        if (inputs.password.length < 7) {
            errors.password = 'La contraseña es demasiado corta'
        }
        if (inputs.password.length > 20) {
            errors.password = 'La contraseña es demasiado larga'
        }
        let contraseña = inputs.password.split('')
        for (let i = 0; i<contraseña.length; i++){
            if (contraseña[i].charCodeAt(0) >= 48 && contraseña[i].charCodeAt(0) <=57){
                num = true;
            }
            else if (contraseña[i].charCodeAt(0) >= 65 && contraseña[i].charCodeAt(0) <=90){
                mayus = true;
            }
            else if (contraseña[i].charCodeAt(0) >= 97 && contraseña[i].charCodeAt(0) <=122){
                minus = true;
            }
        }
        if (!minus || !mayus || !num) {
            errors.password = 'La contraseña debe contener al menos una letra minúscula, una letra mayúscula y un número';
        }
    }



    return errors;

}