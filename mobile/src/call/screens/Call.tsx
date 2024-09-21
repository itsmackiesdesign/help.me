import Button from "@core/components/molecules/Button.tsx"
import { NavigationType } from "@core/types.ts"
import { Container } from "@core/components/molecules"

const Call = ({ navigation }: NavigationType) => {
    return (
        <Container>
            <Button text="Toggle theme" />
        </Container>
    )
}

export default Call
