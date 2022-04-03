const taskButton = document.querySelector('#taskAddButton') as HTMLButtonElement
const taskText = document.querySelector('#taskTextInput') as HTMLInputElement
const taskList = document.querySelector('#task--list') as HTMLUListElement
const fastTaskButton = document.querySelector('#fastestTaskButton') as HTMLButtonElement
const containerFastTask = document.querySelector('#fastTask') as HTMLDivElement
const deleteButton = document.querySelector('#deleteButton') as HTMLButtonElement

const taskArray = new TaskArray()
taskArray.getLocalStorage()



taskButton!.addEventListener('click', () => addTaskDom())

fastTaskButton!.addEventListener('click', () => showFastestTask())

taskText.addEventListener('keyup',function(e) {
    if (e.key === 'Enter' || e.keyCode === 13) {
        if(taskText.value.length > 1) {
        
            taskArray.addTask(taskText.value)
    
            taskButton.style.borderLeft = '.2rem solid white'
            taskText.style.border = '.2rem solid white'
    
            printTasks()
    
            taskText.value = ''
    
        } else {
            taskButton.style.borderLeft = '.2rem solid red'
            taskText.style.border = '.2rem solid red'
        }
    }
})


const showFastestTask = () => {

    const fastestTask = taskArray.getFastestTask();

    if(fastestTask === null) {
        containerFastTask.innerHTML = '<p class="animate__animated animate__fadeIn">Completa alguna tarea!</p>';
    } else {
        containerFastTask.innerHTML = `
            <div>
                <p class="animate__animated animate__fadeIn">${fastestTask.description}</p>
            </div>`
    }

} 

const deleteTask = (id:number) => {
    
    taskArray.deleteTask(id)
    printTasks()

}

const toggleCompleteTask = (id:number) => {


    taskArray.toggleComplete(id)
    printTasks()


}

const addTaskDom = () => {
    if(taskText.value.length > 1) {
        
        taskArray.addTask(taskText.value)

        taskButton.style.borderLeft = '.2rem solid white'
        taskText.style.border = '.2rem solid white'

        printTasks()

        taskText.value = ''

    } else {
        taskButton.style.borderLeft = '.2rem solid red'
        taskText.style.border = '.2rem solid red'
    }
}

const printTasks = () => {

    taskList.innerHTML = '';
    
    taskArray.getAll().forEach(task => {

        const TaskElement = document.createElement('li')

        let liTaskHTML = `
            <div>
                <input type="checkbox" onchange="toggleCompleteTask(${task.key})" ${ task.complete && 'checked' } name="marckComplete" id="marckComplete">
                <p ${task.complete && 'class="tachado"'}>${task.description}</p>
            </div>
            <button onClick="deleteTask(${task.key})"><i class="bi bi-x"></i></button>
            
        `

        TaskElement.setAttribute("id", `${task.key}`)
        TaskElement.setAttribute("class", "task")




        taskList.appendChild(TaskElement)


        TaskElement.innerHTML = liTaskHTML

        

    })
}

printTasks()