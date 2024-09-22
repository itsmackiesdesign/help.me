import RNPickerSelect from "react-native-picker-select"
import FormInput from "@core/components/molecules/FormInput.tsx"
import MaskedFormInput from "@core/components/atoms/MaskedFormInput.tsx"
import Button from "@core/components/molecules/Button.tsx"
import styled, { css } from "@emotion/native"
import { FormProvider, useForm } from "react-hook-form"
import { ButtonText, InputBox, InputLabel, inputStyle } from "@core/components/molecules"
import { useTheme } from "@emotion/react"
import { Fragment, useEffect, useState } from "react"
import { ContactCreateType, ContactRelationshipType, ContactType } from "@users/types.ts"
import { relations } from "@users/utils/relations.ts"
import { phoneMask } from "@users/utils/regex.ts"
import { useContactCreate, useContactUpdate } from "@users/hooks/contact.ts"

type Props = {
    onSubmit: (data: ContactType) => void
    defaultValue?: ContactType
    onUpdate: (data: ContactType) => void
}

export default function ClosePeopleForm({ onSubmit, defaultValue, onUpdate }: Props) {
    const theme = useTheme()
    const methods = useForm<ContactCreateType>()
    const [relation, setRelation] = useState<ContactRelationshipType | undefined>(defaultValue?.relationship)
    const [buttonDisabled, setButtonDisabled] = useState(true)

    const contactCreate = useContactCreate()
    const contactUpdate = useContactUpdate(defaultValue?.id)
    const isLoading = contactCreate.isLoading || contactUpdate.isLoading

    const [phone, fullName] = methods.watch(["phone", "fullName"])

    useEffect(() => {
        setButtonDisabled(!phone || !fullName)
    }, [phone, fullName])

    useEffect(() => {
        if (!defaultValue) return
        setRelation(defaultValue.relationship)
    }, [defaultValue])

    const handleChangeText = (text: string) => {
        setButtonDisabled(text.length !== 14)
    }

    const handleSubmit = async (data: ContactCreateType) => {
        if (!relation) return
        data = { ...data, phone: "998" + data.phone, relationship: relation }

        if (!defaultValue) {
            const response = await contactCreate.mutateAsync(data)
            onSubmit(response)
            return
        }
        const response = await contactUpdate.mutateAsync(data)
        onUpdate(response)
    }

    return (
        <FormProvider {...methods}>
            <RNPickerSelect
                value={relation}
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
                            defaultValue={defaultValue?.fullName}
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
                            defaultValue={defaultValue?.phone.slice(3)}
                            keyboardType="phone-pad"
                            maxLength={14}
                            placeholder="(00) 000-00-00"
                            placeholderTextColor={theme.lightGray}
                            style={[inputStyle, { color: theme.secondary }]}
                            mask={phoneMask}
                        />
                    </InputBox>

                    <Button
                        onPress={methods.handleSubmit(handleSubmit)}
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
