import Header from "@core/components/atoms/Header.tsx"
import FormInput from "@core/components/molecules/FormInput.tsx"
import Button from "@core/components/molecules/Button.tsx"
import DatePicker from "react-native-date-picker"
import ProgressBar from "@users/components/AuthorizationProgress.tsx"
import styled from "@emotion/native"
import { useEffect, useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { ButtonText, Container, InputBox, InputLabel, inputStyle, SafeArea, Scroll } from "@core/components/molecules"
import { useTheme } from "@emotion/react"
import { MemberCreateType } from "@users/types.ts"
import { NavigationType } from "@core/types.ts"
import { windowHeight } from "@core/utils/demensions.ts"
import { useMemberCreate } from "@users/hooks/member.ts"
import { formatDate } from "@core/utils/date.ts"
import { storage } from "@core/utils/storage.ts"

export default function MemberInformation({ navigation }: NavigationType) {
    const theme = useTheme()
    const methods = useForm<MemberCreateType>()
    const [buttonDisabled, setButtonDisabled] = useState(true)
    const [birthday, setBirthday] = useState<Date>()
    const [open, setOpen] = useState(false)

    const { mutateAsync, isLoading } = useMemberCreate()

    const [address] = methods.watch(["address"])

    useEffect(() => {
        setButtonDisabled(!address || !birthday)
    }, [address, birthday])

    const handleSubmit = async (data: MemberCreateType) => {
        if (!birthday) return
        const date = formatDate(birthday)
        const firstName = storage.getString("firstName")!
        const lastName = storage.getString("lastName")!
        data = { ...data, birthdate: date, firstName, lastName }

        await mutateAsync(data)

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
                        <Header title="Health information" showBackButton={false} />
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

const Wrapper = styled.View`
    width: 100%;
    padding-vertical: 10px;
    margin-bottom: 20px;
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
