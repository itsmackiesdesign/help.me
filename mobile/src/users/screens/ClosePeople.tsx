import { Container, SafeArea } from "@core/components/molecules"
import Header from "@core/components/atoms/Header.tsx"
import ProgressBar from "@users/components/AuthorizationProgress.tsx"

export default function ClosePeople() {
    return (
        <Container>
            <SafeArea>
                <Header title="Close People" />
                <ProgressBar currentStep={3} />
            </SafeArea>
        </Container>
    )
}
