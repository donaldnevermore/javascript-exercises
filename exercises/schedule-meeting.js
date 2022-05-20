const dayStart = "07:30"
const dayEnd = "17:45"

/**
 *
 * @param {string} startTime
 * @param {number} durationMinutes
 * @returns
 */
function scheduleMeeting(startTime, durationMinutes) {
    if (lt(startTime, dayStart) || gt(startTime, dayEnd)) {
        return false
    }

    const newTime = add(startTime, durationMinutes)
    if (gt(newTime, dayEnd)) {
        return false
    }

    return true
}

/**
 *
 * @param {string} time
 * @returns
 */
function getHhmm(time) {
    const t = time.match(/^(\d{1,2}):(\d{2})$/) || []
    const [_, hh, mm] = t
    if (typeof hh === "string" && typeof mm === "string") {
        const arr = [Number(hh), Number(mm)]
        return arr
    }

    throw new TypeError("Time is invalid.")
}

/**
 *
 * @param {string} a
 * @param {string} b
 * @returns
 */
function lt(a, b) {
    const [aHh, aMm] = getHhmm(a)
    const [bHh, bMm] = getHhmm(b)

    if (aHh < bHh) {
        return true
    }
    if (aHh > bHh) {
        return false
    }

    return aMm < bMm
}

/**
 *
 * @param {string} a
 * @param {string} b
 * @returns
 */
function gt(a, b) {
    const [aHh, aMm] = getHhmm(a)
    const [bHh, bMm] = getHhmm(b)

    if (aHh > bHh) {
        return true
    }
    if (aHh < bHh) {
        return false
    }

    return aMm > bMm
}

/**
 *
 * @param {string} startTime
 * @param {number} durationMinutes
 * @returns
 */
function add(startTime, durationMinutes) {
    let [hh, mm] = getHhmm(startTime)
    mm += durationMinutes

    while (mm >= 60) {
        mm -= 60
        hh++
    }

    return `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`
}

console.log(scheduleMeeting("7:00", 15)) // false
console.log(scheduleMeeting("07:15", 30)) // false
console.log(scheduleMeeting("7:30", 30)) // true
console.log(scheduleMeeting("11:30", 60)) // true
console.log(scheduleMeeting("17:00", 45)) // true
console.log(scheduleMeeting("17:30", 30)) // false
console.log(scheduleMeeting("18:00", 15)) // false
