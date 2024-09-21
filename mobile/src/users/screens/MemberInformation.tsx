import Header from "@core/components/atoms/Header.tsx"
import FormInput from "@core/components/molecules/FormInput.tsx"
import Button from "@core/components/molecules/Button.tsx"
import DatePicker from "react-native-date-picker"
import ProgressBar from "@users/components/AuthorizationProgress.tsx"
import styled, { css } from "@emotion/native"
import { useEffect, useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { ButtonText, Container, InputLabel, SafeArea, Scroll } from "@core/components/molecules"
import { useTheme } from "@emotion/react"
import { MemberType } from "@users/types.ts"
import { NavigationType } from "@core/types.ts"
import { windowHeight } from "@core/utils/demensions.ts"

export default function MemberInformation({ navigation }: NavigationType) {
    const theme = useTheme()
    const methods = useForm<MemberType>()
    const [buttonDisabled, setButtonDisabled] = useState(true)
    const [birthday, setBirthday] = useState<Date>()
    const [open, setOpen] = useState(false)

    const isLoading = false

    const [address] = methods.watch(["address"])

    useEffect(() => {
        setButtonDisabled(!address || !birthday)
    }, [address, birthday])

    const handleSubmit = async (data: MemberType) => {
        if (!birthday) return
        data = { ...data, birthdate: birthday }
        console.log(data)
        navigation.navigate("ClosePeople")
    }

    const handleDatePick = (data: Date) => {
        setBirthday(data)
        setOpen(false)
    }

    return (
        <Container>
            <SafeArea>
                <Scroll contentContainerStyle={{ minHeight: windowHeight * 0.9 }}>
                    <FormProvider {...methods}>
                        <Header title="address" />
                        <ProgressBar currentStep={2} />

                        <Wrapper>
                            <InputLabel>Address</InputLabel>

                            <InputBox>
                                <FormInput
                                    name="address"
                                    defaultValue=""
                                    placeholder="Uzbekistan, Tashkent, Olmazor..."
                                    placeholderTextColor={theme.lightGray}
                                    style={[inputStyle, { color: theme.secondary }]}
                                />
                            </InputBox>

                            <InputLabel>Birthday</InputLabel>

                            <InputBox>
                                <DateButton onPress={() => setOpen(true)}>
                                    <DateText style={{ color: birthday ? theme.secondary : theme.lightGray }}>
                                        {!birthday ? "00/00/0000" : birthday.toLocaleDateString()}
                                    </DateText>
                                </DateButton>
                            </InputBox>

                            <InputLabel>About health</InputLabel>

                            <InputBox>
                                <FormInput
                                    name="extra"
                                    multiline
                                    defaultValue=""
                                    placeholder="possible diseases or health and problems etc."
                                    placeholderTextColor={theme.lightGray}
                                    style={[inputStyle, { color: theme.secondary, minHeight: 100 }]}
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

                        <DatePicker
                            modal
                            theme="light"
                            mode="date"
                            open={open}
                            date={birthday || new Date()}
                            onConfirm={handleDatePick}
                            onCancel={() => setOpen(false)}
                        />
                    </FormProvider>
                </Scroll>
            </SafeArea>
        </Container>
    )
}

const InputBox = styled.View`
    width: 100%;
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

const DateButton = styled.Text`
    flex: 1;
    padding: 8px 0;
`

const DateText = styled.Text`
    font-size: 18px;
    font-weight: 500;
    background: ${(props) => props.theme["base-100"]};
`
