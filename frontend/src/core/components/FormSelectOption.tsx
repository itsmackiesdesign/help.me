import { ChangeEvent, useEffect } from "react"
import { useFormContext, Controller } from "react-hook-form"
import { clsx } from "clsx"

type Props<Item> = {
    name: string
    label: string
    options?: Item[]
    optionValue?: string
    optionLabel?: string | ((item: Item) => string)
    loading?: boolean
    empty?: boolean
    optional?: boolean
    help?: string
    className?: string
    labelClassName?: string
    selectClassName?: string
    errorClassName?: string
    required?: boolean
    errorText?: string
    onChange?: (event: ChangeEvent<HTMLSelectElement>) => void
}

export default function FormSelectOption<Item>({
    name,
    label,
    options = [],
    optionValue = "id",
    optionLabel = "name",
    loading = false,
    empty = false,
    optional = false,
    help,
    className,
    labelClassName,
    selectClassName,
    errorClassName,
    required = true,
    errorText,
    onChange: onChangeEvent,
    ...attributes
}: Props<Item>) {
    const {
        control,
        setValue,
        watch,
        clearErrors,
        formState: { errors, touchedFields },
    } = useFormContext()
    const value = watch(name)
    const error = errors[name]
    const touch = touchedFields[name]

    useEffect(() => {
        if (!empty && !value && options.length > 0) {
            setValue(name, options[0][optionValue as keyof Item])
        }
    }, [options, value, empty, setValue, name, optionValue])

    function onSelect(event: ChangeEvent<HTMLSelectElement>) {
        setValue(name, event.target.value)
        clearErrors(name)
    }

    return (
        <div className={clsx("form-control w-full", className)}>
            {label && (
                <label className="label">
                    <span className={clsx("label-text", labelClassName)}>
                        {label} {optional && <span className="text-xs text-gray-400">(optional)</span>}
                    </span>
                </label>
            )}

            <Controller
                name={name}
                control={control}
                rules={{ required }}
                render={({ field }) => (
                    <select
                        {...field}
                        {...attributes}
                        aria-invalid={error ? "true" : "false"}
                        onChange={(event) => {
                            onSelect(event)
                            field.onChange(event)
                            onChangeEvent?.(event)
                        }}
                        className={clsx("select select-bordered w-full", selectClassName, {
                            "select-disabled": loading,
                        })}
                    >
                        {empty && <option value="" />}
                        {options.map((item) => (
                            <option
                                key={item[optionValue as keyof Item] as unknown as string}
                                value={item[optionValue as keyof Item] as unknown as string}
                            >
                                {typeof optionLabel === "function"
                                    ? optionLabel(item)
                                    : (item[optionLabel as keyof Item] as unknown as string)}
                            </option>
                        ))}
                    </select>
                )}
            />

            {error && touch && (
                <p className={clsx("text-red-500 mt-2 -mb-2", errorClassName)}>
                    {errorText || (error.message as string)}
                </p>
            )}

            {help && (!error || !touch) && <p className="text-sm text-gray-500">{help}</p>}
        </div>
    )
}
