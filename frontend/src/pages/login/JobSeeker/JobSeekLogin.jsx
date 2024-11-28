import AuthForm from "../../../components/auth/AuthForm";
import { ROLES } from "../../../constants";

  
const JobSeekerLogin  =()=> {
  return (
    <AuthForm mode="login" role={ROLES.JOB_SEEKER} />
  );
}

export default JobSeekerLogin;