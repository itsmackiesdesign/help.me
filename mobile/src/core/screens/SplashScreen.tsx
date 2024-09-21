import styled from "@emotion/native"
import LoadingDots from "@core/components/atoms/LoadingDots"
import { useCallback } from "react"
import { useFocusEffect } from "@react-navigation/native"
import { NavigationType } from "@core/types.ts"
import { Container } from "@core/components/molecules"
import { checkAuth } from "@users/utils/auth.ts"

const duration = 2000

export default function SplashScreen({ navigation }: NavigationType) {
    useFocusEffect(
        useCallback(() => {
            setTimeout(() => {
                if (checkAuth()) {
                    navigation.replace("Call")
                } else {
                    navigation.replace("SignIn")
                }
            }, duration + 300)
        }, [navigation])
    )

    return (
        <Container>
            <Wrapper>
                <LogoText>Help me +</LogoText>

                <DotsWrapper>
                    <LoadingDots />
                </DotsWrapper>
            </Wrapper>
        </Container>
    )
}

const Wrapper = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    gap: 20px;
`

const LogoText = styled.Text`
    font-size: 42px;
    text-align: center;
    font-weight: 700;
    color: ${(props) => props.theme.primary};
`

const DotsWrapper = styled.View`
    width: 50px;
    height: 100px;
    margin-top: 50px;
`
