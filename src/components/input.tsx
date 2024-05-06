import { Input } from "@chakra-ui/react";
import "./input.css";
import { UseFormRegister, FieldValues } from "react-hook-form";

interface InputProps {
    name: string;
    label: string;
    placeholder: string;
    register: UseFormRegister<FieldValues>;
    required?: boolean;
    error?: string;
}

export default function Inputs({ name, label, placeholder, register, required, error } : InputProps) {
    let type: string = "text";
    let pattern: RegExp = /^[0-9]+([,.][0-9]+)?$/;

    if (name === "hora") {
        type = "time";
        pattern = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
    }

    return (
        <div className="input-container">
            <label className="label" htmlFor={name}>
                {label}
            </label>
  
            <Input
                type={type}
                variant="filled"
                placeholder={placeholder}
                {...register(name, { required, pattern })}
            />
        
            {error && <p className="error">{error}</p>}
        </div>
    );
}
