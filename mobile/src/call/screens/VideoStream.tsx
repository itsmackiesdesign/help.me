import VideoStreamComponent from "@call/components/VideoStreamComponent.tsx"
import { ActivityIndicator, SafeAreaView, StyleSheet } from "react-native"
import { StreamVideo, StreamVideoClient } from "@stream-io/video-react-native-sdk"
import { useEffect, useState } from "react"
import { NavigationType } from "@core/types.ts"
import { API_STREAM_ID } from "@env"
import { useCallJoinStream } from "@call/hooks/calls.ts"
import { JoinStreamType } from "@call/types.ts"

type Props = {
    route: { params: { id: number } }
} & NavigationType

const apiKey = API_STREAM_ID

export default function VideoStream({ route, navigation }: Props) {
    const { id } = route.params
    const [data, setData] = useState<JoinStreamType | null>(null)
    const { mutateAsync } = useCallJoinStream(id)

    useEffect(() => {
        mutateAsync().then(setData)
    }, [])

    if (!data) {
        return (
            <SafeAreaView style={styles.container}>
                <ActivityIndicator />
            </SafeAreaView>
        )
    }

    const { userId, callId, token } = data
    const client = new StreamVideoClient({ apiKey, user: { id: userId }, token })

    return (
        <StreamVideo client={client}>
            <SafeAreaView style={styles.container}>
                <VideoStreamComponent callId={callId} navigation={navigation} />
            </SafeAreaView>
        </StreamVideo>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        textAlign: "center",
        backgroundColor: "#000000",
    },
})
