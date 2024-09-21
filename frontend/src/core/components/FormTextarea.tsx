import { InputHTMLAttributes } from "react"
import { RegisterOptions, useFormContext } from "react-hook-form"
import { clsx } from "clsx"

type Props = InputHTMLAttributes<HTMLTextAreaElement> & {
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

export default function FormTextarea({
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
}: Props) {
    const {
        register,
        formState: { errors },
    } = useFormContext()

    return (
        <div className={className}>
            <label className="label">
                <span className={clsx("label-text text-center", labelClassName)}>{label}</span>
            </label>

            <textarea
                {...register(name, { required, value, ...options })}
                aria-invalid={errors[name] ? "true" : "false"}
                {...rest}
                className={clsx("textarea textarea-bordered w-full leading-5", inputClassName)}
            />

            {errors[name] && errorText && (
                <p className={clsx("text-red-500 mt-2 -mb-2", errorClassName)}>
                    {errors[name]?.type === "pattern" ? patternErrorText || "Not valid" : errorText}
                </p>
            )}
        </div>
    )
}
