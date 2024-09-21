import Icon from "@core/components/Icon.tsx"
import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import {
    CallControls,
    SpeakerLayout,
    StreamCall,
    StreamTheme,
    StreamVideo,
    StreamVideoClient,
} from "@stream-io/video-react-sdk"
import { UserIcon } from "@heroicons/react/24/solid"
// import { useEndStream } from "@academy/hooks/stream.ts"
// import VideoCallRecording from "@academy/components/VideoCallRecording.tsx"
import { StreamDataType } from "@call/types.ts"

type Props = {
    data: StreamDataType
}

const apiKey = import.meta.env.VITE_STREAM_ID

export default function VideoCallComponent({ data }: Props) {
    const { lessonId } = useParams()
    const navigate = useNavigate()
    // const { mutateAsync: endStream } = useEndStream(lessonId as string)
    console.log(apiKey)
    const client = new StreamVideoClient({ apiKey, user: { id: data.userId }, token: data.token })
    const call = client.call("default", data.callId)

    useEffect(() => {
        joinAndStartRecording()

        return () => {
            leaveAndStopRecording()
        }
        // eslint-disable-next-line
    }, [])

    const joinAndStartRecording = async () => {
        try {
            await call.join({ create: true })
        } catch (error) {
            // eslint-disable-next-line
            console.error("Error joining or starting recording:", error)
        }
    }

    const leaveAndStopRecording = async () => {
        try {
            await call.leave()
        } catch (error) {
            // eslint-disable-next-line
            console.error("Error leaving or stopping recording:", error)
        }
    }

    const handleClose = async () => {
        try {
            await call.endCall()
            // await endStream({})
            sessionStorage.removeItem(`stream-${lessonId}`)
            navigate(-1)
        } catch (error) {
            // eslint-disable-next-line
            console.error("Error ending call:", error)
        }
    }

    return (
        <StreamVideo client={client}>
            <StreamCall call={call}>
                <div className="w-full min-h-screen py-3 flex flex-col relative bg-black text-white">
                    <StreamTheme>
                        <SpeakerLayout
                            VideoPlaceholder={() => (
                                <div className="w-full h-full flex justify-center items-center bg-gray-800 absolute rounded-xl">
                                    <Icon icon={UserIcon} className="w-12 h-12 text-white" />
                                </div>
                            )}
                        />

                        <div className="absolute bottom-5 w-full flex justify-center">
                            <CallControls onLeave={handleClose} />
                        </div>
                    </StreamTheme>

                    {/*<VideoCallRecording />*/}
                </div>
            </StreamCall>
        </StreamVideo>
    )
}
