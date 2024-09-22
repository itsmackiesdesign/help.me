import Button from "@core/components/molecules/Button.tsx"
import styled from "@emotion/native"
import SosCountDown from "@call/components/SosCountDown.tsx"
import { ButtonText, Container, SafeArea } from "@core/components/molecules"
import { NavigationType } from "@core/types.ts"
import { useState } from "react"

export default function SosPage({ navigation }: NavigationType) {
    const [disabled, setDisabled] = useState(false)

    const onTimeout = () => {
        if (disabled) return
        navigation.navigate("CallInitialization")
    }

    const onCancel = () => {
        setDisabled(true)
        navigation.goBack()
    }

    return (
        <Container>
            <SafeArea style={{ justifyContent: "space-evenly" }}>
                <Information>We will call an ambulance</Information>
                <SosCountDown onTimeout={onTimeout} />

                <Button onPress={onCancel}>
                    <ButtonText style={{ fontWeight: "bold" }}>Cancel</ButtonText>
                </Button>
            </SafeArea>
        </Container>
    )
}

const Information = styled.Text`
    text-align: center;
    font-size: 18px;
    color: ${(props) => props.theme.secondary};
`
