export const formatDate = (date: string | undefined) => {
    if (date) {
        let dateObj = new Date(date)
        let dd = String(dateObj.getDate()).padStart(2, '0')
        let mm = String(dateObj.getMonth() + 1).padStart(2, '0')
        let yyyy = dateObj.getFullYear()

        let hh = String(dateObj.getHours()).padStart(2, '0')
        let min = String(dateObj.getMinutes()).padStart(2, '0')
        let sec = String(dateObj.getSeconds()).padStart(2, '0')

        // let time = new Date(date).toLocaleDateString()

        return `${dd}/${mm}/${yyyy} at ${hh}:${min}:${sec}`
    } else {
        return '-'
    }
}