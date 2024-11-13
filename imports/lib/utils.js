const validateUserAccess = function(id, roles){
    if(!id){
        return false;
    }
    
    if(!Roles.userIsInRole(id, [...roles])){
        return false
    }

    return true
}

const formatPrice = (amount)=>{
    const options = { style: 'currency', currency: 'USD' };
    const numberFormat = new Intl.NumberFormat('en-US', options);
  
    return numberFormat.format(amount);
}

const formatPriceExtended = (amount)=>{
  const options = { style: 'currency', currency: 'USD', maximumFractionDigits: 4 };
  const numberFormat = new Intl.NumberFormat('en-US', options);

  return numberFormat.format(amount);
}

const formatNumberExtended = (amount)=>{
  const options = { maximumFractionDigits: 4 };
  const numberFormat = new Intl.NumberFormat('en-US', options);

  return numberFormat.format(amount);
}

const parseFloatFixed = (x) => {
    const n = Number.parseFloat(x);
    return Math.round(n * 100) / 100;
}

const validateDataType = (dataType, value) => {
    let regex = /^[a-zA-Z0-9._\- ]*$/
    switch(dataType){
      case "only-letters":
        regex = /^[a-zA-Z\s]*$/
      break;
      case "letters-numbers":
        regex = /^[a-zA-Z0-9\s]$/
      break;
      case "number-float":
        regex = /^[0-9]*(?:[.,])?[0-9]*$/
      break;
      case "number-integer":
        regex = /^[0-9]*$/
      break;
      case "email":
        regex = /^[a-zA-Z0-9._\-@ ]*$/
      break;
    }
    return value.search(regex) != -1
}

const ValidatePassword = (password) => {

  let validacionFormato = true
  let msn = ""

  if(password.length < 8){
      validacionFormato = false
      msn = "La contraseña es muy corta"
      return {
        valid : validacionFormato,
        msn
      }
  }
  
  if(password.search(/\s/) != -1){
      validacionFormato = false
      msn = "La contraseña no debe tener espacios"
      return {
        valid : validacionFormato,
        msn
      }
  }

  if(password.search(/[A-Za-z]/) == -1){
      validacionFormato = false
      msn = "La contraseña debe contener letras"
      return {
        valid : validacionFormato,
        msn
      }
  }

  if(password.search(/[0-9]/) == -1){
      validacionFormato = false
      msn = "La contraseña debe contener numeros"
      return {
        valid : validacionFormato,
        msn
      }
  }

  if(password.search(/[^A-Za-z0-9]/) != -1){
      validacionFormato = false
      msn = "La contraseña no debe tener caracteres especiales"
      return {
        valid : validacionFormato,
        msn
      }
  }

  return {
    valid : validacionFormato,
    msn
  }
}

const ValidateEmail = (email) => {
  return email.search(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
}

function getAccess (userId, rolesArr) {
  return Roles.userIsInRole(userId, rolesArr, undefined);
}

export {validateUserAccess, formatPrice, parseFloatFixed, validateDataType, ValidatePassword, ValidateEmail, formatPriceExtended, formatNumberExtended, getAccess}