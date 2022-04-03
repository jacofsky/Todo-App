"use strict";
class Task {
    constructor(description) {
        this.key = this.getDate().getTime();
        this.description = description;
        this.complete = false;
        this.startDate = this.getDate().getTime();
        this.finishDate = null;
        this.completeTime = null;
    }
    getDate() {
        return new Date();
    }
}
class TaskArray {
    constructor() {
        this.tasks = [];
        this.fastestTask = this.getFastestTask();
    }
    addTask(desc) {
        if (desc.length < 1) {
            return false;
        }
        this.tasks.unshift(new Task(desc));
        this.setLocalStorage(this.getAll());
        return true;
    }
    getAll() {
        return this.tasks;
    }
    toggleComplete(key) {
        let encontro = false;
        this.tasks.map(task => {
            if (task.key === key) {
                if (task.complete === false) {
                    task.complete = true;
                    task.finishDate = new Date().getTime();
                    task.completeTime = task.finishDate - task.startDate;
                    encontro = true;
                }
                else if (task.complete === true) {
                    task.complete = false;
                    task.finishDate = null;
                    task.completeTime = null;
                    task.startDate = new Date().getTime();
                    encontro = true;
                }
            }
        });
        this.setLocalStorage(this.getAll());
        return encontro;
    }
    deleteTask(key) {
        let confirm = this.tasks.length;
        this.tasks = this.getAll().filter(task => task.key !== key);
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
        const completeTasks = this.getAll().filter(task => task.complete === true);
        if (completeTasks.length >= 1) {
            const fastestTask = completeTasks.reduce((a, b) => {
                if (a.completeTime && b.completeTime) {
                    if (a.completeTime < b.completeTime) {
                        return a;
                    }
                    else {
                        return b;
                    }
                }
                return null;
            });
            return fastestTask;
        }
        return null;
    }
}
