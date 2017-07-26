const express =  require("express")

express()
    .get("/", (req, res, next) => {
      res.send("hello ivone")
    })
    .listen(3000)
