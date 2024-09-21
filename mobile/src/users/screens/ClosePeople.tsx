import Header from "@core/components/atoms/Header.tsx"
import ProgressBar from "@users/components/AuthorizationProgress.tsx"
import ClosePeopleForm from "@users/components/ClosePeopleForm.tsx"
import styled from "@emotion/native"
import { Container, SafeArea, Scroll } from "@core/components/molecules"
import { windowHeight } from "@core/utils/demensions.ts"
import { ContactCreateType } from "@users/types.ts"

export default function ClosePeople() {
    const handleSubmit = async (data: ContactCreateType) => {
        const phone = "998" + data.phone
        data = { ...data, phone }
        console.log(data)
    }

    return (
        <Container>
            <SafeArea>
                <Scroll contentContainerStyle={{ minHeight: windowHeight * 0.9 }}>
                    <Header title="Family & Relationships" />
                    <ProgressBar currentStep={3} />

                    <Wrapper>
                        <Information>Add contact information of your close people</Information>
                        <ClosePeopleForm onSubmit={handleSubmit} />
                    </Wrapper>
                </Scroll>
            </SafeArea>
        </Container>
    )
}

const Wrapper = styled.View`
    width: 100%;
    padding-vertical: 10px;
    margin-bottom: 20px;
`

const Information = styled.Text`
    font-size: 16px;
    font-weight: 600;
    color: ${(props) => props.theme.secondary};
    text-align: center;
`
