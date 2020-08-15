// 工具js文件

// 转中国时区时间

export let setCNtime=(utctime)=>{
    var date=new Date(utctime)
    return date.getFullYear()+'/'+(date.getMonth()+1)+'/'+date.getDate()
}

// 转时分秒
export let setCNHourstime=(utctime)=>{
    var date=new Date(utctime)
    return setnum(date.getHours())+':'+setnum(date.getMinutes())+':'+setnum(date.getSeconds())
}

// 处理时间
export let settime=(utctime)=>{
    var date=new Date(utctime)
    return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+setnum(date.getHours())+':'+setnum(date.getMinutes())+':'+setnum(date.getSeconds())
}
// 处理时间，让服务器能够接受
export let setnewtime=(utctime)=>{
    var date=new Date(utctime)
    return date.getFullYear()+''+setnum((date.getMonth()+1))+''+setnum(date.getDate())+''+setnum(date.getHours())+''+setnum(date.getMinutes())+''+setnum(date.getSeconds())
}
const setnum=(num)=>{
    return num>=10?num:'0'+num
}