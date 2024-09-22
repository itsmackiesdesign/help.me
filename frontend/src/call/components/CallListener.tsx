import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function CallListener() {
    const [myData, setMyData] = useState(null)
    console.log(myData)
    const navigate = useNavigate()

    useEffect(() => {
        const headers = new Headers({
            Accept: "text/event-stream;charset=UTF-8",
            Authorization: `Token ${localStorage.getItem("token")}`,
        })
        const options = { headers, credentials: true, withCredentials: true }
        const source = new EventSource(
            `https://helpme-33ryw.ondigitalocean.app/api/v1/calls/call-event-stream/?authentication_token=${localStorage.getItem(
                "token"
            )}`,
            options
        )
        source.onmessage = (event) => {
            const data = JSON.parse(event.data)
            setMyData(data)
            navigate("/calls/video-call/" + data[0].id)
        }

        return () => source.close()
    }, [])

    return <div></div>
}
