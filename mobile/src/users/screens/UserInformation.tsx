import Header from "@core/components/atoms/Header.tsx"
import FormInput from "@core/components/molecules/FormInput.tsx"
import Button from "@core/components/molecules/Button.tsx"
import ProgressBar from "@users/components/AuthorizationProgress.tsx"
import styled from "@emotion/native"
import { useEffect, useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { ButtonText, Container, InputBox, InputLabel, inputStyle, SafeArea, Scroll } from "@core/components/molecules"
import { useTheme } from "@emotion/react"
import { UserType } from "@users/types.ts"
import { NavigationType } from "@core/types.ts"
import { windowHeight } from "@core/utils/demensions.ts"
import { useUserUpdate } from "@users/hooks/users.ts"
import { storage } from "@core/utils/storage.ts"

export default function UserInformation({ navigation }: NavigationType) {
    const theme = useTheme()
    const methods = useForm<UserType>()
    const [buttonDisabled, setButtonDisabled] = useState(true)

    const { mutateAsync, isLoading } = useUserUpdate()

    const [firstName, lastName] = methods.watch(["firstName", "lastName"])

    useEffect(() => {
        setButtonDisabled(!firstName || !lastName)
    }, [firstName, lastName])

    const handleSubmit = async (data: UserType) => {
        const response = await mutateAsync(data)
        storage.set("firstName", response.firstName)
        storage.set("lastName", response.lastName)

        navigation.navigate("MemberInformation", { isSettings: false })
    }

    return (
        <Container>
            <SafeArea>
                <Scroll contentContainerStyle={{ minHeight: windowHeight * 0.9 }}>
                    <FormProvider {...methods}>
                        <Header title="Personal information" showBackButton={false} />
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

const Wrapper = styled.View`
    width: 100%;
    padding-vertical: 10px;
    margin-bottom: 20px;
`
