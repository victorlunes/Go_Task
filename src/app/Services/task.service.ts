import { Injectable } from "@angular/core";
import { BehaviorSubject, map } from "rxjs";
import { ITask } from "../interfaces/task.interface";
import { ITaskFormControls } from "../interfaces/task-form-controls.interface";
import { generateUniqueIdWithTimestamp } from "../utils/generate-unique-id-with-timestamp";
import { TaskStatusEnum } from "../enums/task.status.enum";
import { TaskStatus } from "../types/task-status";
import { IComment } from "../interfaces/comment.interface";

@Injectable({
    providedIn:
        'root'
})

export class TaskService {
    //A Fazer
    private todoTask$ = new BehaviorSubject<ITask[]>([]);
    readonly todoTasks = this.todoTask$.asObservable().pipe(
        map((tasks) => structuredClone(tasks))
    )

    //Tarefas Fazendo

    private doingTask$ = new BehaviorSubject<ITask[]>([]);
    readonly doingTasks = this.doingTask$.asObservable().pipe(
        map((tasks) => structuredClone(tasks))
    )

    //Tarefa Concluida
    private doneTask$ = new BehaviorSubject<ITask[]>([]);
    readonly doneTasks = this.doneTask$.asObservable().pipe(
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

    updateTaskStatus(taskId: string, TaskCurrentStatus: TaskStatus, taskNextStatus: TaskStatus) {
        const currentTaskList = this.getTaskListByStatus(TaskCurrentStatus)
        const nextTasklist = this.getTaskListByStatus(taskNextStatus)
        const currentTask = currentTaskList.value.find(
            (task) => task.id === taskId)

        if (currentTask) {
            currentTask.status = taskNextStatus

            const currentTaskListWithoutTask = currentTaskList.value.filter((task) => task.id !== taskId,);
            currentTaskList.next([...currentTaskListWithoutTask]);

            nextTasklist.next([...nextTasklist.value, { ...currentTask }])
        }
    }

    updateTaskNameAndDescription(taskId: string, taskCurrentStatus: TaskStatus, newTaskName: string, newTaskDescriprion: string) {
        const taskCurrentlist = this.getTaskListByStatus(taskCurrentStatus)
        let updateTaskList = taskCurrentlist.value

        updateTaskList = updateTaskList.map((task) => task.id === taskId ? { ...task, name: newTaskName, description: newTaskDescriprion } : task)

        taskCurrentlist.next(updateTaskList)
    }

    updateComments(taskId: string, taskCurrentStatus: TaskStatus, newTaskComments: IComment[]) {
        const taskCurrentlist = this.getTaskListByStatus(taskCurrentStatus)

        let updateTaskList = taskCurrentlist.value

        updateTaskList = updateTaskList.map((task) => task.id === taskId ? { ...task, comments: newTaskComments } : task)

        taskCurrentlist.next(updateTaskList)

        console.log(updateTaskList)
    }

    deleteTask(taskId: string, TaskCurrentStatus: TaskStatus) {
        const currentTaskList = this.getTaskListByStatus(TaskCurrentStatus)
        const newTaskList = currentTaskList.value.filter((task) => task.id !== taskId,);
        currentTaskList.next([...newTaskList]);
    }

    private getTaskListByStatus(TaskStatus: TaskStatus) {
        const taskListObj = {
            [TaskStatusEnum.TODO]: this.todoTask$,
            [TaskStatusEnum.DOING]: this.doingTask$,
            [TaskStatusEnum.DONE]: this.doneTask$,
        }

        return taskListObj[TaskStatus]
    }
}