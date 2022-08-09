const mongoose = require('mongoose')
const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://fullstackopen:${password}@course.ehauqbg.mongodb.net/noteApp?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
  name: String,
  number:String,
  date: Date,
})

const Person = mongoose.model('Person', personSchema)


mongoose
  .connect(url , { useNewUrlParser: true })
  .then((result) => {
    if(name && number){
      const person = new Person({
        name: name,
        number: number,
        date: new Date(),
      })
      person.save().then(result => {
          mongoose.connection.close()
          console.log('Person saved !')
      })
    }
    else{
        Person.find({}).then(result => {
            console.log('phonebook:')
            result.forEach(person => {
                console.log('--------------------')
                console.log('|',person.name, person.number)
                console.log('--------------------')

            })
            mongoose.connection.close()
        })
    }
  })
  .catch((err) => console.log(err))