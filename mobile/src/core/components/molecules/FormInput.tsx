import styled from "@emotion/native"
import { Fragment } from "react"
import { TextInput, TextInputProps } from "react-native"
import { useFormContext, Controller, useController, FieldValues, RegisterOptions } from "react-hook-form"

type CustomRules =
    | Omit<RegisterOptions<FieldValues, string>, "disabled" | "setValueAs" | "valueAsNumber" | "valueAsDate">
    | undefined

type Props = {
    name: string
    defaultValue?: string
    rules?: CustomRules
    errorMessage?: string | undefined
    onChangeText?: (text: string) => void
} & TextInputProps

export default function FormInput({
    name,
    defaultValue = "",
    rules = {},
    errorMessage = "",
    onChangeText,
    ...rest
}: Props) {
    const { control, setValue } = useFormContext()
    const { field } = useController({
        control,
        defaultValue,
        name,
    })

    return (
        <Fragment>
            <Controller
                control={control}
                name={name}
                render={({ field: { onChange, onBlur } }) => (
                    <TextInput
                        {...rest}
                        onBlur={onBlur}
                        onChangeText={(value) => {
                            onChange(value)
                            setValue(name, value)
                            onChangeText?.(value)
                        }}
                        value={field.value}
                    />
                )}
                rules={rules}
            />
            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        </Fragment>
    )
}

const ErrorMessage = styled.Text`
    font-size: 14px;
    font-weight: 500;
    margin-top: 10px;
    color: ${(props) => props.theme.error};
`
