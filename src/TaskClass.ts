interface ITask {
    key:number,
    description:string,
    complete:boolean,
    startDate:number,
    finishDate:number|null,
    completeTime: number | null

    getDate():Date,
}

class Task implements ITask {

    key: number
    description: string
    complete: boolean
    startDate: number
    finishDate: number | null
    completeTime: number | null

    constructor(description:string){
        this.key = this.getDate().getTime()
        this.description = description
        this.complete = false
        this.startDate = this.getDate().getTime()
        this.finishDate = null
        this.completeTime = null
    }

    getDate(): Date {
        return new Date()
    }

}

interface ITaskArrat {
    tasks:Array<Task>,
    fastestTask:Task|null,
    addTask(description:string):boolean,
    getAll():Array<Task>,
    toggleComplete(key:number):boolean,
    deleteTask(key:number):boolean,
    getLocalStorage():void,
    setLocalStorage(task:Task[]|null):void,
    getFastestTask():Task|null
}

class TaskArray implements ITaskArrat {

    tasks: Array<Task>
    fastestTask: Task | null

    constructor(){
        this.tasks = []
        this.fastestTask = this.getFastestTask()
    }

    addTask(desc:string): boolean {

        if (desc.length < 1){
            return false
        }

        this.tasks.unshift(new Task(desc))


        this.setLocalStorage(this.getAll())
        return true 
    }

    getAll(): Task[] {

        return this.tasks
    
    }

    toggleComplete(key: number): boolean {

        let encontro:boolean = false

        this.tasks.map(task => {
            if(task.key === key){

                if(task.complete === false) {
                    task.complete = true
                    task.finishDate = new Date().getTime()
                    task.completeTime = task.finishDate - task.startDate
                    encontro = true
                } else if(task.complete === true) {
                    task.complete = false
                    task.finishDate = null
                    task.completeTime = null
                    task.startDate = new Date().getTime()
                    encontro = true
                }
            }
        })

        
        this.setLocalStorage(this.getAll())
        return encontro
        
    }

    deleteTask(key: number): boolean {

        let confirm = this.tasks.length

        this.tasks = this.getAll().filter(task => task.key !== key )

        this.setLocalStorage(this.getAll())
        return this.tasks.length < confirm
        
    }

    getLocalStorage(): void {
        
        let storage:string|null = localStorage.getItem("tasks")

        if (storage !== null) {
            const parseTasks:Task[] = JSON.parse(storage)
            this.tasks = parseTasks

        }

        

    }

    setLocalStorage(tasks: Task[]|null):void {
        localStorage.setItem("tasks", JSON.stringify(tasks))
    }

    getFastestTask(): Task|null {

        const completeTasks = this.getAll().filter(task => task.complete === true)

        if(completeTasks.length >= 1) {

            const fastestTask = completeTasks.reduce((a,b):any => {
                if(a.completeTime && b.completeTime) {
    
                    if(a.completeTime < b.completeTime) {
                        return a
                    } else {
                        return b
                    }
                }
                return null
            })

            return fastestTask
        }
        

        return null
    }

}