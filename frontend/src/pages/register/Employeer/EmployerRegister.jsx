import AuthForm from "../../../components/auth/AuthForm";
import { ROLES } from "../../../constants";

  
const EmployerRegister  =()=> {
  return (
    <AuthForm mode="register" role={ROLES.EMPLOYER} />
  );
}

export default EmployerRegister;