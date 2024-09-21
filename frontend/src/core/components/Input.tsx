import { clsx } from "clsx"

export type Props = {
    className?: string
    required?: boolean
    value?: string
    setValue?: () => void
    placeholder?: string
    type?: string
    name?: string
}

export default function Input({ value, setValue, placeholder, type, className, name }: Props) {
    return (
        <input
            className={clsx("input", className)}
            type={type}
            value={value}
            onChange={setValue}
            placeholder={placeholder}
            name={name}
        />
    )
}
