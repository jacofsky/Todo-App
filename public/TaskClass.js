"use strict";
class Task {
    constructor(description) {
        this.key = this.getDate().getTime();
        this.description = description;
        this.complete = false;
        this.startDate = this.getDate().getTime();
        this.finishDate = null;
    }
    getDate() {
        return new Date();
    }
}
class TaskArray {
    constructor() {
        this.tasks = [];
        this.fastestTask = null;
    }
    addTask(desc) {
        if (desc.length < 1) {
            return false;
        }
        this.tasks.push(new Task(desc));
        this.setLocalStorage(this.getAll());
        return true;
    }
    getAll() {
        return this.tasks;
    }
    markComplete(key) {
        let encontro = false;
        this.tasks.map(task => {
            if (task.key === key) {
                task.complete = true;
                task.finishDate = new Date().getTime();
                encontro = true;
            }
        });
        this.setLocalStorage(this.getAll());
        return encontro;
    }
    deleteTask(key) {
        let confirm = this.tasks.length;
        console.log(confirm);
        this.tasks = this.getAll().filter(task => task.key !== key);
        console.log(this.tasks.length);
        this.setLocalStorage(this.getAll());
        return this.tasks.length < confirm;
    }
    getLocalStorage() {
        let storage = localStorage.getItem("tasks");
        if (storage !== null) {
            const parseTasks = JSON.parse(storage);
            this.tasks = parseTasks;
        }
    }
    setLocalStorage(tasks) {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
    getFastestTask() {
        this.tasks.sort;
        return;
    }
}
