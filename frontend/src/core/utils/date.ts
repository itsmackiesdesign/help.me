import moment from "moment"
import filter from "lodash/filter"

export const DATE_FORMAT = "YYYY-MM-DD"
export const DATETIME_FORMAT = "YYYY.MM.DD HH:mm"
export const DATETIME_LOCAL_FORMAT = "YYYY-MM-DDThh:mm"

export type DayType = { key: string; title: string; shortTitle: string }

export const DAYS: DayType[] = [
    { key: "1_monday", title: "Понедельник", shortTitle: "Пн" },
    { key: "2_tuesday", title: "Вторник", shortTitle: "Вт" },
    { key: "3_wednesday", title: "Среда", shortTitle: "Ср" },
    { key: "4_thursday", title: "Четверг", shortTitle: "Чт" },
    { key: "5_friday", title: "Пятница", shortTitle: "Пт" },
    { key: "6_saturday", title: "Суббота", shortTitle: "Сб" },
    { key: "7_sunday", title: "Воскресенье", shortTitle: "Вс" },
]

export function day(dayKey: string) {
    return filter(DAYS, { key: dayKey })[0]
}

export function getMonth(date: Date | string = new Date(), withYear = false) {
    const format = withYear ? "MMMM YYYY" : "MMMM"
    const month = moment(date).format(format)
    return month[0].toUpperCase() + month.slice(1)
}

export function getDateTime(date: string | Date = new Date()) {
    return moment(date).utc().format(DATETIME_FORMAT)
}

export function getDate(date = new Date()) {
    return moment(date).utc().format(DATE_FORMAT)
}

export function formatDate(date: string | Date) {
    return moment(date).calendar(null, {
        lastDay: "[Вчера]",
        sameDay: "[Сегодня]",
        nextDay: "[Завтра]",
        lastWeek: "DD.MM.YYYY",
        nextWeek: "DD.MM.YYYY",
        sameElse: "DD.MM.YYYY",
    })
}

export function diffDays(date: Date | string) {
    const days = moment().diff(date, "hours") / 24
    return days > 0 ? Math.ceil(days) : Math.floor(days)
}

export function expirationClass(expires: Date | string) {
    const diff = diffDays(expires)
    if (diff >= 0) return "is-danger"
    if (diff >= -10) return "is-warning"
    return "is-success"
}

export function calculateAge(birthDateString: string): number {
    const birthDate = moment(birthDateString, "YYYY-MM-DD")
    const today = moment()
    return today.diff(birthDate, "years")
}

export function formatDatesLabel(dates: string[]): string[] {
    return dates.map((mmyyyy) => {
        const month = mmyyyy.slice(0, 2)
        const year = mmyyyy.slice(2)
        return `${month}.${year}`
    })
}
