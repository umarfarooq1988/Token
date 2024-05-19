import ReactDOM from 'react-dom'
import React from 'react'
import App from "./components/App";
import { AuthClient } from "@dfinity/auth-client";

const init = async () => { 
  ReactDOM.render(<App />, document.getElementById("root"));


  const AuthClient = await AuthClient.create();

  if (await AuthClient.isAuthenticated()) {
    handleAuthenticated(authClient);
  } else {
    await AuthClient.login({
      indentityProvider: "https://identity.ic0.app//#authorize",
      onSuccess: () => {
        handleAuthenticated(authClient);
      }
    });
  }

 
}

async function handleAuthenticated(authClient) {
  const identity = authClient.getIdentity();
  const userPrincipal = identity._principal.toString();
  console.log(userPrincipal);
  ReactDOM.render(<App loggedInPrincipal={userPrincipal}/>, document.getElementById("root"));
}

init();


