import { Component, inject, Input } from '@angular/core';
import { ModalControllerService } from '../../Services/modal-controller.service';
import { ITask } from '../../interfaces/task.interface';
import { JsonPipe } from '@angular/common';
import { TaskService } from '../../Services/task.service';

@Component({
  selector: 'app-task-card',
  imports: [],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.css'
})
export class TaskCardComponent {
  @Input({ required: true }) task!: ITask;

  private readonly _modalControllerService = inject(ModalControllerService)
  private readonly _taskService = inject(TaskService)

  openModalComments() {
    this._modalControllerService.openTaskCommentsModal()
  }

  openModalEdit() {
    const dialogRef = this._modalControllerService.openEditTaskModal({
      name: this.task.name,
      description: this.task.description
    })

    dialogRef.closed.subscribe((taskForm) => {
      if (taskForm) {
        this._taskService.updateTaskNameAndDescription(this.task.id, this.task.status, taskForm.name, taskForm.description)
      }
    })
  }

}
