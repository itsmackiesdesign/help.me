import styled from "@emotion/native"
import { useTheme } from "@emotion/react"

type Props = {
    currentStep: number
}

const steps = ["Personal information", "Receiving", "Cleaning"]

export default function ProgressBar({ currentStep }: Props) {
    const theme = useTheme()

    return (
        <Container>
            <Progress>
                <ProgressLine style={{ width: `${(currentStep / steps.length) * 100 - 17}%` }} />
            </Progress>

            <StepsContainer>
                {steps.map((label, index) => {
                    const stepNumber = index + 1
                    return (
                        <StepWrapper key={stepNumber}>
                            <StepCircle
                                style={{
                                    backgroundColor: stepNumber <= currentStep ? theme.success : theme.lightGray,
                                }}
                            >
                                <StepText>{stepNumber}</StepText>
                            </StepCircle>
                            <Label>{label}</Label>
                        </StepWrapper>
                    )
                })}
            </StepsContainer>
        </Container>
    )
}

const Container = styled.View`
    margin-vertical: 20px;
`

const Progress = styled.View`
    height: 10px;
    background-color: #e0e0e0;
    border-radius: 5px;
    overflow: hidden;
    margin-bottom: 10px;
`

const ProgressLine = styled.View`
    height: 100%;
    background-color: ${(props) => props.theme.success};
`

const StepsContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

const StepWrapper = styled.View`
    flex: 1;
    flex-direction: column;
    align-items: center;
`

const StepCircle = styled.View`
    width: 30px;
    height: 30px;
    border-radius: 15px;
    justify-content: center;
    align-items: center;
`

const StepText = styled.Text`
    color: ${(props) => props.theme["base-100"]};
    font-weight: bold;
`

const Label = styled.Text`
    font-size: 12px;
    margin-top: 5px;
    color: ${(props) => props.theme.secondary};
`

const StepLine = styled.View`
    width: 30px;
    height: 2px;
    margin-top: 15px;
`
