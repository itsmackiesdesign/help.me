import RNPickerSelect from "react-native-picker-select"
import FormInput from "@core/components/molecules/FormInput.tsx"
import MaskedFormInput from "@core/components/atoms/MaskedFormInput.tsx"
import Button from "@core/components/molecules/Button.tsx"
import styled, { css } from "@emotion/native"
import { FormProvider, useForm } from "react-hook-form"
import { ButtonText, InputBox, InputLabel, inputStyle } from "@core/components/molecules"
import { useTheme } from "@emotion/react"
import { Fragment, useEffect, useState } from "react"
import { ContactCreateType, ContactRelationshipType } from "@users/types.ts"
import { relations } from "@users/utils/relations.ts"
import { phoneMask } from "@users/utils/regex.ts"

type Props = {
    onSubmit: (data: ContactCreateType) => void
}

export default function ClosePeopleForm({ onSubmit }: Props) {
    const theme = useTheme()
    const methods = useForm<ContactCreateType>()
    const [relation, setRelation] = useState<ContactRelationshipType>()
    const [buttonDisabled, setButtonDisabled] = useState(true)

    const isLoading = false

    const [phone, fullName] = methods.watch(["phone", "fullName"])

    useEffect(() => {
        setButtonDisabled(!phone || !fullName)
    }, [phone, fullName])

    const handleChangeText = (text: string) => {
        setButtonDisabled(text.length !== 14)
    }

    return (
        <FormProvider {...methods}>
            <RNPickerSelect
                onValueChange={(value) => setRelation(value)}
                items={relations}
                placeholder={{ label: "Choose relation", value: "" }}
                style={{
                    inputIOS: [inputStyle, { color: theme.secondary }],
                    inputAndroid: [inputStyle, { color: theme.secondary }],
                    inputIOSContainer: inputContainerStyle,
                    inputAndroidContainer: inputContainerStyle,
                }}
            />

            {relation && (
                <Fragment>
                    <InputLabel>Enter full name</InputLabel>

                    <InputBox>
                        <FormInput
                            name="fullName"
                            placeholder={`${relation[0].toUpperCase() + relation.slice(1)}'s full name`}
                            placeholderTextColor={theme.lightGray}
                            style={[inputStyle, { color: theme.secondary }]}
                        />
                    </InputBox>

                    <InputLabel>Enter his/her phone number</InputLabel>

                    <InputBox style={{ marginBottom: 20 }}>
                        <PhoneCode>+998</PhoneCode>

                        <MaskedFormInput
                            name="phone"
                            onChangeText={handleChangeText}
                            keyboardType="phone-pad"
                            maxLength={14}
                            placeholder="(00) 000-00-00"
                            placeholderTextColor={theme.lightGray}
                            style={[inputStyle, { color: theme.secondary }]}
                            mask={phoneMask}
                        />
                    </InputBox>

                    <Button
                        onPress={methods.handleSubmit(onSubmit)}
                        background={buttonDisabled || isLoading ? theme.secondary : theme.primary}
                        disabled={buttonDisabled || isLoading}
                    >
                        <ButtonText style={{ color: theme["base-100"] }}>
                            {buttonDisabled ? "Please fill in all fields" : "Add contact"}
                        </ButtonText>
                    </Button>
                </Fragment>
            )}
        </FormProvider>
    )
}

const inputContainerStyle = css`
    width: 100%;
    border-radius: 8px;
    border: 1px solid #37474f;
    padding: 5px 10px;
    margin-top: 15px;
    gap: 5px;
    align-items: center;
    flex-direction: row;
`

const PhoneCode = styled.Text`
    font-size: 18px;
    margin-top: 1px;
    color: ${(props) => props.theme.secondary};
`
