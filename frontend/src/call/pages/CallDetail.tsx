import { useParams } from "react-router-dom"
import Layout from "@core/components/Layout"
import AvatarUser from "@core/components/AvatarUser"
import { PhoneIcon } from '@heroicons/react/24/solid'
import Heading from "@core/components/Heading"
import Group from "@core/components/Group"
import { IdentificationIcon, UserIcon, CakeIcon, MapIcon, CheckCircleIcon } from '@heroicons/react/24/solid'
import Timeline from "@core/components/Timeline"


export default function CallDetail() {
    const { id } = useParams<{ id: string }>()

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
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509194!2d144.95373631550492!3d-37.81720944202171!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0x5045675218ce7e33!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2s!4v1632735312345!5m2!1sen!2s"
                        width="100%"
                        height="100%"
                        style={{ border: "0" }}
                        allowFullScreen
                        loading="lazy" />
                </div>
            </div>

            <Group className="w-full my-5 items-center justify-between p-4">
                <Group className="items-center space-x-4">
                    <div className="avatar">
                        <AvatarUser className="w-20 h-20" firstName="Jaydon" lastName="Frankie" />
                    </div>

                    <Group className="flex-col" gap={0}>
                        <Heading className="text-2xl font-bold">
                          Jaydon Frankie
                        </Heading>

                        <Heading className="text-sm text-gray-600">1967-23-42</Heading>
                    </Group>
                </Group>

                <Group className="items-center space-x-4">
                  <Heading className="font-semibold flex items-center justify-center gap-2">
                      +998 99 888 8888
                      <PhoneIcon className="w-4 h-4" />
                  </Heading>
                </Group>
            </Group>

            <Group className="w-full my-5 items-center justify-between p-4">
                <div className="w-full p-6 shadow-lg rounded-lg">
                    <h2 className="text-2xl font-bold flex items-center mb-4">
                        <IdentificationIcon className="w-6 h-6 mr-2 text-primary" />
                        Jaydon Frankie
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center">
                            <UserIcon className="w-5 h-5 mr-2 text-gray-600" />

                            <p className="text-gray-700">
                                <strong>Username:</strong> Jaydon Frankie
                            </p>
                        </div>

                        <div className="flex items-center">
                            <PhoneIcon className="w-5 h-5 mr-2 text-gray-600" />

                            <p className="text-gray-700">
                                <strong>Phone:</strong> 998 99 888 888
                            </p>
                        </div>

                        <div className="flex items-center">
                            <CakeIcon className="w-5 h-5 mr-2 text-gray-600" />

                            <p className="text-gray-700">
                                <strong>Birthdate:</strong> 1967-23-42
                            </p>
                        </div>

                        <div className="flex items-center">
                            <MapIcon className="w-5 h-5 mr-2 text-gray-600" />

                            <p className="text-gray-700">
                                <strong>Address:</strong> 1234 Main St, Anytown, USA
                            </p>
                        </div>

                        <div className="flex items-center">
                            <CheckCircleIcon
                                className={`w-5 h-5 mr-2 text-green-600`}
                            />

                            <p className="text-gray-700">
                                <strong>Verified:</strong> <span className="text-green-600">Verified on 1967-23-42</span>
                            </p>
                        </div>

                        <div className="col-span-2 border p-3 rounded-lg border-info">
                            <div className="flex items-center ">
                                <CheckCircleIcon className="w-5 h-5 mr-2 text-gray-600" />

                                <p className="text-gray-700">
                                    <strong>Extra Info:</strong>
                                </p>
                            </div>

                            <p className="mt-2 text-gray-700 whitespace-pre-line break-words">
                                Tart I love sugar plum I love oat cake. Sweet roll caramels I love jujubes. Topping cake wafer..
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