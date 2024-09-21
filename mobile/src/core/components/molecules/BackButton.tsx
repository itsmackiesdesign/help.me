import styled from "@emotion/native"
import { useNavigation } from "@react-navigation/native"
import { ViewStyle } from "react-native"
import { ArrowLeftSvg } from "@core/assets/svgs"
import { useTheme } from "@emotion/react"

type Props = {
    onPress?: () => void
    style?: ViewStyle
}

export default function BackButton({ onPress, style }: Props) {
    const theme = useTheme()
    const navigate = useNavigation()

    return (
        <Button onPress={() => onPress?.() || navigate.goBack()} style={style}>
            <ArrowLeftSvg width={32} height={32} color={theme.secondary} />
        </Button>
    )
}

const Button = styled.Pressable`
    width: 50px;
    padding: 10px;
    margin: -10px;
`
