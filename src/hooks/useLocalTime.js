import { useEffect, useState } from 'react'

const format = (timeZone) =>
  new Intl.DateTimeFormat('fr-FR', { hour: '2-digit', minute: '2-digit', timeZone }).format(new Date())

export function useLocalTime(timeZone) {
  const [time, setTime] = useState(() => format(timeZone))
  useEffect(() => {
	 const id = setInterval(() => setTime(format(timeZone)), 15000)
	 return () => clearInterval(id)
  }, [timeZone])
  return time
}
