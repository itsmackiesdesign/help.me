import Layout from "@core/components/Layout.tsx"
import InfiniteCards from "@core/components/InfinityCards.tsx"
import { useInfiniteFetch } from "@core/hooks/request.ts"
import { useNavigate } from "react-router-dom"
import { UserIcon, CakeIcon, MapIcon } from "@heroicons/react/24/solid"
import { formatDate } from "@core/utils/date.ts"
import Button from "@core/components/Button.tsx"



const staticData = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    value: {
        id: i + 1,
        birthdate: "2000-01-01",
        user: {
            id: i + 1,
            username: `user ${i + 1}`,
            firstName: "User",
            lastName: "User",
            phone: "998999999999",
            fullName: "User User",
        },
        address: "User address",
        extra: "User description",
    },
}))

const fetchStaticData = async ({ pageParam = 1 }) => {
    const pageSize = 50
    const totalCount = staticData.length
    const data = staticData.slice((pageParam - 1) * pageSize, pageParam * pageSize)
    return { results: data, count: totalCount }
}

export default function Call() {
    const navigate = useNavigate()
    const query = useInfiniteFetch("staticData", fetchStaticData)

    const handleCardClick = (id: number) => {
        navigate(`/call/${id}`)
    };

    const renderItem = (item: (typeof staticData)[0]) => (
        <div className="card bg-base-100 shadow-xl transition-transform transform hover:scale-105">
            <div className="card-body">
                <h2 className="card-title flex items-center">
                    <UserIcon className="w-5 h-5 mr-2 text-primary" />
                    {item.value.user.firstName} {item.value.user.lastName}
                </h2>
                <p className="flex items-center">
                    <CakeIcon className="w-5 h-5 mr-2 text-gray-600" />
                    Birthdate: {formatDate(item.value.birthdate)}
                </p>
                <p className="flex items-center">
                    <MapIcon className="w-5 h-5 mr-2 text-gray-600" />
                    Address: {item.value.address}
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
                    title: (item: (typeof staticData)[0]) => item.name,
                    content: (item: (typeof staticData)[0]) => (
                        <></>
                    ),
                }}
                renderItem={renderItem}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            />
        </Layout>
    )
}
