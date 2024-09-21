import { ButtonText, ButtonTouchable } from "@core/components/molecules/index.ts"

interface ButtonI {
    text: string
    onPress?: () => void
}

const Button = ({ text, onPress }: ButtonI) => {
    return (
        <ButtonTouchable onPress={onPress}>
            <ButtonText>{text}</ButtonText>
        </ButtonTouchable>
    )
}

export default Button
