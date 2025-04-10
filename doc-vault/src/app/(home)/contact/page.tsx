import CustomBtn from '@/components/ui/customBtn'
import React from 'react'

const Contact = () => {
    return (
      <div className="text-darkblue max-container padding-container mt-8">
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-lg md:max-w-2xl">
          <div className="pt-5 pb-10">
            <h1 className="text-5xl font-bold text-lighterred">Contact</h1>
          </div>
          <form className="space-y-6" action="#" method="POST">   
          <div className="flex flex-row gap-6 w-full"> 
            <div className="w-1/2">
              <label
                htmlFor="firstName"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                First Name <sup className="text-lg text-red"> *</sup>
              </label>
              <div className="mt-2">
                <input
                  id="firstName"
                  name="firstName"
                  type="name"
                  placeholder="First Name"
                  autoComplete="firstName"
                  required
                  className="border border-middlegray block w-full rounded-md py-1.5 px-3 text-gray-900 
                            shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  />
              </div>
            </div>

            <div className="w-1/2">
              <label
                htmlFor="lastName"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Last Name <sup className="text-lg text-red"> *</sup>
              </label>
              <div className="mt-2">
                <input
                  id="lastName"
                  name="lastName"
                  type="name"
                  placeholder="Last Name"
                  autoComplete="lastName"
                  required
                  className="border border-middlegray block w-full rounded-md py-1.5 px-3 text-gray-900 
                            shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  />
              </div>
            </div>
          </div> 

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
                  Message <sup className="text-lg text-red"> *</sup>
                </label>
              </div>
              <div className="mt-2">
                <textarea
                  id="message"
                  name="message"
                  placeholder="Enter your question or message here..."
                  required
                  className="border border-middlegray block w-full rounded-md py-1.5 px-3 text-gray-900 
                  shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="flexCenter">
              <CustomBtn 
                  type="submit"
                  title="Submit"
                  variant="btn_red"
                />
            </div>
          </form>
      </div>
    </div>
  )
}

export default Contact