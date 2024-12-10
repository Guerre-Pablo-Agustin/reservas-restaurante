import { useStore } from "@/store/store";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import { BiArrowToRight } from "react-icons/bi";
import { BsKey } from "react-icons/bs";
import { RiEyeCloseLine, RiEyeLine } from "react-icons/ri";

function LoginForm() {
  //store
  const { login } = useStore();

  //router
  const router = useRouter();

  //state
  const [showPassword, setShowPassword] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const result = login(userData.email, userData.password);
      if (result) {
        router.push("/dashboard");
        setUserData({
          email: "",
          password: "",
        });
        setError("");
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setError("Invalid email or password");
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <h2 className="mb-6 text-2xl font-bold">Iniciar Sesión</h2>
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
          value={userData.email}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <label
        className="mb-3 mt-5 block text-xs font-medium text-gray-900"
        htmlFor="password"
      >
        Password
      </label>
      <div className="relative">
        <input
          className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 pr-10 text-sm text-black outline-2 placeholder:text-gray-500"
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
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <RiEyeLine className="h-5 w-5" />
          ) : (
            <RiEyeCloseLine className="h-5 w-5" />
          )}
        </button>
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

export default LoginForm;

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
