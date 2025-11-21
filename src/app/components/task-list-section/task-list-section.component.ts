import { Component, inject } from '@angular/core';
import { TaskCardComponent } from "../task-card/task-card.component";
import { TaskService } from '../../Services/task.service';
import { ITask } from '../../interfaces/task.interface';
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem, } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-task-list-section',
  imports: [TaskCardComponent, CdkDrag, CdkDropList,],
  templateUrl: './task-list-section.component.html',
  styleUrl: './task-list-section.component.css'
})
export class TaskListSectionComponent {
  todoTasks: ITask[] = []
  doingTasks: ITask[] = []
  doneTasks: ITask[] = []

  private readonly _taskService = inject(TaskService)

  ngOnInit() {
    this._taskService.todoTasks.subscribe((todoList) => {
      this.todoTasks = todoList;
      console.log(todoList)
    })
  }

  drop(event: CdkDragDrop<ITask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

}
