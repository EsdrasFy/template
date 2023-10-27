"use client";
import InputUi from "@/app/components/ui/input";
import React, { useContext, useState } from "react";
import Cookies from "js-cookie";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import logo from "../../assets/logo-big.png";
import bg from "../../assets/bg-gray-login.jpg";
import Image from "next/image";
import Link from "next/link";
import ButtonIcon from "@/app/components/ui/buttonIcon";
import { FaArrowLeft, FaFacebook } from "react-icons/fa";
import { ImGoogle3 } from "react-icons/im";
import ButtonPass from "../../components/ui/buttonPass";
import LoginApi from "../../api/LoginApi";
import { UserContext } from "@/app/api/contexts/UserContext";
import LoadingSpinner from "@/app/components/ui/loading";
import Successfully from "@/app/components/Successfully";

// BiCheckShield;
// BiErrorAlt;

type Inputs = {
  credential: string;
  password: string;
};
const schema = yup.object().shape({
  credential: yup
    .string()
    .required("This field is required!")
    .min(8, "Minimum characters are 8."),
  password: yup
    .string()
    .min(8, "Minimum characters are 8.")
    .required("This field is required!"),
});

function Login() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<number>();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [errorLogin, setErrorLogin] = useState<string>("");
  const userContext = useContext(UserContext);
  if (!userContext) {
    return null;
  }
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({ resolver: yupResolver(schema) });
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const credential = data.credential;
    const password = data.password;
    try {
      setLoading(true);
      const data = await LoginApi({ credential, password });
      console.log(data.status);
      setSuccess(data.status);
      if (data.error) {
        setErrorLogin(data.error);
      }
    } catch (error) {
      console.log("Erro ao buscar usuario");
    } finally {
      setLoading(false);
      const jwt = Cookies.get("jwt");
      console.log(jwt);
      onShowModal();
    }
  };

  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const onShowModal = () => {
    setShowModal(!showModal);
  };
  const closeModal = () => {
    setShowModal(false);
  };
  return (
    <section className="w-full h-screen bg-grayTwo flex justify-center items-center">
      <div className=" max-w-[900px] w-full mx-8 bg-grayOne flex  shadow-snipped ">
        <div className="w-[100%] relativec sm:w-[70%]">
          {loading ? (
            <div className="absolute w-full h-full bg-grayOne/90 z-40 flex justify-center items-center">
              <LoadingSpinner />
            </div>
          ) : (
            ""
          )}
          {showModal ? (
            <div className="absolute w-full h-full bg-grayOne/90 z-40 flex justify-center items-center">
              <Successfully
                icon={success === 200 ? "BiCheckShield" : "BiErrorAlt"}
                contentButton={success === 200 ? "Página Inicial" : "OK"}
                content={
                  success === 200
                    ? "Welcome again! Enjoy the varieties"
                    : errorLogin
                }
                href={success === 200 && true}
                closeModal={closeModal}
              />
            </div>
          ) : (
            ""
          )}
          <nav className="flex w-full justify-between px-6 text-textColor py-4 ">
            <Link href="/">
              <FaArrowLeft className="text-3xl hover-snipped " />
            </Link>
            <Link href="/my-account/register" className="text-xl hover-snipped">
              Register
            </Link>
          </nav>
          <h2 className="w-full text-center text-pink text-3xl mb-5">Login</h2>
          <form
            className="flex w-full flex-col  justify-center px-10 pb-10"
            onSubmit={handleSubmit(onSubmit)}
          >
            <InputUi
              type="text"
              label="Email ou username"
              pleaceholder="Enter you email or username"
              classname="w-full text-textColor"
              name="credential"
              register={register}
              error={errors?.credential?.message}
            />
            <ButtonPass
              label="Password"
              classname="w-full text-textColor"
              name="password"
              show={show}
              handleClick={handleClick}
              register={register}
              error={errors?.password?.message}
            />
            <Link
              href="forgot-password"
              className="text-right py-4 text-textColor"
            >
              Forgot your password?
            </Link>
            <ButtonIcon type="submit" content="Login" icon="FaArrowRight" />
          </form>
          <div className="w-full flex flex-col justify-end items-center text-textColor pb-5">
            <p className="text-2xl mb-3">Or</p>
            <span className="flex items-center gap-4 text-3xl">
              <ImGoogle3 className="text-5xl" /> -{" "}
              <FaFacebook className="text-5xl" />
            </span>
            <p className="mt-8">
              <Link href="forgot-password">forgot password</Link> •
              <Link href="privacy"> privacy police</Link>
            </p>
          </div>
        </div>
        <aside className="w-[30%] min-h-full relative hidden justify-center items-center sm:flex">
          <Image
            src={bg}
            alt="bg-gray"
            className="absolute w-full h-full z-0"
          />{" "}
          <figure className="z-10 flex flex-col justify-center items-center text-xl">
            <Image src={logo} alt="logo image" width={100} />
            <p className="max-w-[50%] font-logo text-3xl mt-4 text-textColor">
              URBAN VOGUE
            </p>
          </figure>
        </aside>
      </div>
    </section>
  );
}

export default Login;
