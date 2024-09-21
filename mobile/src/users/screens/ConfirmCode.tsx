import Header from "@core/components/atoms/Header.tsx"
import FormInput from "@core/components/molecules/FormInput.tsx"
import Button from "@core/components/molecules/Button.tsx"
import styled, { css } from "@emotion/native"
import { NavigationType } from "@core/types.ts"
import { useTheme } from "@emotion/react"
import { FormProvider, useForm } from "react-hook-form"
import { CheckInType } from "@users/types.ts"
import { Fragment, useState } from "react"
import { Keyboard, Platform, TouchableWithoutFeedback } from "react-native"
import { ButtonText, Container, InputLabel, SafeArea } from "@core/components/molecules"

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
        setButtonDisabled(text.length !== 5)
    }

    const handleSubmit = async (data: CheckInType) => {
        data = { ...data, phone }
        console.log(data)

        // const response = await mutateAsync(data)
        // storage.set("token", response.token)
        // storage.set("phone", response.user.phone)
        navigation.navigate("UserInformation")
    }

    return (
        <Container>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <SafeArea>
                    <Header title="Confirm code" />
                    <HeadingText>We’ve sent a 5-digit verification code to your phone number.</HeadingText>

                    <FormProvider {...methods}>
                        <InnerBlock>
                            <InputBox>
                                <PhoneText>{phone}</PhoneText>
                            </InputBox>

                            <TouchableWithoutFeedback>
                                <Fragment>
                                    <InputLabel>Code</InputLabel>

                                    <InputBox>
                                        <FormInput
                                            name="code"
                                            defaultValue=""
                                            onChangeText={handleChangeText}
                                            keyboardType="phone-pad"
                                            maxLength={5}
                                            placeholder="*****"
                                            placeholderTextColor={theme.lightGray}
                                            style={[inputStyle, { color: theme.secondary }]}
                                        />
                                    </InputBox>
                                </Fragment>
                            </TouchableWithoutFeedback>

                            <InfoText>A verification code will be sent to this number.</InfoText>
                        </InnerBlock>

                        <ButtonBlock behavior={"position"} keyboardVerticalOffset={Platform.OS === "ios" ? 100 : -150}>
                            <Button
                                onPress={methods.handleSubmit(handleSubmit)}
                                background={buttonDisabled || isLoading ? theme.secondary : theme.primary}
                                disabled={buttonDisabled || isLoading}
                            >
                                <ButtonText style={{ color: theme["base-100"] }}>Submit</ButtonText>
                            </Button>
                        </ButtonBlock>
                    </FormProvider>
                </SafeArea>
            </TouchableWithoutFeedback>
        </Container>
    )
}

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

const ButtonBlock = styled.KeyboardAvoidingView`
    width: 100%;
    position: absolute;
    bottom: 20px;
    padding: 0 5px;
`
