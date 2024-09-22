import Layout from "@core/components/Layout.tsx"
import InfiniteCards from "@core/components/InfinityCards.tsx"
import { useNavigate } from "react-router-dom"
import { UserIcon, CakeIcon, MapIcon } from "@heroicons/react/24/solid"
import { formatDate } from "@core/utils/date.ts"
import Button from "@core/components/Button.tsx"
import { useCallList } from "@call/hooks/calls.ts"
import { CallType } from "@call/types"

export default function Call() {
    const navigate = useNavigate()
    const query = useCallList()

    const handleCardClick = (id: number) => {
        navigate(`/calls/call/${id}`)
    }

    const renderItem = (item: CallType) => (
        <div className="card bg-base-100 shadow-xl transition-transform transform hover:scale-105">
            <div className="card-body">
                <h2 className="card-title flex items-center">
                    <UserIcon className="w-5 h-5 mr-2 text-primary" />
                    {item.member.user.firstName} {item.member.user.lastName}
                </h2>
                <p className="flex items-center">
                    <CakeIcon className="w-5 h-5 mr-2 text-gray-600" />
                    Birthdate: {formatDate(item.member.birthdate)}
                </p>
                <p className="flex items-center">
                    <MapIcon className="w-5 h-5 mr-2 text-gray-600" />
                    Address: {item.member.address}
                </p>
                <div className="card-actions justify-end">
                    <Button className="btn btn-primary" onClick={() => handleCardClick(item.id)} size={"sm"}>
                        View
                    </Button>
                </div>
            </div>
        </div>
    )

    return (
        <Layout>
            <h1 className="text-2xl font-bold my-4">Calls</h1>
            <InfiniteCards
                responsive
                query={query}
                cardProps={{
                    title: (item: CallType) => item.member.user.firstName,
                    content: (item: CallType) => item.member.user.lastName,
                }}
                renderItem={renderItem}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            />
        </Layout>
    )
}
