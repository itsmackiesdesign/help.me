import { useParams } from "react-router-dom"
import Layout from "@core/components/Layout"
import { PhoneIcon } from '@heroicons/react/24/solid'
import Group from "@core/components/Group"
import { IdentificationIcon, UserIcon, CakeIcon, MapIcon, CheckCircleIcon } from '@heroicons/react/24/solid'
import Timeline from "@core/components/Timeline"
import { useFetch } from "@core/hooks/request"
import { CallType } from "@call/types"
import { CALL_DETAIL } from "@call/urls"
import { request } from "@core/utils/baseAxios"
import { formatDate } from "@core/utils/date"

export default function CallDetail() {
    const { id } = useParams<{ id: string }>()
    const call = useFetch<CallType>(["calls", id], () => request({ url: CALL_DETAIL.replace("{id}", id as string) }))

    const timelineItems = [
        { status: "Initiated 1", isStart: true },
        { status: "Initiated 2", isStart: true, isEnd: true },
        { status: "Initiated 3", isStart: true, isEnd: true },
        { status: "Initiated 4", isStart: true, isEnd: true },
        { status: "Initiated 5", isEnd: true },
    ]

    return (
        <Layout>
            <div className="relative h-96 rounded-lg shadow-lg overflow-hidden bg-base-200">
                <div className="absolute inset-0 h-full w-full">
                    <iframe
                        src={`https://www.google.com/maps?q=${call.data?.latitude},${call.data?.longitude}&z=15&output=embed`}
                        width="100%"
                        height="100%"
                        style={{ border: "0" }}
                        allowFullScreen
                        referrerPolicy="no-referrer-when-downgrade"
                        loading="lazy" />
                </div>
            </div>

            <Group className="w-full my-5 items-center justify-between p-4">
                <div className="w-full p-6 shadow-lg rounded-lg">
                    <h2 className="text-2xl font-bold flex items-center mb-4">
                        <IdentificationIcon className="w-6 h-6 mr-2 text-primary" />
                        {call.data?.member.user.firstName} {call.data?.member.user.lastName}
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center">
                            <PhoneIcon className="w-5 h-5 mr-2 text-gray-600" />

                            <p className="text-gray-700">
                                <strong>Phone:</strong> {call.data?.member.user.phone}
                            </p>
                        </div>

                        <div className="flex items-center">
                            <CakeIcon className="w-5 h-5 mr-2 text-gray-600" />

                            <p className="text-gray-700">
                                <strong>Birthdate:</strong> {formatDate(call.data?.member.birthdate as string)}
                            </p>
                        </div>

                        <div className="flex items-center">
                            <MapIcon className="w-5 h-5 mr-2 text-gray-600" />

                            <p className="text-gray-700">
                                <strong>Address:</strong> {call.data?.member.address}
                            </p>
                        </div>

                        <div className="flex items-center">
                            <CheckCircleIcon
                                className={`w-5 h-5 mr-2 text-green-600`}
                            />

                            <p className="text-gray-700">
                                <strong>Verified:</strong> <span className="text-green-600">Verified on {formatDate(call.data?.member.birthdate as string)}</span>
                            </p>
                        </div>

                        <div className="col-span-2 border p-3 rounded-lg border-info">
                            <div className="flex items-center ">
                                <CheckCircleIcon className="w-5 h-5 mr-2 text-gray-600" />

                                <p className="text-gray-700">
                                    <strong>Extra Info: </strong>
                                </p>
                            </div>

                            <p className="mt-2 text-gray-700 whitespace-pre-line break-words">
                                {call.data?.member.extra}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="w-full">
                    <Timeline items={timelineItems} />
                </div>
            </Group>
        </Layout>
    )
}