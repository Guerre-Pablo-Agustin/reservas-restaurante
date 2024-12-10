import { useStore } from "@/store/store";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import { BiArrowToRight } from "react-icons/bi";
import { RiEyeCloseLine, RiEyeLine } from "react-icons/ri";

function RegisterForm() {
  //store
  const { createUser } = useStore();

  //router
  const router = useRouter();

  //state
  const [showPassword, setShowPassword] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  return (
    <form className="space-y-4">
      <h2 className="mb-6 text-2xl font-bold">Registrarse</h2>
      <div>
        <label
          htmlFor="name"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Nombre
        </label>
        <input
          type="text"
          id="name"
          value={userData.name}
          onChange={(e) => setUserData({ ...userData, name: e.target.value })}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Correo Electrónico
        </label>
        <input
          type="email"
          id="email"
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Contraseña
        </label>
        <input
          type="password"
          id="password"
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
      <LoginButton />
      <div
        className="flex h-8 items-end space-x-1"
        aria-live="polite"
        aria-atomic="true"
      ></div>
    </form>
  );
}

export default RegisterForm;

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className={`${
        pending ? "bg-blue-300" : "bg-blue-500"
      } mt-4 flex w-full items-center justify-center rounded-md py-2 text-white shadow-md shadow-blue-500/50 transition-all duration-300 ease-in-out hover:bg-blue-400`}
      aria-disabled={pending}
      disabled={pending}
    >
      Log in
      <BiArrowToRight className="h-5 w-5 text-gray-50" />
    </button>
  );
}
