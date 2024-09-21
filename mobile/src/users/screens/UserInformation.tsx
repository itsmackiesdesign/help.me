import Header from "@core/components/atoms/Header.tsx"
import FormInput from "@core/components/molecules/FormInput.tsx"
import Button from "@core/components/molecules/Button.tsx"
import ProgressBar from "@users/components/AuthorizationProgress.tsx"
import styled, { css } from "@emotion/native"
import { useEffect, useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { ButtonText, Container, InputLabel, SafeArea, Scroll } from "@core/components/molecules"
import { useTheme } from "@emotion/react"
import { UserType } from "@users/types.ts"
import { NavigationType } from "@core/types.ts"

export default function UserInformation({ navigation }: NavigationType) {
    const theme = useTheme()
    const methods = useForm<UserType>()
    const [buttonDisabled, setButtonDisabled] = useState(true)
    const isLoading = false

    const [firstName, lastName] = methods.watch(["firstName", "lastName"])

    useEffect(() => {
        setButtonDisabled(!firstName || !lastName)
    }, [firstName, lastName])

    const handleSubmit = async (data: UserType) => {
        console.log(data)
        navigation.navigate("MemberInformation")
    }

    return (
        <Container>
            <SafeArea>
                <Scroll>
                    <FormProvider {...methods}>
                        <Header title="User Information" showBackButton={false} />
                        <ProgressBar currentStep={1} />

                        <Wrapper>
                            <InputLabel>First name</InputLabel>

                            <InputBox>
                                <FormInput
                                    name="firstName"
                                    defaultValue=""
                                    placeholder="Enter your first name"
                                    placeholderTextColor={theme.lightGray}
                                    style={[inputStyle, { color: theme.secondary }]}
                                />
                            </InputBox>

                            <InputLabel>Last name</InputLabel>

                            <InputBox>
                                <FormInput
                                    name="lastName"
                                    defaultValue=""
                                    placeholder="Enter your last name"
                                    placeholderTextColor={theme.lightGray}
                                    style={[inputStyle, { color: theme.secondary }]}
                                />
                            </InputBox>
                        </Wrapper>

                        <Button
                            onPress={methods.handleSubmit(handleSubmit)}
                            background={buttonDisabled || isLoading ? theme.secondary : theme.primary}
                            disabled={buttonDisabled || isLoading}
                        >
                            <ButtonText style={{ color: theme["base-100"] }}>
                                {buttonDisabled ? "Enter your information" : "Next"}
                            </ButtonText>
                        </Button>
                    </FormProvider>
                </Scroll>
            </SafeArea>
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

const Wrapper = styled.View`
    width: 100%;
    padding-vertical: 10px;
    margin-bottom: 20px;
`

const inputStyle = css`
    flex: 1;
    font-size: 18px;
    font-weight: 500;
    padding: 8px 0;
`
