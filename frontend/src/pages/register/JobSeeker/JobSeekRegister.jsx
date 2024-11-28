import AuthForm from "../../../components/auth/AuthForm";
import { ROLES } from "../../../constants";

  
const JobSeekerRegister  =()=> {
  return (
    <AuthForm mode="register" role={ROLES.JOB_SEEKER}/>
  );
}

export default JobSeekerRegister;