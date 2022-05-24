import { useEffect, useMemo } from 'react'
import dayjs from 'dayjs'
import { useCountdown } from 'usehooks-ts'

export const useCoutdownTimer = (datetime: string) => {
    const diffSeconds = useMemo(() => {
        const dt = dayjs(datetime);
        const now = dayjs();
        if(!dt.isAfter(now)) return 0;
        return dt.diff(dayjs(), 'second');
    }, [datetime])

    const [count, { start, stop, reset }] = useCountdown({
        seconds: diffSeconds,
        interval: 1000,
        isIncrement: false,
      })

    useEffect(() => {
        if(diffSeconds > 0) {
            start()
        }
    }, [diffSeconds, start])  

    return {
        count,
        start,
        stop,
        reset
    }  
}