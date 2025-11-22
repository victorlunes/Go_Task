import { Component, inject } from '@angular/core';
import { TaskCardComponent } from "../task-card/task-card.component";
import { TaskService } from '../../Services/task.service';
import { ITask } from '../../interfaces/task.interface';
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem, } from '@angular/cdk/drag-drop';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { TaskStatus } from '../../types/task-status';
import { TaskStatusEnum } from '../../enums/task.status.enum';

@Component({
  selector: 'app-task-list-section',
  imports: [TaskCardComponent, CdkDrag, CdkDropList, AsyncPipe, JsonPipe],
  templateUrl: './task-list-section.component.html',
  styleUrl: './task-list-section.component.css'
})
export class TaskListSectionComponent {
  readonly _taskService = inject(TaskService)

  onCardDrop(event: CdkDragDrop<ITask[]>) {
    this.moveCardToColumn(event)

    const taskId = event.item.data.id;
    const taskCurrentStatus = event.item.data.status;
    const droppedColumn = event.container.id;

    this.updateTaskStatus(taskId, taskCurrentStatus, droppedColumn);
  }

  private updateTaskStatus(taskId: string, taskCurrentStatus: TaskStatus, droppedColumn: string) {
    let taskNextStatus: TaskStatus;

    switch (droppedColumn) {
      case "to-do-collumn":
        taskNextStatus = TaskStatusEnum.TODO;
        break;

      case "doing-collumn":
        taskNextStatus = TaskStatusEnum.DOING;
        break;

      case "done-collumn":
        taskNextStatus = TaskStatusEnum.DONE;
        break;

      default:
        throw new Error('Coluna inválida');
    }

    this._taskService.updateTaskStatus(taskId, taskCurrentStatus, taskNextStatus);
  }


  private moveCardToColumn(event: CdkDragDrop<ITask[]>) {
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
