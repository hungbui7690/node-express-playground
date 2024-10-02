// Exercise: write the below code in Async/Await

/////////////////////////////////////////////////
// CREATE PROMISES
/////////////////////////////////////////////////

// (1) convert from callback to promise
function getCustomer(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        id: 1,
        name: 'Joe Doe',
        isGold: true,
        email: 'joe@gmail.com',
      })
    }, 2000)
  })
}

function getTopMovies() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(['movie1', 'movie2'])
    }, 2000)
  })
}

function sendEmail(email, movies) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, 4000)
  })
}

/////////////////////////////////////////////////
// CONSUME PROMISE
/////////////////////////////////////////////////

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

// (2)
async function notifyCustomer() {
  const customer = await getCustomer(1)
  console.log(customer)
  if (customer.isGold) {
    const movie = await getTopMovies()
    console.log(movie)
    await sendEmail(customer.email, movie)
    console.log('Email sent...')
  }
}

// (3)
notifyCustomer()
