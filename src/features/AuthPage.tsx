import { useLocation } from "react-router-dom";
import {
  HOME_LEMON,
  HOME_LOGO,
  HOME_MSSG,
  WELCOME_DESC,
  WELCOME_LOGIN,
  WELCOME_REGISTER,
} from "../util/app.constants";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import PageWrapper from "../util/PageWrapper";

function AuthPage() {
  const location = useLocation();
  const path = location.pathname;

  console.log(path);

  return (
    <PageWrapper key={path}>
      <div className="relative w-screen h-screen flex flex-col overflow-hidden  select-none bg-gradient-to-br justify-between from-white via-primary/60 md:via-primary/55 to-primary">
        <div className="absolute top-[-100px] right-[-100px] w-[250px] h-[250px] bg-[#D9C2C2] opacity-50 rounded-full z-0"></div>
        <div className="absolute bottom-[-150px] left-[-150px] w-[300px] h-[300px] bg-[#BCA4A4] opacity-50 rounded-full z-0"></div>
        <div className="absolute bottom-[-150px] hidden md:block left-[539px] w-[300px] h-[300px] bg-[#BCA4A4] opacity-50 rounded-full z-0"></div>

        <div className="flex max-w-full h-fit md:max-w-[14vw] justify-center md:justify-start z-10">
          <img
            src="./logo.png"
            alt="Logo"
            className="md:w-full w-[50%] h-fit border-none"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 md:pb-[12vh] z-10 h-full">
          <div className="cols-span-1 hidden md:flex flex-col md:text-[48px] ml-[3vw] font-semibold font-primary justify-end">
            <p className="text-white">{HOME_MSSG}</p>
            <p className="text-secondary">{HOME_LEMON}</p>
            <p className="text-white">{HOME_LOGO}</p>
          </div>
          <div className="cols-span-1 flex justify-center items-center w-full flex-col font-primary">
            <div className="flex flex-col text-white space-y-2 mb-2 px-2">
              <h2 className="text-2xl md:text-[38px]">
                {path === "/login" ? WELCOME_LOGIN : WELCOME_REGISTER}
              </h2>
              <h2 className="md:text-[20px] w-[80%]">{WELCOME_DESC}</h2>
              {path === "/login" ? <LoginPage /> : <RegisterPage />}
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

export default AuthPage;
