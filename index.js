import http from "http"
import path from "path"
import fs from "fs/promises"
import url from "url"
import { isUtf8 } from "buffer"

const filepath = url.fileURLToPath(import.meta.url)
const dir = path.dirname(filepath)

const getFilePath = (url)=>{
    if (url === "/"){
        return path.join(dir,"index.html")
    }else if (url === "/about"){
        return path.join(dir,"about.html")
    }else if (url === "/contact"){
        return path.join(dir,"contact-me.html")
    }else{
        return path.join(dir,"404.html")
    }
}

const server = http.createServer(async (req,res)=>{
    const filePath = getFilePath(req.url)
    const data = await fs.readFile(filePath, "utf8")
    res.setHeader('Content-Type',"text/html")
    res.write(data)
    res.end()
})

server.listen(8000, ()=>{
    console.log("server running")
})

