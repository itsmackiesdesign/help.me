import styled from "@emotion/native"
import Svg, { Circle } from "react-native-svg"
import { useState, useEffect } from "react"
import { useTheme } from "@emotion/react"

type Props = {
    onTimeout: () => void
}

const CountdownCircle = ({ onTimeout }: Props) => {
    const theme = useTheme()
    const [count, setCount] = useState(10)

    useEffect(() => {
        if (count > 0) {
            const timer = setTimeout(() => {
                setCount(count - 1)
            }, 1000)
            return () => clearTimeout(timer)
        }
        onTimeout()
    }, [count])

    const radius = 100
    const circumference = 2 * Math.PI * radius
    const strokeDashoffset = circumference - (count / 10) * circumference

    return (
        <Container>
            <Svg width={240} height={240}>
                <Circle stroke="#e6e6e6" fill="none" cx="120" cy="120" r={radius} strokeWidth="10" />

                <Circle
                    stroke={theme.primary}
                    fill="none"
                    cx="120"
                    cy="120"
                    r={radius}
                    strokeWidth="10"
                    strokeDasharray={`${circumference}, ${circumference}`}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                />
            </Svg>
            <Text>{count}</Text>
        </Container>
    )
}

const Container = styled.View`
    justify-content: center;
    align-items: center;
    margin-top: 50px;
`

const Text = styled.Text`
    position: absolute;
    font-size: 48px; /* Increased font size to match larger circle */
    font-weight: bold;
    color: ${(props) => props.theme.primary};
`

export default CountdownCircle
