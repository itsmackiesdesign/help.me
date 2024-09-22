import styled from "@emotion/native"
import { EditSvg, TrashSvg, UserSvg } from "@core/assets/svgs"
import { ContactType } from "@users/types.ts"
import { useTheme } from "@emotion/react"
import { Alert } from "react-native"

type Props = {
    contact: ContactType
    setAddContact: (arg: boolean) => void
    setEditingContact: (arg: ContactType) => void
    onDelete: (id: number) => void
}

export default function ContactItem({ contact, setAddContact, setEditingContact, onDelete }: Props) {
    const theme = useTheme()

    const handleEdit = () => {
        setEditingContact(contact)
        setAddContact(true)
    }

    const handleDelete = () => {
        Alert.alert("You are deleting contact", "Are you sure?", [
            { text: "Cancel", style: "cancel" },
            { text: "Yes", onPress: () => onDelete(contact.id) },
        ])
    }

    return (
        <Contact>
            <UserSvg fill={theme.primary} />

            <ContactName numberOfLines={1} ellipsizeMode="tail">
                +{contact.phone} {contact.fullName}
            </ContactName>

            <Group>
                <Button onPress={handleEdit}>
                    <EditSvg color={theme.accent} />
                </Button>

                <Button onPress={handleDelete}>
                    <TrashSvg color={theme.error} />
                </Button>
            </Group>
        </Contact>
    )
}

const Contact = styled.View`
    width: 100%;
    padding: 10px;
    border: 1px solid ${(props) => props.theme.secondary};
    border-radius: 10px;
    flex-direction: row;
    gap: 10px;
    align-items: center;
    margin-bottom: 10px;
    background: ${(props) => props.theme.lightGray}30;
`

const ContactName = styled.Text`
    max-width: 60%;
    font-size: 18px;
    font-weight: 600;
    color: ${(props) => props.theme.secondary};
`

const Group = styled.View`
    flex: 1;
    flex-direction: row;
    justify-content: flex-end;
`

const Button = styled.TouchableOpacity`
    padding: 10px;
    border-radius: 10px;
`
