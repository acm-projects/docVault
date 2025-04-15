import { NextApiRequest, NextApiResponse } from "next";
import AWS from "aws-sdk";

// Initialize AWS Cognito
const cognito = new AWS.CognitoIdentityServiceProvider({
  region: "us-east-2", 
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { firstName, lastName, email, password } = req.body;

    // Prepare Cognito parameters
    const params = {
      ClientId: "4ebe6m05covmud0fdeecck98os",
      Username: email,
      Password: password,
      UserAttributes: [
        { Name: "given_name", Value: firstName }, // First Name attribute
        { Name: "family_name", Value: lastName },  // Last Name attribute
        { Name: "email", Value: email },           // Email attribute
      ],
    };

    try {
      // Attempt to sign up the user
      const response = await cognito.signUp(params).promise();

      // Handle success response
      res.status(200).json({ message: "User signed up successfully!", data: response });
    } catch (error: unknown) {
      // Error handling
      if (error instanceof Error) {
        console.error("Error signing up:", error.message);
        res.status(500).json({ message: "Error signing up user", error: error.message });
      } else {
        console.error("Unexpected error:", error);
        res.status(500).json({ message: "Unexpected error occurred" });
      }
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}