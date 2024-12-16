const generatePassword = () => {
    const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const specialChars = "@$!%*?&";
    const allChars = letters + numbers + specialChars;
  
    let password = "";
    password += letters.charAt(Math.floor(Math.random() * letters.length));
    password += numbers.charAt(Math.floor(Math.random() * numbers.length));
    password += specialChars.charAt(Math.floor(Math.random() * specialChars.length));
  
    for (let i = 3; i < 12; i++) {
      password += allChars.charAt(Math.floor(Math.random() * allChars.length));
    }
  
    return password
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("");
  };
  
  export default generatePassword