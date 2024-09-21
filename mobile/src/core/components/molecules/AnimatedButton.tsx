import { ReactNode, useState } from "react"
import { Animated, PressableProps } from "react-native"
import { StyledComponent } from "@emotion/native"

type AnimatedButtonProps = {
    ButtonComponent: StyledComponent<PressableProps>
    disabled: boolean
    children: ReactNode
} & PressableProps

const AnimatedButton = ({ ButtonComponent, disabled, children, ...rest }: AnimatedButtonProps) => {
    const [scaleValue] = useState(new Animated.Value(1))

    const handlePressIn = () => {
        Animated.spring(scaleValue, {
            toValue: 0.95,
            useNativeDriver: true,
        }).start()
    }

    const handlePressOut = () => {
        Animated.spring(scaleValue, {
            toValue: 1,
            friction: 10,
            tension: 100,
            useNativeDriver: true,
        }).start()
    }

    return (
        <Animated.View style={{ transform: [{ scale: scaleValue }], width: "100%" }}>
            <ButtonComponent {...rest} onPressIn={handlePressIn} onPressOut={handlePressOut} disabled={disabled}>
                {children}
            </ButtonComponent>
        </Animated.View>
    )
}

export default AnimatedButton
