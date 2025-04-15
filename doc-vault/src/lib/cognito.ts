import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: "us-east-2_AeBbEnOrS", // Replace with your actual User Pool ID
  ClientId: "310qnb14vihhrg0enm4i080slc", // Replace with your actual App Client ID
};

export const userPool = new CognitoUserPool(poolData);
