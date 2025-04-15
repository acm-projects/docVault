"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import CustomBtn from "@/components/ui/customBtn";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    const clientId = "4ebe6m05covmud0fdeecck98os"; // Replace with your Cognito App Client ID
    const url = `https://cognito-idp.us-east-2.amazonaws.com/`; // Replace with your region, e.g., us-east-1

    const requestBody = {
      AuthParameters: {
        USERNAME: email,
        PASSWORD: password,
      },
      AuthFlow: "USER_PASSWORD_AUTH",
      ClientId: clientId,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-amz-json-1.1",
          "X-Amz-Target": "AWSCognitoIdentityProviderService.InitiateAuth",
        },
        body: JSON.stringify(requestBody),
      });
    
      const responseText = await response.text(); // Read raw body
      console.log("Status:", response.status);
      console.log("Raw response:", responseText);
    
      if (!response.ok) {
        throw new Error("Login failed: " + responseText);
      }
    
      const data = JSON.parse(responseText);
      console.log("Login successful:", data);
    
      // Store tokens (optional, for future authentication)
      //localStorage.setItem("accessToken", data.AuthenticationResult.AccessToken);
      //localStorage.setItem("idToken", data.AuthenticationResult.IdToken);
      //localStorage.setItem("refreshToken", data.AuthenticationResult.RefreshToken);

      sessionStorage.setItem("idToken", data.AuthenticationResult.IdToken);
      window.postMessage({
        type: "SEND_JWT",
        token: data.AuthenticationResult.IdToken
      }, "*");

      //window.sendMessage()({accessToken: data.AuthenticationResult.AccessToken})

      //window.postMessage({type : "FROM_PAGE", text : `${data.AuthenticationResult.AccessToken}`}, "*");
      

      // Redirect to personal page
      router.push("/personal");
    } catch (err: any) {
      console.error("Login error:", err);
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <>
        <div className="text-darkblue max-container padding-container mt-8">
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-lg md:max-w-2xl">
                <div className="pt-5 pb-10">
                    <h1 className="text-5xl font-bold text-lighterred">Log In</h1>
                </div>

                <form className="space-y-6" onSubmit={handleLogin}>
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
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
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
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        </div>

                        <div className="flexCenter">
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