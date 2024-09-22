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
import { useMember, useMemberCreate, useMemberUpdate } from "@users/hooks/member.ts"
import { formatDate } from "@core/utils/date.ts"
import { storage } from "@core/utils/storage.ts"
import { ActivityIndicator } from "react-native"

type Props = {
    route: { params: { isSettings?: boolean } }
} & NavigationType

export default function MemberInformation({ route, navigation }: Props) {
    const { isSettings } = route.params

    const theme = useTheme()
    const methods = useForm<MemberCreateType>()
    const [buttonDisabled, setButtonDisabled] = useState(true)
    const [birthday, setBirthday] = useState<Date>()
    const [open, setOpen] = useState(false)

    const { data: member, isLoading: fetchLoading } = useMember(isSettings)
    const { mutateAsync, isLoading, error } = useMemberCreate()
    const { mutateAsync: update } = useMemberUpdate(member?.id as number)
    console.log(JSON.stringify(error, null, 2))
    useEffect(() => {
        if (!member || !isSettings) return
        setBirthday(new Date(member.birthdate))
        setButtonDisabled(false)
        methods.setValue("address", member.address)
        methods.setValue("extra", member.extra)
    }, [member, isSettings])

    const [address] = methods.watch(["address"])

    useEffect(() => {
        setButtonDisabled(!address || !birthday)
    }, [address, birthday])

    const handleSubmit = async (data: MemberCreateType) => {
        if (!birthday) return
        const date = formatDate(birthday)
        const firstName = storage.getString("firstName") as string
        const lastName = storage.getString("lastName") as string
        data = { ...data, birthdate: date, firstName, lastName }
        if (isSettings) return update(data)
        await mutateAsync(data)
        navigation.navigate("ClosePeople", { isSettings: false })
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
                        <Header title="Health information" showBackButton={isSettings} />
                        {!isSettings && <ProgressBar currentStep={2} />}

                        {fetchLoading ? (
                            <LoadingWrapper>
                                <ActivityIndicator />
                            </LoadingWrapper>
                        ) : (
                            <>
                                <Wrapper>
                                    <InputLabel>Address</InputLabel>

                                    <InputBox>
                                        <FormInput
                                            name="address"
                                            defaultValue={member?.address || ""}
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
                                            defaultValue={member?.extra || ""}
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
                                        {buttonDisabled ? "Enter your information" : isSettings ? "Save" : "Next"}
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
                            </>
                        )}
                    </FormProvider>
                </Scroll>
            </SafeArea>
        </Container>
    )
}

const LoadingWrapper = styled.View`
    width: 100%;
    justify-content: center;
    align-items: center;
`

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
