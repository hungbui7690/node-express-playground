// Exercise: write the below code in Async/Await

getCustomer(1, (customer) => {
  console.log('Customer: ', customer)
  if (customer.isGold) {
    getTopMovies((movie) => {
      console.log('Top Movies: ', movie)
      sendEmail(customer.email, movie, () => {
        console.log('Email sent...')
      })
    })
  }
})

function getCustomer(id, callback) {
  setTimeout(() => {
    callback({
      id: 1,
      name: 'Joe Doe',
      isGold: true,
      email: 'joe@gmail.com',
    })
  }, 2000)
}

function getTopMovies(callback) {
  setTimeout(() => {
    callback(['movie1', ['movie2']])
  }, 2000)
}

function sendEmail(email, movies, callback) {
  setTimeout(() => {
    callback()
  }, 4000)
}
