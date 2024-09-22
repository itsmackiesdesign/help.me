import { useParams } from "react-router-dom"
import Layout from "@core/components/Layout"
import { PhoneIcon } from "@heroicons/react/24/solid"
import Group from "@core/components/Group"
import { IdentificationIcon, CakeIcon, MapIcon, CheckCircleIcon } from '@heroicons/react/24/solid'
import { useFetch } from "@core/hooks/request"
import { CallType } from "@call/types"
import { CALL_DETAIL } from "@call/urls"
import { request } from "@core/utils/baseAxios"
import { formatDate } from "@core/utils/date"
import Button from "@core/components/Button"
import Badge from "@core/components/Badge"
import { useMutate } from "@core/hooks/request"
import { ClipboardIcon } from "@heroicons/react/24/outline"
import { MemberDetailType } from "@members/types"
import { MEMBER_DETAIL } from "@members/urls"
import { ContactType } from "@members/types"
import Heading from "@core/components/Heading"

export default function CallDetail() {
    const { id } = useParams<{ id: string }>()
    const call = useFetch<CallType>(["calls", id], () => request({ url: CALL_DETAIL.replace("{id}", id as string) }))
    const member = useFetch<MemberDetailType>(["members", id], () => request({ url: MEMBER_DETAIL.replace("{id}", id as string) }))

    const status = {
        initiated: "initiated",
        called: "Called",
        canceled: "Canceled",
        ambulance_requested: "Ambulance Requested",
        finished: "Finished",
    }

    const handleRequestAmbulance = useMutate(
        (data) => request({ url: CALL_DETAIL.replace("{id}", id as string), method: "PUT", data }),
        {
            onSuccess: () => {
                call.refetch()
            },
        }
    )

    return (
        <Layout>
            <div className="relative h-[55vh] rounded-lg shadow-lg overflow-hidden bg-base-200">
                <div className="absolute inset-0 h-full w-full">
                    <iframe
                        src={`https://www.google.com/maps?q=${call.data?.latitude},${call.data?.longitude}&z=15&output=embed`}
                        width="100%"
                        height="100%"
                        style={{ border: "0" }}
                        allowFullScreen
                        referrerPolicy="no-referrer-when-downgrade"
                        loading="lazy"
                    />
                </div>
            </div>

            <Group className="w-full my-5 p-4">
                <div className="w-1/2 p-6 shadow-lg rounded-lg min-h-min">
                    <h2 className="text-2xl font-bold flex items-center mb-4">
                        {call.data?.member.user.firstName} {call.data?.member.user.lastName}
                        <Button 
                            size="sm" 
                            className="ml-2 bg-primary text-white"
                            onClick={() => handleRequestAmbulance.mutate({ status: "ambulance_requested" })}
                            disabled={call.data?.status === "ambulance_requested"}
                        >
                            Request Ambulance
                        </Button>
                        <Button 
                            size="sm" 
                            className="ml-2"
                            onClick={() => navigator.clipboard.writeText(`https://www.google.com/maps?q=${call.data?.latitude},${call.data?.longitude}`)}
                        >
                            <ClipboardIcon className="w-5 h-5 text-gray-600" />
                            Copy address
                        </Button>
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center">
                            <PhoneIcon className="w-5 h-5 mr-2 text-gray-600" />

                            <p className="text-gray-700">
                                <strong>Phone:</strong> {call.data?.member.user.phone}
                            </p>
                        </div>

                        <div className="flex items-center">
                            <IdentificationIcon className="w-5 h-5 mr-2 text-gray-600" />

                            <p className="text-gray-700">
                                <strong>Status:</strong> <Badge size="sm" className="ml-2 bg-primary text-white p-3 border-none" content={status[call.data?.status as keyof typeof status]} />
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

                <div className="w-1/2">
                    <Heading size="xl">Relatives</Heading>
                    <Group className="flex-wrap flex-row">
                        {member.data?.contacts.map((item: ContactType) => (
                            <div key={item.id} className="p-3 shadow-lg rounded-lg">
                                <p className="text-gray-700 flex gap-2"><strong>Full Name:</strong> {item.fullName}</p>
                                <p className="text-gray-700 flex gap-2"><strong>Phone:</strong> <a className="link" href={`tel:${item.phone}`}>{item.phone}</a></p>
                                <p className="text-gray-700 flex gap-2"><strong>Relationship:</strong> {item.relationship}</p>
                            </div>
                        ))}
                    </Group>
                </div>
            </Group>
        </Layout>
    )
}
