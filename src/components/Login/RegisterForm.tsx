'use client'
import { useStore } from "@/store/store";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import { BiArrowToRight} from "react-icons/bi";
import {  BsKey } from "react-icons/bs";
import { RiEyeCloseLine, RiEyeLine } from "react-icons/ri";
import Swal from "sweetalert2";

interface RegisterFormProps {
  initialId: string;
}


function RegisterForm({ initialId }: RegisterFormProps) {
  //store
  const { createUser } = useStore();

  //router
  const router = useRouter();

  //state
  const [showPassword, setShowPassword] = useState(false);
  const [userData, setUserData] = useState({
    id: "",
    name: "",
    lastName: "",
    email: "",
    password: "",
    image: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (userData.password !== userData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const newUser = {
        id: initialId,
        email: userData.email,
        name: userData.name,
        lastName: userData.lastName,
        image: "/images/avatars/hombre.jpg",
        password: userData.password,
      };

      createUser(newUser);

      Swal.fire({
        title: "Registro exitoso",
        text: "El usuario ha sido registrado con éxito.",
        icon: "success",
        confirmButtonText: "Aceptar",
      });

      setUserData({
        id: "",
        email: "",
        name: "",
        lastName: "",
        image: "",
        password: "",
        confirmPassword: "",
      });
      router.push("/login");
    } catch (error) {
      console.error("Error al registrar el usuario:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Error al registrar el usuario."
      );
    }
  };


  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <h2 className="mb-6 text-2xl font-bold">Registrarse</h2>
      <div className="flex flex-col lg:flex-row gap-4">

      
      <div>
        <label
          htmlFor="name"
          className="mb-2 block text-sm font-medium text-textColor"
        >
          Nombre
        </label>
        <input
          type="text"
          id="name"
          value={userData.name}
          onChange={(e) => setUserData({ ...userData, name: e.target.value })}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />
      </div>
      <div>
        <label
          htmlFor="lastName"
          className="mb-2 block text-sm font-medium text-textColor"
        >
          Apellido
        </label>
        <input
          type="text"
          id="lastName"
          value={userData.lastName}
          onChange={(e) => setUserData({ ...userData, lastName: e.target.value })}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />
      </div>
      </div>
      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-medium text-textColor"
        >
          Correo Electrónico
        </label>
        <input
          type="email"
          id="email"
          value={userData.email}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />
      </div>
      <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="peer text-black block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter password"
                value={userData.password}
                onChange={(e) =>
                  setUserData({ ...userData, password: e.target.value })
                }
                required
                minLength={6}
              />
              <BsKey className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-textColor focus:outline-none "
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <RiEyeLine className="w-5 h-5 " />
                ) : (
                  <RiEyeCloseLine className="w-5 h-5 " />
                )}
              </button>
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="password"
            >
             
                Confirm Password
            </label>
            <div className="relative">
              <input
                className="peer text-black block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter password"
                value={userData.confirmPassword}
                onChange={(e) =>
                  setUserData({ ...userData, confirmPassword: e.target.value })
                }
                required
                minLength={6}
              />
              <BsKey className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
      {error && <span className="text-sm text-red-500">{error}</span>}
      <RegisterButton />

    </form>
  );
}

export default RegisterForm;

function RegisterButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className={`${
        pending ? "bg-blue-300" : "bg-primary"
      } flex items-center justify-center rounded-md py-2 mt-4 w-full text-white hover:bg-blue-400 shadow-md shadow-primary/50 transition-all duration-300 ease-in-out gap-1`}
      aria-disabled={pending}
      disabled={pending}
    >
      Registrarse
      <BiArrowToRight className="h-5 w-5 text-gray-50 " />
    </button>
  );
}

