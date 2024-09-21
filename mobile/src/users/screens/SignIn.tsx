import MaskedFormInput from "@core/components/atoms/MaskedFormInput.tsx"
import Button from "@core/components/molecules/Button.tsx"
import Header from "@core/components/atoms/Header.tsx"
import styled from "@emotion/native"
import { NavigationType } from "@core/types.ts"
import { ButtonText, Container, InputBox, inputStyle, SafeArea } from "@core/components/molecules"
import { FormProvider, useForm } from "react-hook-form"
import { phoneMask } from "@users/utils/regex.ts"
import { useTheme } from "@emotion/react"
import { useState } from "react"
import { Keyboard, Platform, TouchableWithoutFeedback } from "react-native"
import { SignInType } from "@users/types.ts"
import { useSignIn } from "@users/hooks/users.ts"

export default function SignIn({ navigation }: NavigationType) {
    const theme = useTheme()
    const methods = useForm<SignInType>()
    const [buttonDisabled, setButtonDisabled] = useState(true)

    const { mutateAsync, isLoading } = useSignIn()

    const handleChangeText = (text: string) => {
        setButtonDisabled(text.length !== 14)
    }

    const handleSubmit = async (data: SignInType) => {
        data.phone = "998" + data.phone
        await mutateAsync(data)
        navigation.navigate("ConfirmCode", { phone: data.phone })
        // navigation.navigate("Call")
    }

    return (
        <Container>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <SafeArea>
                    <Header title="Registration" showBackButton={false} />
                    <HeadingText>Please enter your phone number to create an account or sign in.</HeadingText>

                    <FormProvider {...methods}>
                        <InnerBlock>
                            <TouchableWithoutFeedback>
                                <InputBox>
                                    <PhoneCode>+998</PhoneCode>

                                    <MaskedFormInput
                                        name="phone"
                                        defaultValue=""
                                        onChangeText={handleChangeText}
                                        keyboardType="phone-pad"
                                        maxLength={14}
                                        placeholder="(00) 000-00-00"
                                        placeholderTextColor={theme.lightGray}
                                        style={[inputStyle, { color: theme.secondary }]}
                                        mask={phoneMask}
                                    />
                                </InputBox>
                            </TouchableWithoutFeedback>

                            <InfoText>A verification code will be sent to this number.</InfoText>
                        </InnerBlock>

                        <ButtonBlock behavior={"position"} keyboardVerticalOffset={Platform.OS === "ios" ? 50 : -150}>
                            <Button
                                onPress={methods.handleSubmit(handleSubmit)}
                                background={buttonDisabled || isLoading ? theme.secondary : theme.primary}
                                disabled={buttonDisabled || isLoading}
                            >
                                <ButtonText style={{ color: theme["base-100"] }}>
                                    {buttonDisabled ? "Enter phone" : "Send code"}
                                </ButtonText>
                            </Button>
                        </ButtonBlock>
                    </FormProvider>
                </SafeArea>
            </TouchableWithoutFeedback>
        </Container>
    )
}

const InnerBlock = styled.View`
    flex: 1;
    padding: 10px 5px;
    gap: 10px;
`

const HeadingText = styled.Text`
    font-size: 16px;
    font-weight: 500;
    margin-vertical: 10px;
    color: ${(props) => props.theme.secondary};
`

const InfoText = styled.Text`
    font-size: 14px;
    font-weight: 400;
    text-align: center;
    color: ${(props) => props.theme.secondary};
`

const PhoneCode = styled.Text`
    font-size: 18px;
    margin-top: 1px;
    color: ${(props) => props.theme.secondary};
`

const ButtonBlock = styled.KeyboardAvoidingView`
    width: 100%;
    position: absolute;
    bottom: 20px;
    padding: 0 5px;
`
