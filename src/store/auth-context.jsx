import { createContext, use, useState} from "react";

const AuthContext = createContext({
   token: "",
   signup: (email, password) => {},
   login: (email, password) => {},
   logout: () => {},
});

// custom hook
export function useAuthContext() {
    const authCtx = use(AuthContext);

    if(!authCtx) {
        throw new Error("useAuthContext must be used within a AuthContextProvider");
    }

    return authCtx;
}

function saveToken(token) {
    localStorage.setItem('token', token.token);
    localStorage.setItem(
      'tokenExpiration',
      new Date(Date.now() + 60 * 60 * 1000).toISOString()
    );
  }
    // initial loading of token when page is loaded
    const storedToken = localStorage.getItem('token');
    const storedTokenExpiration = localStorage.getItem('tokenExpiration');

    let initialToken = null;

    if (storedToken && new Date(storedTokenExpiration) > new Date()) {
        initialToken = storedToken;
    } else {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiration');
    }


export function AuthContextProvider({ children }) { 
    const [token, setToken] = useState();

    async function signup(email, password) {
        const response = await fetch('http://localhost:3000/auth/signup', {
            method: "POST",
            headers: {

            "Content-Type": "application/json",

            },
            body: JSON.stringify({ email, password }),
        });
        const resData = await response.json();
        if (!response.ok) {
            throw new Error(resData.message || "Creating a user failed. Check your credentials or try later.");
        }

        setToken(resData.json_token);
        saveToken(resData.json_token);
    }




    async function login(email, password) {
        console.log("LOGIN", email, password);
        const response = await fetch('http://localhost:3000/auth/login', {
            method: "POST",
            headers: {

            "Content-Type": "application/json",

            },
            body: JSON.stringify({ email, password }),
        });
        const resData = await response.json();
        console.log("RES DATA", resData.error);
        if (!response.ok) {
            throw new Error(resData.error || "Creating a user failed. Check your credentials or try later.");
        }

        console.log("RES DATA", resData.json_token);
        setToken(resData.json_token);
        saveToken(resData.json_token);
    }

    function logout() {
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('tokenExpiration');
    }

    const contextValue = {
        token,
        signup,
        login,
        logout,
    }

    
    return <AuthContext value={contextValue}>{children}</AuthContext>


}
