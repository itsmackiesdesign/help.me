import Layout from "@core/components/Layout.tsx"
import InfiniteCards from "@core/components/InfinityCards.tsx"
import { useInfiniteFetch } from "@core/hooks/request.ts"

const staticData = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    value: `${Math.floor(Math.random() * 1000)}`, // Random values for demonstration
}))

const fetchStaticData = async ({ pageParam = 1 }) => {
    const pageSize = 50
    const totalCount = staticData.length
    const data = staticData.slice((pageParam - 1) * pageSize, pageParam * pageSize)
    return { results: data, count: totalCount }
}

export default function Call() {
    const query = useInfiniteFetch("staticData", fetchStaticData)

    return (
        <Layout>
            <h1 className="text-2xl font-bold my-4">Calls</h1>
            <InfiniteCards
                query={query}
                cardProps={{
                    title: (item: (typeof staticData)[0]) => item.name,
                    content: (item: (typeof staticData)[0]) => `Value: ${item.value}`,
                }}
                responsive
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            />
        </Layout>
    )
}
