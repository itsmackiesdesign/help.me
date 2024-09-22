import Header from "@core/components/atoms/Header.tsx"
import ProgressBar from "@users/components/AuthorizationProgress.tsx"
import ClosePeopleForm from "@users/components/ClosePeopleForm.tsx"
import ContactItem from "@users/components/ContactItem.tsx"
import styled from "@emotion/native"
import { ButtonText, Container, SafeArea, Scroll } from "@core/components/molecules"
import { windowHeight } from "@core/utils/demensions.ts"
import { useContactList } from "@users/hooks/contact.ts"
import { ActivityIndicator } from "react-native"
import { useTheme } from "@emotion/react"
import { Fragment, useEffect, useState } from "react"
import { ContactType } from "@users/types.ts"

type Props = {
    route: { params: { isSettings?: boolean } }
}

export default function ClosePeople({ route }: Props) {
    const { isSettings } = route.params

    const theme = useTheme()
    const [addContact, setAddContact] = useState(true)
    const [editingContact, setEditingContact] = useState<ContactType>()

    const { data: contacts, isLoading, addItem, updateItem, deleteItem } = useContactList()
    const hasContacts = contacts && contacts.results.length > 0

    useEffect(() => {
        setAddContact(contacts ? contacts.results.length < 0 : true)
    }, [contacts])

    const handleCreate = (data: ContactType) => {
        addItem(data)
        setAddContact(false)
    }

    const handleUpdate = (data: ContactType) => {
        updateItem(data)
        setAddContact(false)
    }

    const handleDelete = (id: number) => {
        deleteItem(id)
        setAddContact(false)
    }

    return (
        <Container>
            <SafeArea>
                <Scroll contentContainerStyle={{ minHeight: windowHeight * 0.9 }}>
                    <Header
                        title="Family & Relationships"
                        showBackButton={isSettings}
                        style={{ marginBottom: isSettings ? 20 : 0 }}
                    />

                    {!isSettings && <ProgressBar currentStep={3} />}

                    {isLoading ? (
                        <LoadingWrapper>
                            <ActivityIndicator />
                        </LoadingWrapper>
                    ) : hasContacts && !addContact ? (
                        <Fragment>
                            {contacts.results.map((contact) => (
                                <ContactItem
                                    contact={contact}
                                    key={contact.id}
                                    setAddContact={setAddContact}
                                    setEditingContact={setEditingContact}
                                    onDelete={handleDelete}
                                />
                            ))}
                            <Group>
                                <Button onPress={() => setAddContact(true)}>
                                    <ButtonText>Add more</ButtonText>
                                </Button>

                                {!isSettings && (
                                    <Button style={{ backgroundColor: theme.success }}>
                                        <ButtonText>Save and continue</ButtonText>
                                    </Button>
                                )}
                            </Group>
                        </Fragment>
                    ) : (
                        <Wrapper>
                            <Information>Add contact information of your close people</Information>
                            <ClosePeopleForm
                                onSubmit={handleCreate}
                                defaultValue={editingContact}
                                onUpdate={handleUpdate}
                            />
                        </Wrapper>
                    )}
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

const LoadingWrapper = styled.View`
    width: 100%;
    justify-content: center;
    align-items: center;
`

const Group = styled.View`
    width: 100%;
    flex-direction: row;
    gap: 10px;
    align-items: center;
    margin-top: 20px;
`

const Button = styled.Pressable`
    flex: 1;
    background-color: ${(props) => props.theme.primary};
    padding: 15px;
    border-radius: 10px;
    align-items: center;
    justify-content: center;
`
