//Constants
const carousel = document.querySelector("#astro-events")
const focusEvent = document.querySelector("#astro-event-detail")
const focusImage = document.querySelector("#detail-image")
const focusName = document.querySelector("#detail-name")
const focusLocation = document.querySelector("#detail-location")
const focusDate = document.querySelector("#date-display")
const focusViews = document.querySelector("#view-display")
const focusComment  = document.querySelector("#comment-display")
const newEvent  = document.querySelector("#new-event")
const newName  = document.querySelector("#new-name")
const newLocation  = document.querySelector("#new-location")
const newDate  = document.querySelector("#new-date")
const newImage  = document.querySelector("#new-image")
const newViews  = document.querySelector("#new-views")
const newComment  = document.querySelector("#new-comment")
const submitButton = document.querySelector("#submit-button")
// const  = document.querySelector("#")
// const  = document.querySelector("#")

//Functions
function addToCarousel (data) {
    const eventPicture = document.createElement ('img')
    eventPicture.src = data.image
    carousel.append(eventPicture)
    eventPicture.addEventListener('click',() => handleClick(data))
    }


    async function eventSubmission(event) {
        event.preventDefault()
        const newEventImage = newImage.value
        const newEventName = newName.value
        const newEventLocation = newLocation.value
        const newEventViews = newViews.value
        const newEventComment = newComment.value
        
        const response = await fetch('http://localhost:3000/astro-events', {
          method: "POST",
          headers: { "Content-Type": 'application/json' },
          body: JSON.stringify( { name: newEventName, location: newEventLocation, image: newEventImage, views: newEventViews, comment:newEventComment  } )
        })
        
        const newEventInput = await response.json()
        addToCarousel(newEventInput)
        
        newEvent.reset()
      }

//Event listeners (3distinct event listeners)
async function handleClick (data) {
    focusImage.src = data.image
    focusName.textContent = data.name
    focusLocation.textContent = data.newLocation
    focusDate.textContent = data.date
    focusViews.textContent = data.views
    focusComment.textContent = data.comments
   };


//Fetch 

async function displayEvents () {
    const response = await fetch('http://localhost:3000/astro-events')
    const data = await response.json()
    data.forEach(addToCarousel)
  
    handleClick(data[0])
}

displayEvents()