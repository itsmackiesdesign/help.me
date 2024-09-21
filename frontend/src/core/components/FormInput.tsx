import { InputHTMLAttributes } from "react"
import { RegisterOptions, useFormContext } from "react-hook-form"
import { clsx } from "clsx"

type Props = InputHTMLAttributes<HTMLInputElement> & {
    name: string
    label: string
    options?: RegisterOptions
    value?: string
    errorText?: string
    patternErrorText?: string
    required?: boolean
    className?: string
    labelClassName?: string
    inputClassName?: string
    errorClassName?: string
}

const FormInput = ({
    name,
    label,
    options,
    value,
    errorText,
    patternErrorText,
    required = true,
    className,
    labelClassName,
    inputClassName,
    errorClassName,
    ...rest
}: Props) => {
    const {
        register,
        formState: { errors },
    } = useFormContext()

    return (
        <div className={className}>
            <label className="label">
                <span className={clsx("label-text text-center", labelClassName)}>{label}</span>
            </label>

            <input
                {...register(name, { required, value, ...options })}
                aria-invalid={errors[name] ? "true" : "false"}
                {...rest}
                className={clsx("input input-bordered w-full", inputClassName)}
            />

            {errors[name] && errorText && (
                <p className={clsx("text-red-500 mt-2 -mb-2", errorClassName)}>
                    {errors[name]?.type === "pattern" ? patternErrorText || "Not Valid" : errorText}
                </p>
            )}
        </div>
    )
}

export default FormInput
