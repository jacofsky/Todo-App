interface ITask {
    key:number,
    description:string,
    complete:boolean,
    startDate:number,
    finishDate:number|null,

    getDate():Date,
}

class Task implements ITask {

    key: number
    description: string
    complete: boolean
    startDate: number
    finishDate: number | null

    constructor(description:string){
        this.key = this.getDate().getTime()
        this.description = description
        this.complete = false
        this.startDate = this.getDate().getTime()
        this.finishDate = null
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
    markComplete(key:number):boolean,
    deleteTask(key:number):boolean,
    getLocalStorage():void,
    setLocalStorage(task:Task[]|null):void,
    getFastestTask():Task
}

class TaskArray implements ITaskArrat {

    tasks: Array<Task>
    fastestTask: Task | null

    constructor(){
        this.tasks = []
        this.fastestTask = null
    }

    addTask(desc:string): boolean {

        if (desc.length < 1){
            return false
        }

        this.tasks.push(new Task(desc))

        this.setLocalStorage(this.getAll())
        return true 
    }

    getAll(): Task[] {

        return this.tasks
    
    }

    markComplete(key: number): boolean {

        let encontro:boolean = false

        this.tasks.map(task => {
            if(task.key === key){
                task.complete = true
                task.finishDate = new Date().getTime()
                encontro = true
            }
        })

        
        
        this.setLocalStorage(this.getAll())
        return encontro
        
    }

    deleteTask(key: number): boolean {

        let confirm = this.tasks.length

        console.log(confirm)

        this.tasks = this.getAll().filter(task => task.key !== key )

        console.log(this.tasks.length)

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

    setLocalStorage(tasks: Task[]|null): void {
        localStorage.setItem("tasks", JSON.stringify(tasks))
    }

    getFastestTask(): Task {
        
        this.tasks.sort

        return 
    }

}