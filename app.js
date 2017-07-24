const express =  require("express")

express()
    .get("/", (req, res, next) => {
      res.send("hello dan")
    })
    .listen(3000)
