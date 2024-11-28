import AuthForm from "../../../components/auth/AuthForm";
import { ROLES } from "../../../constants";

  
const EmployerLogin  =()=> {
  return (
    <AuthForm mode="login" role={ROLES.EMPLOYER}/>
  );
}

export default EmployerLogin;