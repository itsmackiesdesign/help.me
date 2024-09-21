import notFound from "@core/static/not_found.svg"

export default function NotFound() {
    return (
        <div>
            <img src={notFound} alt="404" />
            <p>Упс! Страница не найдена</p>
        </div>
    )
}
