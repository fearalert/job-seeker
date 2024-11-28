import { ROLES } from "../../constants";

// Utility for validating email format
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  // Utility for validating password strength
  const isStrongPassword = (password) => {
    // Password should be at least 8 characters, including a number and a special character
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/;
    return passwordRegex.test(password);
  };
  
  // Validate Login Form
  export const validateLoginForm = ({ email, password }) => {
    const errors = {};
  
    if (!email) {
      errors.email = 'Email is required';
    } else if (!isValidEmail(email)) {
      errors.email = 'Invalid email address';
    }
  
    if (!password) {
      errors.password = 'Password is required';
    }
  
    return errors;
  };
  
  // Validate Register Form
  export const validateRegisterForm = (form) => {
    const errors = {};
  
    // Name validation
    if (!form.name) {
      errors.name = 'Name is required';
    } else if (form.name.length < 2) {
      errors.name = 'Name must be at least 2 characters long';
    }
  
    // Email validation
    if (!form.email) {
      errors.email = 'Email is required';
    } else if (!isValidEmail(form.email)) {
      errors.email = 'Invalid email address';
    }
  
    // Password validation
    if (!form.password) {
      errors.password = 'Password is required';
    } else if (!isStrongPassword(form.password)) {
      errors.password = 'Password must be at least 8 characters, include a number and a special character';
    }
  
    // Confirm password validation
    if (!form.confirmPassword) {
      errors.confirmPassword = 'Confirm password is required';
    } else if (form.confirmPassword !== form.password) {
      errors.confirmPassword = 'Passwords do not match';
    }
  
    // Niche validation
    if (form.role === ROLES.JOB_SEEKER && (!form.niche || form.niche.length === 0)) {
      errors.niche = 'At least one niche is required';
    } else if (form.niche.length > 4) {
      errors.niche = 'You can select up to 4 niches';
    } else if (form.niche.length <= 3) {
        errors.niche = 'Select 3 compulsary niches';
      }
    
  
    // Cover letter validation
    if (form.role === ROLES.JOB_SEEKER && !form.coverLetter) {
      errors.coverLetter = 'Cover letter is required';
    }
  
    // Resume validation
    if (form.role === ROLES.JOB_SEEKER && !form.resume) {
      errors.resume = 'Resume is required';
    }
  
    return errors;
  };
  