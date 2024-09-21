import { ChangeEvent, InputHTMLAttributes, ReactNode } from "react"
import { RegisterOptions, useFormContext } from "react-hook-form"
import { clsx } from "clsx"

type Props = InputHTMLAttributes<HTMLSelectElement> & {
    name: string
    label: string
    children: ReactNode
    options?: RegisterOptions
    value?: string
    errorText?: string
    required?: boolean
    className?: string
    labelClassName?: string
    selectClassName?: string
    errorClassName?: string
}

export default function FormSelect({
    name,
    label,
    children,
    options,
    value,
    errorText,
    required = true,
    className,
    labelClassName,
    selectClassName,
    errorClassName,
    onChange,
    ...rest
}: Props) {
    const {
        register,
        formState: { errors },
        clearErrors,
        setValue,
    } = useFormContext()

    function onSelect(event: ChangeEvent<HTMLSelectElement>) {
        setValue(name, event.target.value)
        clearErrors(name)
    }

    return (
        <div className={className}>
            <label className="label">
                <span className={clsx("label-text text-center", labelClassName)}>{label}</span>
            </label>

            <select
                {...register(name, { required, value, ...options })}
                aria-invalid={errors[name] ? "true" : "false"}
                {...rest}
                onChange={(event) => {
                    onSelect(event)
                    onChange?.(event)
                }}
                className={clsx("select select-bordered w-full", selectClassName)}
            >
                {children}
            </select>

            {errors[name] && errorText && (
                <p className={clsx("text-red-500 mt-2 -mb-2", errorClassName)}>{errorText}</p>
            )}
        </div>
    )
}
