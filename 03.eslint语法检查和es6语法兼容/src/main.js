
const add = (x,y)=>{
    return x+y
}

console.log(add(0,2))

const promise = new Promise((resolve)=>{
    console.log("模拟接口返回数据")
    setTimeout(()=>{
        resolve({code: 200, des: "成功"})
    },2000)
})

promise.then((data)=>{
    console.log(data)
})
