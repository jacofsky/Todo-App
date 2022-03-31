// la key debe ser el id que se imprime en html

console.log("Hola mundo")

const taskArray = new TaskArray()
taskArray.getLocalStorage()

const resultado = taskArray.addTask("tarea 1")
const tareas = taskArray.getAll()

console.log(tareas)

setTimeout(() => {

    // const marcarCompleto = taskArray.markComplete(tareas[0].key)
    const marcarCompleto = taskArray.markComplete(123321)
    console.log(marcarCompleto)

    console.log(tareas)

    
}, 1000);

setTimeout(() => {

    // const marcarCompleto = taskArray.markComplete(tareas[0].key)
    //const eliminar = taskArray.deleteTask(tareas[0].key)
    //console.log(eliminar)

    console.log(tareas)

    
}, 2000);

setTimeout(() => {

    const tareasDeNuev = taskArray.getAll()
    

    console.log(tareasDeNuev)

    
}, 3000);


