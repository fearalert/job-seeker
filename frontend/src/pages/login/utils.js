/**
 * Validates email format
 * @param {string} email 
 * @returns {boolean}
 */
export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  /**
   * Validates form data and returns error messages
   * @param {Object} formData 
   * @returns {Object} Error messages for each invalid field
   */
  export const validateLoginForm = (formData) => {
    const errors = {};
    
    // Required fields validation
    const requiredFields = ['email', 'password'];
    requiredFields.forEach(field => {
      if (!formData[field]) {
        errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
      }
    });
  
    // Email validation
    if (formData.email && !isValidEmail(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
  
    // Password validation
    if (formData.password) {
      if (formData.password.length < 6) {
        errors.password = 'Password must be at least 6 characters long';
      }
    }
  
    return errors;
  };
  