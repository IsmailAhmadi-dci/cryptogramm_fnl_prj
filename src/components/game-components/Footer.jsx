import { useEffect, useState } from "react";

export default function Footer() {

    const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const monthsOfYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const [calendar, setCalendar] = useState({})

    const updateClock = () => {
        const now = new Date()

        const year = now.getFullYear()
        const months = now.getMonth()
        const days = now.getDate()
        const wDay = now.getDay()

        const hours = now.getHours().toString().padStart(2, '0')
        const minutes = now.getMinutes().toString().padStart(2, '0')

        setCalendar({year, months, days, wDay, hours, minutes})
    }

    useEffect(() => {
        const calendarInterval = setInterval(() => {
            updateClock()
        },1000)

        return () => clearInterval(calendarInterval)
    }, [calendar])

    return (
        <footer>
            <div>
                {weekDays[calendar.wDay]}, {calendar.days} {monthsOfYear[calendar.months]} {calendar.year}
            </div>
            <div>
                {calendar.hours}:{calendar.minutes}
            </div>
        </footer>
    )
}