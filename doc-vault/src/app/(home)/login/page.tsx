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
      /*localStorage.setItem("accessToken", data.AuthenticationResult.AccessToken);
      localStorage.setItem("idToken", data.AuthenticationResult.IdToken);
      localStorage.setItem("refreshToken", data.AuthenticationResult.RefreshToken);*/
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
    <div className="text-darkblue max-container padding-container pb-40 flex flex-col justify-center mt-8">
      <div style={{ minWidth: "30%" }}>
        <div className="flex min-h-full shadow-lg flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-lightergray">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-1 text-center text-2xl font-bold">Log in to your account</h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleLogin}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                  Email address <sup className="text-lg text-red"> *</sup>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email address"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                    Password <sup className="text-lg text-red"> *</sup>
                  </label>
                  <Link href="#" className="font-semibold text-lighterred hover:text-red">
                    Forgot password?
                  </Link>
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <div className="flexCenter">
                <CustomBtn type="submit" title="Log In" variant="btn_red" />
              </div>
            </form>

            <p className="mt-10 text-center text-sm">
              Not a member?{" "}
              <Link href="/signup" className="font-semibold text-lighterred hover:text-red cursor-pointer">
                Create an account!
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
