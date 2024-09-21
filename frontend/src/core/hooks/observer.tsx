import { MutableRefObject, useEffect, useRef } from "react"

export type IntersectionObserverParams = {
    enabled?: boolean
    onIntersect: () => unknown
}

export default function useIntersectionObserver({ enabled = true, onIntersect }: IntersectionObserverParams) {
    const ref = useRef() as MutableRefObject<HTMLInputElement>

    useEffect(() => {
        if (!enabled) {
            return
        }

        const observer = new IntersectionObserver(
            (entries) => entries.forEach((entry) => entry.isIntersecting && onIntersect()),
            { rootMargin: "0px", threshold: 0.1 }
        )

        const el = ref && ref.current
        if (!el) return
        observer.observe(el)
        return () => observer.unobserve(el)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ref.current, enabled])

    return <div ref={ref} />
}
