export const NICHE_OPTIONS = [
    "Software Development",
    "Web Development",
    "Cybersecurity",
    "Data Science",
    "Artificial Intelligence",
    "Cloud Computing",
    "DevOps",
    "Mobile App Development",
    "Blockchain",
    "Database Administration",
    "Network Administration",
    "UI/UX Design",
    "Game Development",
    "IoT (Internet of Things)",
    "Big Data",
    "Machine Learning",
    "IT Project Management",
    "IT Support and Helpdesk",
    "Systems Administration",
    "IT Consulting",
    "Business Analyst",
  ];
  
  export const INITIAL_REGISTER_FORM_STATE = {
    role: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    firstNiche: '',
    secondNiche: '',
    thirdNiche: '',
    fourthNiche: '',
    coverLetter: '',
    resume: null
  };
  
  export const INITIAL_LOGIN_STATE = {
    email: '',
    password: '',
    rememberMe: false,
    role: '',
    emailError: '',
    passwordError: '',
  };

  export const ROLES = {
    EMPLOYER: 'Employer',
    JOB_SEEKER: 'Job Seeker'
  };