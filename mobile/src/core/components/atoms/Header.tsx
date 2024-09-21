import styled from "@emotion/native"
import BackButton from "@core/components/molecules/BackButton.tsx"
import { ViewStyle } from "react-native"

type Props = {
    style?: ViewStyle
    showBackButton?: boolean
    title: string
}

export default function Header({ style, showBackButton = true, title }: Props) {
    return (
        <Wrapper style={style}>
            {showBackButton && <BackButton style={{ position: "absolute", left: 0 }} />}
            <Title>{title}</Title>
        </Wrapper>
    )
}

const Wrapper = styled.View`
    width: 100%;
    height: 50px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    position: relative;
`

const Title = styled.Text`
    font-size: 20px;
    font-weight: 600;
    text-align: center;
    color: ${(props) => props.theme.primary};
`
