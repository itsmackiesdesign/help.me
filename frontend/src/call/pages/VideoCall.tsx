import "@stream-io/video-react-sdk/dist/css/styles.css"

import Loader from "@core/components/Loader.tsx"
import { useEffect, useState } from "react"
import { StreamDataType } from "@call/types.ts"
import VideoCallComponent from "@call/components/VideoCallComponent.tsx"
import { useStartStream } from "@call/hooks/calls.ts"
import { useParams } from "react-router-dom"
import { stringifyJSON } from "@core/utils/json.ts"

export default function VideoCall() {
    const { id } = useParams()
    const [data, setData] = useState<StreamDataType | null>({
        callId: "test1",
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiT3BlcmF0b3IifQ.mkUhX8s-Ddl-mo5T-sc5dsHM9rD_847otf7amfBVO-o",
        userId: "Operator",
    })
    const { mutateAsync: startStream } = useStartStream(id as string)
    useEffect(() => {
        if (data) return
        startStream({}).then((res) => {
            setData(res)
            sessionStorage.setItem(`stream-${id}`, stringifyJSON(res))
        })
        // eslint-disable-next-line
    }, [])

    // parseJSON(sessionStorage.getItem(`stream-${lessonId}`) || "null")

    // const { mutateAsync: startStream } = useStartStream(lessonId as string)
    //
    // useEffect(() => {
    //     if (data) return
    //     startStream({}).then((res) => {
    //         setData(res)
    //         sessionStorage.setItem(`stream-${lessonId}`, stringifyJSON(res))
    //     })
    //     // eslint-disable-next-line
    // }, [])

    if (!data) {
        return (
            <div className="w-full h-screen flex justify-center items-center bg-base-100">
                <Loader size="lg" />
            </div>
        )
    }

    return <VideoCallComponent data={data} />
}
