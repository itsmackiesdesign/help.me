import { TextSkeleton } from "@core/components/Skeleton.tsx"
import Breadcrumbs, { BreadcrumbsItem } from "@core/components/Breadcrumbs.tsx"

export default function BreadcrumbsLoading() {
    return (
        <Breadcrumbs>
            <BreadcrumbsItem text={<TextSkeleton rows={1} words={1} />} />
            <BreadcrumbsItem text={<TextSkeleton rows={1} words={1} />} />
            <BreadcrumbsItem text={<TextSkeleton rows={1} words={1} />} />
        </Breadcrumbs>
    )
}
