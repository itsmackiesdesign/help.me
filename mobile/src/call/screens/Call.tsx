import SosButton from "@call/components/SosButton.tsx"
import styled from "@emotion/native"
import { NavigationType } from "@core/types.ts"
import { Container, SafeArea, Scroll } from "@core/components/molecules"
import { windowWidth } from "@core/utils/demensions.ts"

const buttonHeight = {
    height: windowWidth * 0.5 - 20,
}

export default function Call({ navigation }: NavigationType) {
    const navigateContacts = () => navigation.navigate("ClosePeople", { isSettings: true })

    return (
        <Container>
            <SafeArea>
                <Scroll>
                    <SosButton />
                    <InfoText>Click SOS button if you need help</InfoText>

                    <Group>
                        <Button style={buttonHeight} onPress={navigateContacts}>
                            <ButtonText style={{ fontSize: 24 }}>Contacts</ButtonText>
                        </Button>

                        <Button style={buttonHeight}>
                            <ButtonText style={{ fontSize: 24 }}>Settings</ButtonText>
                        </Button>
                    </Group>
                </Scroll>
            </SafeArea>
        </Container>
    )
}

const InfoText = styled.Text`
    margin-vertical: 30px;
    font-size: 20px;
    text-align: center;
    font-weight: 600;
    color: ${(props) => props.theme.secondary};
`

const Group = styled.View`
    gap: 10px;
    flex-direction: row;
`

const Button = styled.TouchableOpacity`
    flex: 1;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
    border: 2px solid ${(props) => props.theme.primary};
`
const ButtonText = styled.Text`
    font-size: 16px;
    text-align: center;
    font-weight: 600;
    color: ${(props) => props.theme.secondary};
`
