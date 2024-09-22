import styled from "@emotion/native"
import GetLocation from "react-native-get-location"
import { useCallCreate } from "@call/hooks/calls.ts"
import { Container, SafeArea } from "@core/components/molecules"
import { ActivityIndicator } from "react-native"
import { useCallback } from "react"
import { useFocusEffect } from "@react-navigation/native"
import { NavigationType } from "@core/types.ts"
import { showToast } from "@core/utils/toast.ts"

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

        showToast({ type: "success", title: "We received your location and contact information" })
        navigation.navigate("Call")
        // console.log(id)
        // navigation.navigate("VideoStream", { id })
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
