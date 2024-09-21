import AnimatedButton from "@core/components/molecules/AnimatedButton.tsx"
import { ReactNode } from "react"
import { PressableProps } from "react-native"
import { css } from "@emotion/native"
import { ButtonPressable } from "@core/components/molecules/index.ts"

type ButtonProps = {
    animated?: boolean
    background?: string
    borderRadius?: number
    disabled?: boolean
    children: ReactNode
} & PressableProps

const Button = ({
    animated = true,
    background,
    borderRadius = 8,
    disabled = false,
    children,
    ...rest
}: ButtonProps) => {
    const backgroundStyle = css`
        background-color: ${background};
    `

    if (animated && !disabled) {
        return (
            <AnimatedButton
                ButtonComponent={ButtonPressable}
                {...rest}
                style={[backgroundStyle, { borderRadius }]}
                disabled={disabled}
            >
                {children}
            </AnimatedButton>
        )
    }

    return (
        <ButtonPressable {...rest} style={[backgroundStyle, { borderRadius }]} disabled={disabled}>
            {children}
        </ButtonPressable>
    )
}

export default Button
