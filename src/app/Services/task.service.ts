import { Injectable } from "@angular/core";
import { BehaviorSubject, map } from "rxjs";
import { ITask } from "../interfaces/task.interface";
import { ITaskFormControls } from "../interfaces/task-form-controls.interface";
import { generateUniqueIdWithTimestamp } from "../utils/generate-unique-id-with-timestamp";
import { TaskStatusEnum } from "../enums/task.status.enum";

@Injectable({
    providedIn:
        'root'
})

export class TaskService {
    //task
    private todoTask$ = new BehaviorSubject<ITask[]>([]);

    readonly todoTasks = this.todoTask$.asObservable().pipe(
        map((tasks) => structuredClone(tasks))
    )

    addTask(taskInfos: ITaskFormControls) {
        const task: ITask = {
            id: generateUniqueIdWithTimestamp(),
            name: taskInfos.name,
            description: taskInfos.description,
            comments: [],
            status: TaskStatusEnum.TODO
        }

        const currentList = this.todoTask$.value;
        this.todoTask$.next([...currentList, task]);
    }
}