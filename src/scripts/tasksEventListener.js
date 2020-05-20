import tasksDOMPrinter from './tasksDOMPrinter.js'
import tasksAPIManager from './tasksAPIManager.js'

/*TODO:
-Make sure you are posting and fetching for a single user.
-Make sure you move everything out of script.js and into your module JS files before you submit a merge request.
*/

/* List of functions/methods that require a userId to work 
-createTaskObject
-tasksFetch
*/


const tasksEvents = {

    //Listens for the tasks button in the navbar to be clicked
        tasksEventListener() {
            document.querySelector("#tasks-page").addEventListener("click", () => {
                //Print the basic tasks page
                tasksDOMPrinter.printTasksPage()
            })
        },

    //Listens for button inside of the tasks page
        tasksPageEventListeners() {
            document.querySelector("#output-container").addEventListener("click", () => {
                if (event.target.id.includes("new-task-btn")) {
                    document.querySelector("#new-task-container").innerHTML = tasksDOMPrinter.newTaskForm()
                } else if (event.target.id.includes("task-submit-btn")) {
                    //Gets the userId from session storage, uses the id to create a task object, and POSTS the task object to the tasks array in nutshell.json
                    tasksAPIManager.POSTTask()
                   .then(tasksDOMPrinter.printTasksPage)
                } else if (event.target.id.includes("incomplete-task-checkbox")) {
                    //Gets the id number from the end of the id and stores it in taskId
                    const taskId = event.target.id.split("-").pop()
                    //Changes the isCompleted bool to true which removes it from the incomplete task list
                    tasksAPIManager.patchTask(taskId)
                    .then(tasksDOMPrinter.printTasksPage)
                }
            })
        }
}

export default tasksEvents
