import { Dayjs } from "dayjs"

// nhận được sự khác biệt về thời gian
export const getTimeDifference = (timeStartSpin: Dayjs, timeStopSpin: Dayjs) => {
    return timeStopSpin.diff(timeStartSpin, 'seconds');
}