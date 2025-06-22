import Input from "../components/Input";
import {
  HOME_LEMON,
  HOME_LOGO,
  HOME_MSSG,
  REMEMBER_ME,
  SIGN_UP,
  WELCOME_DESC,
  WELCOME_LOGIN,
} from "../util/app.constants";

function Login() {
  return (
    <div className="w-full h-screen flex flex-col bg-gradient-to-br justify-between  from-white via-primary/55 to-primary">
      <div className="flex w-full max-h-[10vh] max-w-[14vw]">
        <img src="./logo.png" alt="Logo" className="w-full h-fit border-none" />
      </div>
      <div className="grid grid-cols-2 pb-[20vh]">
        <div className="cols-span-1 flex flex-col md:text-[48px] ml-[3vw] font-semibold font-primary">
          <p className="text-white">{HOME_MSSG}</p>
          <p className="text-secondary">{HOME_LEMON}</p>
          <p className="text-white">{HOME_LOGO}</p>
        </div>
        <div className="cols-span-1 flex justify-center items-center w-full flex-col font-primary">
          <div className="flex flex-col text-white space-y-2 mb-2">
            <h2 className="text-[38px]">{WELCOME_LOGIN}</h2>
            <h2 className="text-[20px] w-[20vw]">{WELCOME_DESC}</h2>
            <div className="space-y-2.5">
              <Input id="email" label="Email" />
              <Input id="password" label="Password" type="password" />
              <div className="flex w-full justify-between items-center text-white text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border border-white accent-white"
                  />
                  {REMEMBER_ME}
                </label>
                <button className="font-semibold">{SIGN_UP}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
