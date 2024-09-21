import { clsx } from "clsx"
import { ReactNode } from "react"
import Label from "@core/components/Label.tsx"

export type InputProps = JSX.IntrinsicElements["select"] & {
    children: ReactNode
    labelText?: string
    labelClassName?: string
    className?: string
}

export default function Select({ children, labelText, labelClassName, className, ...rest }: InputProps) {
    return (
        <Label text={labelText} className={labelClassName}>
            <select {...rest} className={clsx("select select-bordered w-full", className)}>
                {children}
            </select>
        </Label>
    )
}

export type OptionProps = JSX.IntrinsicElements["option"] & {
    children: ReactNode
    className?: string
    disabled?: boolean
    selected?: boolean
    value?: string
    setValue?: () => void
}

export function Option({ children, className, disabled, selected, value, setValue, ...rest }: OptionProps) {
    return (
        <option
            {...rest}
            className={clsx(className)}
            value={value}
            disabled={disabled}
            selected={selected}
            onClick={setValue}
        >
            {children}
        </option>
    )
}
