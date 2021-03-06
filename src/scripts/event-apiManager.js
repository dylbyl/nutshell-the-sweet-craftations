import event_domPrinter from "./event-domPrinter.js"

const event_apiManager = {
    //Fetch and print all events
    getAllEvents(){
        return fetch(`http://localhost:8088/events?userId=${sessionStorage.getItem("userId")}`)
        .then(r => r.json())
        .then(parsedEvents => {
            //Sort date and time in ascending order
            parsedEvents.sort((a, b) => {          
                   if (a.date === b.date) {
                      return parseInt(a.time) - parseInt(b.time);
                   }
                   return a.date > b.date ? 1 : -1;
                });

            parsedEvents.forEach(event =>{
                //Create today's date
                var today = new Date()
                today = `${today.getFullYear()}-${(today.getMonth()+ 1) > 9 ? "" + (today.getMonth()+ 1): "0" + (today.getMonth()+ 1)}-${today.getDate() > 9 ? "" + today.getDate(): "0" + today.getDate()}`
                //Print events only if they occur today or in the future
                if(event.date >= today){
                    event_domPrinter.printEvents(event)
                }
            })
        })
    },
    //Fetch to add a new event
    addEvent(){
        event_domPrinter.addNewEvent.userId = sessionStorage.getItem("userId")
        return fetch("http://localhost:8088/events", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(event_domPrinter.addNewEvent())
        }).then(() => {
            event_domPrinter.clearEvents()
            event_apiManager.getAllEvents()
        })
    },
    //Fetch to delete an event
    deleteEvent(){
        const primaryKey = event.target.id.split("-")[2];
        return fetch(`http://localhost:8088/events/${primaryKey}`, {
            method: "DELETE",
        }).then(() => {
            event_domPrinter.clearEvents()
            event_apiManager.getAllEvents()
        }) 
    },
    //Fetch to build edit form for event
    editNewEvent(id){
        return fetch(`http://localhost:8088/events/${id}`)
            .then(r => r.json())
            .then(eventToBeEdited => {
                event_domPrinter.buildEventEditForm(eventToBeEdited)                    
            })
    },
    //Fetch to save changes made on edit form for event
    saveEditedEvent(id){
        return fetch(`http://localhost:8088/events/${id}`,{
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(event_domPrinter.saveEditedEventObject(id))
        }).then(() => {
            event_domPrinter.clearEvents()
            event_apiManager.getAllEvents()
        }) 
    },
    filterEventsByMonth(){
        return fetch(`http://localhost:8088/events/`)
        .then(r => r.json())
        .then(parsedEvents => {
            const monthNames = {
                1:"January", 
                2:"February", 
                3:"March", 
                4:"April", 
                5:"May", 
                6:"June", 
                7:"July", 
                8:"August", 
                9:"September", 
                10:"October", 
                11:"November", 
                12:"December"
            }
            const monthNamesArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
            const dateArray = parsedEvents.map(event => event.date)
            const monthArray = dateArray.sort((a,b) => a.split("-")[1] - b.split("-")[1]).map(date => parseInt(date.split("-")[1]))
            console.log(monthArray)
            console.log(monthNames["January"])
            console.log(monthNamesArray[1])
            console.log(monthArray[0])
            for (let i = 0; i < parsedEvents.length; i++){
                for (let n = 0; i < monthArray.length; n++){
                    console.log("Inside second for loop")
                    // if(monthNames[n + 1] === monthArray[i]){
                    //     console.log(`${monthNames[n + 1]}`)
                    // }
                // if(monthArray[i] === monthNames[i]){
                //     console.log(`${monthArray[i]} equals ${monthNames[n]}`)
                //     document.querySelector("#events-container").innerHTML += `${monthNames[n]}`
                // }
                }
            }
        })
    }
}

export default event_apiManager