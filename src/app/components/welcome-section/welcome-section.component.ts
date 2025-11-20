import { Component, inject } from '@angular/core';
import { ModalControllerService } from '../../Services/modal-controller.service';
import { generateUniqueIdWithTimestamp } from '../../utils/generate-unique-id-with-timestamp';

@Component({
  selector: 'app-welcome-section',
  imports: [],
  templateUrl: './welcome-section.component.html',
  styleUrl: './welcome-section.component.css'
})
export class WelcomeSectionComponent {
  private readonly _modalControllerService = inject(ModalControllerService)

  openModal() {
    const dialogRef = this._modalControllerService.openNewTaskModal()
    dialogRef.closed.subscribe((taskForm) => {
    });
  }
}
