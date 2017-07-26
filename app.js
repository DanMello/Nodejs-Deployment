const express =  require("express")

express()
    .get("/", (req, res, next) => {
      console.log("request received", Date.now())
      res.send("hello man")
    })
    .listen(3000)
