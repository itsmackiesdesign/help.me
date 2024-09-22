import { useEffect, useState } from "react"
import { StyleSheet, Text, View } from "react-native"
import { Call, StreamCall, useStreamVideoClient, CallContent } from "@stream-io/video-react-native-sdk"
import { NavigationType } from "@core/types.ts"

type Props = {
    callId: string
} & NavigationType

export const VideoStreamComponent = ({ callId, navigation }: Props) => {
    const [call, setCall] = useState<Call | null>(null)
    const client = useStreamVideoClient()

    useEffect(() => {
        if (!client) return

        const currentCall = client.call("default", callId)
        currentCall
            .join({ create: true })
            .then(() => setCall(currentCall))
            .catch((error) => {
                console.log("Failed to join the call:", error)
            })
    }, [client])

    const onHangupCall = async () => {
        await call?.endCall()
        // await endStream()
        navigation.navigate("Call")
    }

    if (!call) {
        return (
            <View style={joinStyles.container}>
                <Text style={styles.text}>Joining call...</Text>
            </View>
        )
    }

    return (
        <StreamCall call={call}>
            <View style={styles.container}>
                <CallContent onHangupCallHandler={onHangupCall} />
            </View>
        </StreamCall>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        position: "relative",
    },
    reactionWrapper: {
        position: "absolute",
        bottom: 80,
        right: 40,
    },
    text: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
        color: "#005fff",
    },
    chatImageWrapper: {
        position: "absolute",
        right: 40,
        bottom: 140,
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: "#f65275",
        justifyContent: "center",
        alignItems: "center",
        elevation: 2,
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
})

const joinStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        padding: 20,
    },
})

export default VideoStreamComponent
