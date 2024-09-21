import Layout from "@core/components/Layout.tsx"
import InfiniteCards from "@core/components/InfinityCards.tsx"
import { useInfiniteFetch } from "@core/hooks/request.ts"
import MemberCard from "@members/components/MemberItem.tsx"
import { MemberType } from "@members/types.ts"

const staticData = [
    {
        user: { id: 1, phone: "+", verifiedAt: "", firstName: "John", lastName: "Doe" },
        birthdate: "1990-01-01",
        address: "123 Main St",
        extra: "Extra info",
        id: 1,
    },
    {
        user: { id: 1, phone: "+", verifiedAt: "", firstName: "Jane", lastName: "Smith" },
        birthdate: "1995-02-01",
        address: "456 Main St",
        extra: "Extra info",
        id: 2,
    },
    {
        user: { id: 1, phone: "+", verifiedAt: "", firstName: "Alice", lastName: "Johnson" },
        birthdate: "2000-03-01",
        address: "789 Main St",
        extra: "Extra info",
        id: 3,
    },
]

const fetchStaticData = async function ({ pageParam = 1 }) {
    const pageSize = 20
    const totalCount = staticData.length
    const data = staticData.slice((pageParam - 1) * pageSize, pageParam * pageSize)
    return { results: data, count: totalCount }
}

export default function Members() {
    const query = useInfiniteFetch(["members"], fetchStaticData)

    const renderItem = (item: MemberType) => {
        return (
            <MemberCard
                member={{
                    user: item.user,
                    birthdate: item.birthdate,
                    address: item.address,
                    extra: item.extra,
                    id: 1,
                }}
            />
        )
    }

    return (
        <Layout>
            <h1 className="text-2xl font-bold my-4">Clients</h1>

            <InfiniteCards
                responsive
                query={query}
                cardProps={{
                    title: (item) => item.user.firstName,
                    content: (item) => item.user.lastName,
                }}
                renderItem={renderItem}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            />
        </Layout>
    )
}
