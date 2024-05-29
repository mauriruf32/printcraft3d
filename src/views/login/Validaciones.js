export const validateRegistrationForm = (formData) => {
  for (const key in formData) {
    if (formData[key] === "") {
      return `Por favor completa el campo ${key}`;
    }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email)) {
    return "Por favor ingresa un email válido";
  }

  if (formData.password.length < 8) {
    return "La contraseña debe tener al menos 8 caracteres";
  }

  const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/;
  if (!passwordRegex.test(formData.password)) {
    return "La contraseña debe contener al menos una mayúscula, un número y un carácter especial";
  }

  const nameRegex = /^[A-Za-z]+$/;
  if (!nameRegex.test(formData.nombre)) {
    return "El nombre solo puede contener letras";
  }

  const lastNameRegex = /^[A-Za-z]+$/;
  if (!lastNameRegex.test(formData.apellido)) {
    return "El apellido solo puede contener letras";
  }

  const phoneRegex = /^\d{10}$/;
  if (!phoneRegex.test(formData.telefono)) {
    return "El número de teléfono debe tener exactamente 10 dígitos y ser numérico";
  }

  return null;
};

export const validateLoginForm = (formData) => {
  for (const key in formData) {
    if (formData[key] === "") {
      return `Por favor completa el campo ${key}`;
    }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email)) {
    return "Por favor ingresa un email válido";
  }

  const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(.{8,})$/;
  if (!passwordRegex.test(formData.password)) {
    return "La contraseña debe tener al menos una mayúscula, un número, un carácter especial y ser de al menos 8 caracteres";
  }

  return null;
};
