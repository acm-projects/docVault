"use client";
import CustomBtn from "@/components/ui/customBtn";
import Link from "next/link";

export default function Login() {

  return (
    <>
        <div className="text-darkblue max-container padding-container mt-8">
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-lg md:max-w-2xl">
                <div className="pt-5 pb-10">
                    <h1 className="text-5xl font-bold text-lighterred">Log In</h1>
                </div>

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
                            className="border border-middlegray block w-full rounded-md py-1.5 px-3 text-gray-900 
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
                            className="border border-middlegray block w-full rounded-md py-1.5 px-3 text-gray-900 
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
    </>
  );

}