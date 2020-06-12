let allUsers = []
let hasLetter = null
let totalMale = 0
let totalFemale = 0
let sumAges = 0
let averageAge = 0

let usersTitle = document.querySelector('#usersTitle')
let usersDiv = document.querySelector('#usersDiv')

let statisticsTitle = document.querySelector('#statisticsTitle')
let statisticsDiv = document.querySelector('#statisticsDiv')

let inputText = document.querySelector('#filter')

totalMale = document.querySelector('#totalMale')
totalFemale = document.querySelector('#totalFemale')
sumAges = document.querySelector('#sumAges')
averageAge = document.querySelector('#averageAge')

usersTitle.innerText = 'No users found'
statisticsTitle.innerText = 'Nothing to show'

const url =
  'https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo'

async function getUsers() {
  const res = await fetch(url)
  const json = await res.json()
  allUsers = json.results.map((user) => {
    return {
      name: `${user.name.first} ${user.name.last}`,
      age: user.dob.age,
      gender: user.gender,
      photo: user.picture.thumbnail,
    }
  })
}

getUsers()

function filterUsers() {
  let inputText = document.querySelector('#filter').value.toLowerCase()

  hasLetter = allUsers.filter((user) => {
    return user.name.toLowerCase().includes(inputText)
  })

  hasLetter.sort((a, b) => {
    return a.name.localeCompare(b.name)
  })

  console.log(hasLetter)

  if (hasLetter) {
    let usersHTML = '<div>'
    hasLetter.forEach((user) => {
      const userHTML = `
      <div style="display: flex; margin: 10px">
        <div>
          <img src="${user.photo}"/>
        </div>
        <div>
          <p>${user.name}, ${user.age} years old</p>
        </div>
      </div>
    `
      usersHTML += userHTML
    })
    usersDiv.innerHTML = usersHTML
    usersTitle.innerHTML = `${hasLetter.length} user(s) found`
    displayStats(hasLetter)
  }
}

function displayStats(hasLetter) {
  statisticsTitle.innerHTML = 'Statistics'
  const arrayMale = hasLetter.filter((user) => user.gender === 'male')
  const arrayFemale = hasLetter.filter((user) => user.gender === 'female')

  totalMale.innerHTML = arrayMale.length
  totalFemale.innerHTML = arrayFemale.length

  const totalAges = hasLetter.reduce((acc, current) => {
    return acc + current.age
  }, 0)

  sumAges.innerHTML = hasLetter.length !== 0 ? totalAges : 0

  const average =
    hasLetter.length !== 0 ? formatNumber(totalAges / hasLetter.length) : 0
  averageAge.innerHTML = average
}

function formatNumber(number) {
  return Intl.NumberFormat('en-US').format(number.toFixed(1))
}
