import React from 'react'
import Link from "next/link";
import CustomBtn from '@/components/ui/customBtn';
import { ChevronLeft } from 'lucide-react';

const account = () => {
    return (
        <div className="text-darkblue text-lg p-4 flex flex-col justify-center items-center space-y-4">
            <div className='relative w-full py-4'>
                <Link className="flex" href="index.html">
                    <ChevronLeft />
                    <span className="px-5 text-sm">Back</span>
                </Link>
                <div className="text-lg font-semibold flex justify-center align-center">
                    Log In
                </div>
            </div>

            <form className="space-y-6" action="#" method="POST">
                <div>
                    <label
                        htmlFor="email"
                        className="align-left block text-sm font-medium leading-6 text-gray-900"
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
                        shadow-sm placeholder:text-gray-400 text-sm sm:leading-6"
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
                                    className="text-xs pl-5 font-semibold text-lighterred hover:text-red"
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
                            shadow-sm placeholder:text-gray-400 text-sm sm:leading-6"
                            />
                    </div>
                </div>

                <div className="flexCenter text-sm">
                    <CustomBtn 
                            type="submit"
                            title="Log In"
                           variant="btn_red"
                    />
                </div>
            </form>

                <p className="mt-10 text-center text-sm">
                    Not a member?{" "}
                    <Link
                        href="http://localhost:3000/signup" 
                        target="_blank"
                        className="font-semibold leading-6 text-lighterred 
                        hover:text-red cursor-pointer"
                    >
                        Create an account!
                    </Link>
                </p>
            <script src="detect.js"></script>
        </div>
    )
}

export default account