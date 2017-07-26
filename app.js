const express =  require("express")

express()
    .get("/", (req, res, next) => {
      res.send("hello man")
    })
    .listen(3000)
