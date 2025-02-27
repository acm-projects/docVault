"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  return (
    <>
        <div className="flex m-auto items-center justify-center mt-16">
            <div style={{ minWidth: "30%" }}>
            <div className="flex min-h-full shadow-lg flex-1 flex-col justify-center px-6 
                py-12 lg:px-8 bg-white">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                
                <h2 className="mt-1 text-center text-2xl font-bold leading-9 
                tracking-tight text-red">
                    Log In
                </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" action="#" method="POST">
                <div>
                    <label
                        htmlFor="first-name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                    >
                        First Name
                    </label>
                    <div className="mt-2">
                        <input
                        id="first-name"
                        name="first-name"
                        type="text"
                        autoComplete="first-name"
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 
    shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 
    focus:ring-inset focus:ring-red sm:text-sm sm:leading-6"
                        />
                    </div>
                    </div>

                    <div>
                    <label
                        htmlFor="last-name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                    >
                        Last Name
                    </label>
                    <div className="mt-2">
                        <input
                        id="last-name"
                        name="last-name"
                        type="text"
                        autoComplete="last-name"
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 
    shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 
    focus:ring-inset focus:ring-red sm:text-sm sm:leading-6"
                        />
                    </div>
                    </div>
                    
                    <div>
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                    >
                        Email address
                    </label>
                    <div className="mt-2">
                        <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 
    shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 
    focus:ring-inset focus:ring-red sm:text-sm sm:leading-6"
                        />
                    </div>
                    </div>

                    <div>
                    <div className="flex items-center justify-between">
                        <label
                        htmlFor="password"
                        className="block text-sm font-medium leading-6 text-gray-900"
                        >
                        Password
                        </label>
                        <div className="text-sm">
                        <Link
                            href="#"
                            className="font-semibold text-lighterred hover:text-red"
                        >
                            Forgot password?
                        </Link>
                        </div>
                    </div>
                    <div className="mt-2">
                        <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 
    shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 
    focus:ring-inset focus:ring-red sm:text-sm sm:leading-6"
                        />
                    </div>
                    </div>

                    <div>
                    <button
                        type="submit"
                        className="flex w-full justify-center rounded-md bg-red
    px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-lighterred
    focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 
    focus-visible:outline-red"
                    >
                        Log In
                    </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                    Not a member?{" "}
                    <span
                    className="font-semibold leading-6 text-red 
    hover:text-indigo-500 cursor-pointer"
                    onClick={()=>{router.push("/signup")}}
                    >
                    Create an account!
                    </span>
                </p>
                </div>
            </div>
            </div>
        </div>
    </>
  );
}
