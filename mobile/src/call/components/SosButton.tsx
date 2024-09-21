import styled from "@emotion/native"
import { windowWidth } from "@core/utils/demensions.ts"

export default function SosButton() {
    return (
        <Wrapper>
            <Button style={{ width: windowWidth * 0.9, height: windowWidth * 0.9 }}>
                <ButtonText>SOS</ButtonText>
            </Button>
        </Wrapper>
    )
}

const Wrapper = styled.View`
    width: 100%;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
    margin-bottom: 20px;
`

const Button = styled.TouchableOpacity`
    border-radius: 400px;
    background: ${(props) => props.theme.primary};
    align-items: center;
    justify-content: center;
    border: 5px solid ${(props) => props.theme.error};
`

const ButtonText = styled.Text`
    font-size: 53px;
    font-weight: 700;
    text-align: center;
    color: ${(props) => props.theme.secondary};
`
