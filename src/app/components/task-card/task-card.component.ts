import { Component, inject } from '@angular/core';
import { ModalControllerService } from '../../Services/modal-controller.service';

@Component({
  selector: 'app-task-card',
  imports: [],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.css'
})
export class TaskCardComponent {
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
