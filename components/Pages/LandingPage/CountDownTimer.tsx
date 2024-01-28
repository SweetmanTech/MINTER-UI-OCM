import { useEffect, useState } from "react"
import DigitViewer from "./DigitViewer"
import FadeInWhenVisible from "../../FadeInWhenVisible"

const CountDownTimer = () => {
  const [days, setDays] = useState("00")
  const [hours, setHours] = useState("00")
  const [minutes, setMinutes] = useState("00")
  const [seconds, setSeconds] = useState("00")

  const liveDay = "24 Feb 2024 07:30:00 EST"

  const getTime = () => {
    const offset = Date.parse(liveDay) - Date.now()

    setDays(Math.floor(offset / (1000 * 60 * 60 * 24)).toString())
    setHours(Math.floor((offset / (1000 * 60 * 60)) % 24).toString())
    setMinutes(Math.floor((offset / 1000 / 60) % 60).toString())
    setSeconds(Math.floor((offset / 1000) % 60).toString())
  }

  useEffect(() => {
    const interval = setInterval(() => getTime(), 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <FadeInWhenVisible className="bg-white p-[10px] xl:p-[20px] rounded-[10px]">
      <div className="grid grid-cols-4 gap-x-[10px] samsungS8:gap-x-[12px] xl:gap-x-[30px]">
        <DigitViewer label="DAYS" digit={days} />
        <DigitViewer label="HOURS" digit={hours} />
        <DigitViewer label="MINUTES" digit={minutes} />
        <DigitViewer label="SECONDS" digit={seconds} />
      </div>
    </FadeInWhenVisible>
  )
}

export default CountDownTimer
