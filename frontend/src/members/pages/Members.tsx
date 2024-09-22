import Layout from "@core/components/Layout.tsx"
import InfiniteCards from "@core/components/InfinityCards.tsx"
import MemberCard from "@members/components/MemberItem.tsx"
import { MemberType } from "@members/types.ts"
import { useMemberList } from "@members/hooks/members.ts"

export default function Members() {
    const members = useMemberList()

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
            <h1 className="text-2xl font-bold my-4">Members</h1>

            <InfiniteCards
                responsive
                query={members}
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
