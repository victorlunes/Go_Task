import { Component, inject, Input } from '@angular/core';
import { ModalControllerService } from '../../Services/modal-controller.service';
import { ITask } from '../../interfaces/task.interface';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-task-card',
  imports: [],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.css'
})
export class TaskCardComponent {
  @Input({ required: true }) task!: ITask;

  private readonly _modalControllerService = inject(ModalControllerService)

  openModalComments() {
    this._modalControllerService.openTaskCommentsModal()
  }

  openModalEdit() {
    const dialogRef = this._modalControllerService.openEditTaskModal({
      name: 'Nome Tarefa',
      description: 'descrição tarefa'
    })

    dialogRef.closed.subscribe((taskForm) => {
      console.log('tarefa', taskForm)
    })
  }

}
