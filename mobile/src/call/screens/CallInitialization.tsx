import styled from "@emotion/native"
import GetLocation from "react-native-get-location"
import { useCallCreate } from "@call/hooks/calls.ts"
import { Container, SafeArea } from "@core/components/molecules"
import { ActivityIndicator } from "react-native"
import { useCallback } from "react"
import { useFocusEffect } from "@react-navigation/native"
import { NavigationType } from "@core/types.ts"

export default function CallInitialization({ navigation }: NavigationType) {
    const callCreate = useCallCreate()

    useFocusEffect(
        useCallback(() => {
            initialize()
        }, [])
    )

    const initialize = async () => {
        const { latitude, longitude } = await GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 60000,
        })

        const { id } = await callCreate.mutateAsync({ status: "initiated", latitude, longitude })
        navigation.navigate("VideoStream", { id })
    }

    return (
        <Container>
            <SafeArea>
                <LoadingWrapper>
                    <ActivityIndicator />
                </LoadingWrapper>
            </SafeArea>
        </Container>
    )
}

const LoadingWrapper = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`
