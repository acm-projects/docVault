"use client";
import CustomBtn from "@/components/ui/customBtn";
import Link from "next/link";

export default function Login() {

  return (
    <>
        <div className="text-darkblue max-container padding-container pb-40 flex flex-col justify-center mt-8">
            <div style={{ minWidth: "30%" }}>
                <div className="flex min-h-full shadow-lg flex-1 flex-col justify-center px-6 
                    py-12 lg:px-8 bg-lightergray">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <h2 className="mt-1 text-center text-2xl font-bold leading-9 
                        tracking-tight">
                            Log in to your account
                        </h2>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" action="#" method="POST">
                    
                        <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Email address <sup className="text-lg text-red"> *</sup>
                        </label>
                        <div className="mt-2">
                            <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Email address"
                            autoComplete="email"
                            required
                            className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 
                            shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
                            />
                        </div>
                        </div>

                        <div>
                        <div className="flex items-center justify-between">
                            <label
                            htmlFor="password"
                            className="block text-sm font-medium leading-6 text-gray-900"
                            >
                            Password <sup className="text-lg text-red"> *</sup>
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
                            placeholder="Password"
                            autoComplete="current-password"
                            required
                            className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 
                            shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
                            />
                        </div>
                        </div>

                        <div className="flexCenter">
                        <Link href="/personal">
                            <CustomBtn 
                                type="submit"
                                title="Log In"
                                variant="btn_red"
                            />
                        </Link>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm">
                        Not a member?{" "}
                        <Link
                            href="/signup"
                            className="font-semibold leading-6 text-lighterred 
                        hover:text-red cursor-pointer"
                        >
                            Create an account!
                        </Link>
                    </p>
                    </div>
                </div>
            </div>
        </div>
    </>
  );
}