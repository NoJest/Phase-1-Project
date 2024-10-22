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


// audio element 
window.addEventListener('click', function() {
  const audioElement = document.getElementById('audio');
  audioElement.muted = false;
  audioElement.play();
})

// helper functions
function addToCarousel (data) {
  const imageContainer = document.createElement('div');
       imageContainer.classList.add('image-container');

       const eventPicture = document.createElement('img');
       eventPicture.src = data.image;

       const overlay = document.createElement('div');
       overlay.classList.add('overlay');
       overlay.textContent = data.name;

       imageContainer.append(eventPicture, overlay);
       carousel.append(imageContainer);

       imageContainer.addEventListener('mouseover', () => handleMouseover(eventPicture, overlay, data.name));
      
       eventPicture.addEventListener('dblclick',() => handleDblClick(data))
}

//Functions

// Submission of new astro events
async function eventSubmission(event) {
    event.preventDefault()
    const newEventImage = newImage.value.trim()
    const newEventName = newName.value.trim()
    const newEventLocation = newLocation.value.trim()
    const newEventViews = newViews.value.trim()
    const newEventComment = newComment.value.trim()
    const newEventDate = newDate.value.trim()

    // // Basic URL pattern to match URLs starting with http or https
    // const urlPattern = /^(https?:\/\/)[\w\-]+(\.[\w\-]+)+[/#?]?.*$/;

    // Check if any input is empty
    if (!newEventImage || !newEventName || !newEventLocation || !newEventDate || !newEventViews || !newEventComment) 
    {
    alert("Please fill out all fields before submitting.");
    return;
    }

    //  // Check if newEventImage is a valid URL
    //  if (!urlPattern.test(newEventImage)) {
    //   alert("Please enter a valid URL for the image.");
    //   return;
    // }


    const response = await fetch('http://localhost:3000/astro-events', {
          method: "POST",
          headers: { "Content-Type": 'application/json' },
          body: JSON.stringify( { 
            name: newEventName, 
            location: newEventLocation, 
            image: newEventImage, 
            date: newEventDate,
            views: newEventViews, 
            comment:newEventComment  
          } )
    })
        
    const newEventInput = await response.json()
    console.log(newEventInput)
      addToCarousel(newEventInput)
        
      newEvent.reset()
};

// function to handle dbl lcick
async function handleDblClick (data) {
          focusImage.src = data.image
          focusName.textContent = data.name
          focusLocation.textContent = data.location
          focusDate.textContent = data.date
          focusViews.textContent = data.views
          focusComment.textContent = data.comments
};

// Function to handle mouseover
async function handleMouseover (data) {

  
}
function handleMouseover(image, overlay, name) {
  overlay.textContent = name;
}


//Event listeners (3distinct event listeners) (two are built into addToCarousel)

submitButton.addEventListener("click",eventSubmission)

//audio


//Fetch 

async function displayEvents () {
    const response = await fetch('http://localhost:3000/astro-events')
    const data = await response.json()
    data.forEach(addToCarousel)
  // make sure image/ data 0 is shown right away
    handleDblClick(data[0])
}

displayEvents()