/**
 * Validates email format
 * @param {string} email 
 * @returns {boolean}
 */

import { ROLES } from "../../constants";

export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validates phone number format
 * @param {string} phone 
 * @returns {boolean}
 */
export const isValidPhone = (phone) => {
  const phoneRegex = /^\+?[\d\s-]{10,}$/;
  return phoneRegex.test(phone);
};

/**
 * Validates form data and returns error messages
 * @param {Object} formData 
 * @returns {Object} Error messages for each invalid field
 */
export const validateForm = (formData) => {
  const errors = {};
  
  // Required fields validation
  const requiredFields = ['role', 'name', 'email', 'phone', 'password'];
  requiredFields.forEach(field => {
    if (!formData[field]) {
      errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
    }
  });

  // Email validation
  if (formData.email && !isValidEmail(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }

  // Phone validation
  if (formData.phone && !isValidPhone(formData.phone)) {
    errors.phone = 'Please enter a valid phone number';
  }

  // Password validation
  if (formData.password) {
    if (formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters long';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      errors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
    }
  }

  // Job Seeker specific validations
  if (formData.role === ROLES.JOB_SEEKER) {
    if (!formData.firstNiche) {
      errors.firstNiche = 'Primary niche is required';
    }
    if (!formData.coverLetter) {
      errors.coverLetter = 'Cover letter is required';
    } else if (formData.coverLetter.length < 100) {
      errors.coverLetter = 'Cover letter must be at least 100 characters long';
    }
    if (!formData.resume) {
      errors.resume = 'Resume is required';
    } else {
      const allowedTypes = ['.pdf', '.doc', '.docx'];
      const fileExtension = formData.resume.name.toLowerCase().slice(((formData.resume.name.lastIndexOf(".") - 1) >>> 0) + 2);
      if (!allowedTypes.includes(`.${fileExtension}`)) {
        errors.resume = 'Please upload a PDF or Word document';
      }
    }
  }

  return errors;
};

/**
 * Creates FormData object from form values
 * @param {Object} formData 
 * @returns {FormData}
 */
export const createFormData = (formData) => {
  const submitData = new FormData();
  Object.entries(formData).forEach(([key, value]) => {
    if (value !== null && value !== '') {
      submitData.append(key, value);
    }
  });
  return submitData;
};

/**
 * Handles API errors and returns appropriate error messages
 * @param {Error} error 
 * @returns {string}
 */
export const handleApiError = (error) => {
  if (error.response) {
    switch (error.response.status) {
      case 400:
        return 'Please check your input and try again';
      case 401:
        return 'Authentication failed. Please try again';
      case 409:
        return 'An account with this email already exists';
      case 422:
        return 'Invalid data provided. Please check your input';
      default:
        return 'An error occurred. Please try again later';
    }
  }
  return 'Network error. Please check your connection';
};