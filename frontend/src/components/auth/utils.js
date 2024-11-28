export const validateLoginForm = ({ email, password }) => {
    const errors = {};
  
    if (!email) {
      errors.emailError = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.emailError = "Invalid email format";
    }
  
    if (!password) {
      errors.passwordError = "Password is required";
    } else if (password.length < 6) {
      errors.passwordError = "Password must be at least 6 characters long";
    }
  
    return errors;
  };
  
  export const validateRegisterForm = (formData) => {
    const errors = {};
  
    if (!formData.role) {
      errors.role = "Role is required";
    }
  
    if (!formData.name) {
      errors.name = "Name is required";
    }
  
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Invalid email format";
    }
  
    if (!formData.phone) {
      errors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      errors.phone = "Phone number must be 10 digits";
    }
  
    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }
  
    if (!formData.confirmPassword) {
      errors.confirmPassword = "Confirm password is required";
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
  
    if (formData.role === "JobSeeker") {
      if (!formData.firstNiche) {
        errors.firstNiche = "Primary niche is required";
      }
  
      if (!formData.resume) {
        errors.resume = "Resume is required";
      } else if (!/\.(pdf|doc|docx)$/i.test(formData.resume.name)) {
        errors.resume = "Invalid file type. Only PDF or Word documents are allowed";
      }
    }
  
    return errors;
  };
  
  export const createFormData = (formData) => {
    const data = new FormData();
  
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== undefined && formData[key] !== null) {
        data.append(key, formData[key]);
      }
    });
  
    return data;
  };
  