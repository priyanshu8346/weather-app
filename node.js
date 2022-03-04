const http= require("http");
const fs=require("fs");
var requests= require("requests");

const homeFile = fs.readFileSync("index.html","utf-8");
const replaceVal=(tempVal,orgVal)=>{
    let temp=tempVal.replace("{%city%}",orgVal.name);
    temp=temp.replace("{%weather%}",orgVal.weather[0].description);
    const n=Math.floor(orgVal.main.temp-273)
    temp=temp.replace("{%temp%}",n)
    return temp
}

const server = http.createServer((req,res)=>{
    if(req.url== "/"){
        requests("https://api.openweathermap.org/data/2.5/weather?q=mathura&appid=fec8270e71caad366f7305eebe5adeae")
        .on("data",(chunk)=>{
            const objData= JSON.parse(chunk);
            const arrData=[objData]
            // console.log(objData.main.temp);
            const realTimeData= arrData.map(val=>replaceVal(homeFile,val)).join(" ");
            res.end(realTimeData)
            console.log(realTimeData)
        })
        .on("end",(err)=>{
            if(err)return console.log("some error arises",err);
        })
       
    }
    else{
        res.end("404 error. No page found")
      
    }
    
})
server.listen(8000,"127.0.0.1");