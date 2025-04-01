import { CognitoUserPool, CognitoUserAttribute } from "amazon-cognito-identity-js";
import { userPool } from "@/lib/cognito"; 

export function handleSignup(email: string, password: string, firstName: string, lastName: string) {
  return new Promise((resolve, reject) => {
    const attributes = [
      new CognitoUserAttribute({ Name: "given_name", Value: firstName }),
      new CognitoUserAttribute({ Name: "family_name", Value: lastName }),
      new CognitoUserAttribute({ Name: "email", Value: email }),
    ];

    userPool.signUp(email, password, attributes, [], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}
