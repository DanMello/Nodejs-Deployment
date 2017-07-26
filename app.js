const express =  require("express")

express()
    .get("/", (req, res, next) => {
      res.send("hello bro")
    })
    .listen(3000)
