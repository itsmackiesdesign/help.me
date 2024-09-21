import Header from "@core/components/atoms/Header.tsx"
import FormInput from "@core/components/molecules/FormInput.tsx"
import Button from "@core/components/molecules/Button.tsx"
import styled, { css } from "@emotion/native"
import { NavigationType } from "@core/types.ts"
import { useTheme } from "@emotion/react"
import { FormProvider, useForm } from "react-hook-form"
import { CheckInType } from "@users/types.ts"
import { useState } from "react"
import { Keyboard, Platform, TouchableWithoutFeedback } from "react-native"
import { Container } from "@core/components/molecules"

type Props = {
    route: { params: { phone: string } }
} & NavigationType

export default function ConfirmCode({ route, navigation }: Props) {
    const { phone } = route.params

    const theme = useTheme()
    const methods = useForm<CheckInType>()
    const [buttonDisabled, setButtonDisabled] = useState(true)
    const isLoading = false

    const handleChangeText = (text: string) => {
        setButtonDisabled(text.length !== 6)
    }

    const handleSubmit = async (data: CheckInType) => {
        data = { ...data, phone }
        console.log(data)

        // const response = await mutateAsync(data)
        // storage.set("token", response.token)
        // storage.set("phone", response.user.phone)
        navigation.navigate("Call")
    }

    return (
        <Container style={{ position: "relative" }}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <SafeArea>
                    <Header title="Confirm code" />

                    <HeadingText>We’ve sent a 6-digit verification code to your phone number.</HeadingText>

                    <InnerBlock>
                        <FormProvider {...methods}>
                            <InputBox>
                                <PhoneText>{phone}</PhoneText>
                            </InputBox>

                            <TouchableWithoutFeedback>
                                <InputBox>
                                    <FormInput
                                        name="code"
                                        defaultValue=""
                                        onChangeText={handleChangeText}
                                        keyboardType="phone-pad"
                                        maxLength={6}
                                        placeholder="******"
                                        placeholderTextColor={theme.lightGray}
                                        style={[inputStyle, { color: theme.secondary }]}
                                    />
                                </InputBox>
                            </TouchableWithoutFeedback>
                            <InfoText>A verification code will be sent to this number.</InfoText>

                            <ButtonBlock
                                behavior={"position"}
                                keyboardVerticalOffset={Platform.OS === "ios" ? 100 : -150}
                            >
                                <Button
                                    onPress={methods.handleSubmit(handleSubmit)}
                                    background={buttonDisabled || isLoading ? theme.secondary : theme.primary}
                                    disabled={buttonDisabled || isLoading}
                                >
                                    <SubmitText>Submit</SubmitText>
                                </Button>
                            </ButtonBlock>
                        </FormProvider>
                    </InnerBlock>
                </SafeArea>
            </TouchableWithoutFeedback>
        </Container>
    )
}

const SafeArea = styled.SafeAreaView`
    flex: 1;
`

const InputBox = styled.View`
    width: 100%;
    height: 40px;
    border-radius: 8px;
    border: 1px solid ${(props) => props.theme.secondary};
    padding: 0 10px;
    margin-top: 5px;
    gap: 5px;
    align-items: center;
    flex-direction: row;
`

const inputStyle = css`
    flex: 1;
    font-size: 18px;
    font-weight: 500;
    padding: 8px 0;
`

const PhoneText = styled.Text`
    color: ${(props) => props.theme.primary};
    ${inputStyle}
`

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

const SubmitText = styled.Text`
    font-size: 16px;
    font-weight: 500;
    margin: 12px;
    color: ${(props) => props.theme["base-100"]};
`

const ButtonBlock = styled.KeyboardAvoidingView`
    width: 100%;
    position: absolute;
    bottom: 20px;
    padding: 0 5px;
`
