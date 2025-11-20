import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ITask } from "../interfaces/task.interface";

@Injectable({
    providedIn:
        'root'
})

export class TaskService {
    //task
    private todoTask$ = new BehaviorSubject<ITask[]>([]);

    readonlytodoTasks = this.todoTask$.asObservable()
}