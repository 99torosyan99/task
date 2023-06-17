export default function changeDate(dt) {
    const date = new Date(dt);
    return `${addZero(date.getDate())}/${addZero(date.getMonth() + 1)}/${addZero(date.getFullYear())}`
}

function addZero(num) {
    if(num < 9){
        return '0' + num
    }
    return num
}