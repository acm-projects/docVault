"use client";
import CustomBtn from "@/components/ui/customBtn";
import Link from "next/link";
import { useState } from "react";
import { CognitoUserPool, CognitoUserAttribute } from "amazon-cognito-identity-js";

// AWS Cognito User Pool Configuration
const poolData = {
  UserPoolId: "us-east-2_AjxQIAAbO",
  ClientId: "4ebe6m05covmud0fdeecck98os",
};

const userPool = new CognitoUserPool(poolData);

export default function Signup() {
  // State to store form input values
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate passwords match
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Create Cognito user attributes
    const attributes = [
      new CognitoUserAttribute({ Name: "email", Value: email }),
      new CognitoUserAttribute({ Name: "given_name", Value: firstName }),
      new CognitoUserAttribute({ Name: "family_name", Value: lastName }),
    ];

    // Perform sign up using Cognito
    userPool.signUp(email, password, attributes, [], (err, result) => {
      if (err) {
        console.error("Signup error:", err);
        alert(err.message || "Signup failed");
        return;
      }

      alert("Signup successful! Check your email for verification.");
      console.log("User signup result:", result);
    });
  };

  return (
    <div className="text-darkblue max-container padding-container pb-40 flex flex-col justify-center mt-8">
      <div style={{ minWidth: "30%" }}>
        <div className="flex min-h-full shadow-lg flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-lightergray">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-1 text-center text-2xl font-bold leading-9 tracking-tight">
              Create a new account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                  First Name <sup className="text-lg text-red"> *</sup>
                </label>
                <div className="mt-2">
                  <input
                    id="first-name"
                    name="first-name"
                    type="text"
                    placeholder="First Name"
                    autoComplete="first-name"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                  Last Name
                </label>
                <div className="mt-2">
                  <input
                    id="last-name"
                    name="last-name"
                    type="text"
                    placeholder="Last Name"
                    autoComplete="last-name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password <sup className="text-lg text-red"> *</sup>
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="confirmpassword" className="block text-sm font-medium leading-6 text-gray-900">
                  Confirm Password <sup className="text-lg text-red"> *</sup>
                </label>
                <div className="mt-2">
                  <input
                    id="confirmpassword"
                    name="confirmpassword"
                    type="password"
                    placeholder="Confirm Password"
                    autoComplete="current-password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="flexCenter">
                <CustomBtn type="submit" title="Sign Up" variant="btn_red" />
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Already have an account?{" "}
              <Link href="/login" className="font-semibold leading-6 text-red hover:text-lighterred cursor-pointer">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
