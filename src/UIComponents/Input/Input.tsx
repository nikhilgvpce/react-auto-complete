import { ChangeEventHandler, FC, InputHTMLAttributes } from "react"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    placeholder: string,
    value: string,
    disabled?: boolean,
    onChange: ChangeEventHandler<HTMLInputElement>
}

const Input:FC<InputProps> = ({ placeholder, value, onChange, disabled }) => {
    return (
        <input placeholder={placeholder} disabled={disabled} value={value} onChange={onChange} />
    )
}

export default Input