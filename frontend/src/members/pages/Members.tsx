import Layout from "@core/components/Layout.tsx"
import InfiniteCards from "@core/components/InfinityCards.tsx"
import { useInfiniteFetch } from "@core/hooks/request.ts"
import Button from "@core/components/Button.tsx"
import Group from "@core/components/Group.tsx"
import Heading from "@core/components/Heading"

const staticData = [
    { id: 1, name: "John Doe", value: "100" },
    { id: 2, name: "Jane Smith", value: "200" },
    { id: 3, name: "Alice Johnson", value: "150" },
]

const fetchStaticData = async ({ pageParam = 1 }) => {
    const pageSize = 50
    const totalCount = staticData.length
    const data = staticData.slice((pageParam - 1) * pageSize, pageParam * pageSize)
    return { results: data, count: totalCount }
}

export default function Members() {
    const query = useInfiniteFetch("staticData", fetchStaticData)

    const renderItem = (item: (typeof staticData)[0]) => {
        return (
            <div key={item.id} className="p-4 border rounded shadow-md">
                <Heading className="text-lg font-bold">{item.name}</Heading>
                <Heading className="text-gray-500">{item.value}</Heading>
                <Group className="justify-end">
                    <Button size="sm">View</Button>
                </Group>
            </div>
        )
    }

    const cardProps = {
        title: (item: (typeof staticData)[0]) => item.name,
        content: (item: (typeof staticData)[0]) => `Value: ${item.value}`,
    }

    return (
        <Layout>
            <h1 className="text-2xl font-bold my-4">Clients</h1>
            <InfiniteCards
                responsive
                query={query}
                cardProps={cardProps}
                renderItem={renderItem}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            />
        </Layout>
    )
}
