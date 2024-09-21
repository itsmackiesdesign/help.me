import Icon from "@core/components/Icon"
import { CheckCircleIcon } from '@heroicons/react/24/solid'

type TimelineItem = {
    status: string
    isStart?: boolean
    isEnd?: boolean
}

type TimelineProps = {
    items: TimelineItem[]
}

export default function Timeline({ items }: TimelineProps) {
    return (
        <ul className="timeline timeline-vertical">
            {items.map((item, index) => (
                <li key={index} className="timeline-item">
                    {item.isStart && (
                        <div className="timeline-start timeline-box">
                            {item.status}
                        </div>
                    )}

                    {item.isEnd && <hr className="bg-primary" />}

                    <div className="timeline-middle">
                        <Icon icon={CheckCircleIcon} className="text-primary h-5 w-5" />
                    </div>

                    {item.isStart && <hr className="bg-primary" />}
                    
                    {item.isEnd && (
                        <div className="timeline-end timeline-box">
                            {item.status}
                        </div>
                    )}
                </li>
            ))}
        </ul>
    )
}