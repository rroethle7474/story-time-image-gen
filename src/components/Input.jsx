import { twMerge } from "tailwind-merge";

function Input({ isTextarea, className, ...props }) {
    const Component = isTextarea ? "textarea" : "input"; // capital character for the component makes it a react component
    return (
        <Component className={twMerge("bg-stone-600 p-2 rounded-lg", className)} {...props} />
    );
}

export default Input;
