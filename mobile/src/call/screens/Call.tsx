import Header from "@core/components/atoms/Header.tsx"
import { NavigationType } from "@core/types.ts"
import { Container, SafeArea } from "@core/components/molecules"

export default function Call({ navigation }: NavigationType) {
    return (
        <Container>
            <SafeArea>
                <Header title="Call" showBackButton={false} />
            </SafeArea>
        </Container>
    )
}
