
const db = require('../db/db.json')
const fs = require('fs')
const path =require('path');

const source = path.join(__dirname, '../db/db.json')

module.exports = (app) => {


      app.get('/api/notes', (req,res) => {
        fs.readFile(source, 'utf8', (err, data) => {
            if (err) {throw err}
            else {
                let x = JSON.parse(data)
                return res.json(x)
            }
      })})
      

      app.post('/api/notes', (req,res) => {
        req.body.id = Math.floor(Math.random() * 9999);
        fs.readFile(source, 'utf8', (err, data) => {
          if (err) {throw err}
          else {
              let x = JSON.parse(data)
              x.push(req.body)
              fs.writeFile(source, JSON.stringify(x), function(){console.log(x)})
              return res.json(req.body)
          }
        })
      });


      app.delete('/api/notes/:id', (req,res) => {
        fs.readFile(source, 'utf8', (err, data) => {
            if (err) {throw err}
            else {
                let x = JSON.parse(data)
                y = x.filter(apple => apple.id != req.params.id);
                console.log(req.params.id)
                fs.writeFile(source, JSON.stringify(y), function(){console.log(y)})
                // return res.json(req.body)
                return res.json(x)
            }
      })})
    }
