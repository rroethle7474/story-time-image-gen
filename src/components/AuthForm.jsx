import Form from "./Form";
import InputContainer from "./InputContainer";
import { useState, useActionState } from "react";
import Label from "./Label";
import Input from "./Input";    
import { useAuthContext  } from "../store/auth-context";





function AuthForm () {
    const authCtx = useAuthContext();
    const [authMode, setAuthMode] = useState("login"); // login <-> signup
    const [error, setError] = useState();



    function handleSwitchAuthMode () {
        setAuthMode((prevAuthMode) => {
            if (prevAuthMode === "login") {
                return "signup";
            } else {
                return "login";
            }
        });
    }

    async function submitAction(prevState, formData) {
        setError(null);
        const email = formData.get("email");
        const password = formData.get("password");
        console.log("EMAIL", email);
        console.log("PASSWORD", password);
        try {
            if (authMode === "login") {
                await authCtx.login(email, password);
                console.log("LOGIN SUCCESS");


            } else {
                await authCtx.signup(email, password);
                console.log("SIGNUP SUCCESS");
            }


        } catch (error) {
            setError(error.message);
        }
    }





    const [, action, isPending] = useActionState(submitAction); // action states in react, tied to form action

  return (
    <Form action={action} className="max-w-[25rem] mx-auto">
        <InputContainer>
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" name="email" />
        </InputContainer>
        <InputContainer>
            <Label htmlFor="password">Password</Label>
            <Input type="password" id="password" name="password" />
        </InputContainer>
        {error && <p className="text-red-500">{error}</p>}
        <p className="flex flex-col gap-3 mt-4">
            <button disabled={isPending} className="bg-sky-400 text-black py-2 rounded-lg hover:bg-sky-500 disabled:cursor-not-allowed disabled:bg-stone-400 disabled:text-stone-600">
                {!isPending ? authMode === "login" ? "Login" : "Signup" : "Submitting..."}
                </button>
            <button disabled={isPending} type="button" onClick={handleSwitchAuthMode}>

                {authMode === "login" ? "Create a new user" : "I already have an account, log in"}
                </button>


        </p>
    </Form>
  );
};



export default AuthForm;