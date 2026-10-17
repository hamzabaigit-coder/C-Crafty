const dateFmt = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' })
const longDateFmt = new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' })
const monthYearFmt = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' })

const parse = (iso: string) => new Date(`${iso}T12:00:00Z`)

export const formatDate = (iso: string) => dateFmt.format(parse(iso))
export const formatLongDate = (iso: string) => longDateFmt.format(parse(iso))
export const formatMonthYear = (iso: string) => monthYearFmt.format(parse(iso))

export const plural = (n: number, one: string, many = `${one}s`) => `${n} ${n === 1 ? one : many}`
