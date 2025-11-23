import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { IComment } from '../../interfaces/comment.interface';
import { generateUniqueIdWithTimestamp } from '../../utils/generate-unique-id-with-timestamp';
import { ITask } from '../../interfaces/task.interface';

@Component({
  selector: 'app-task-comments-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './task-comments-modal.component.html',
  styleUrl: './task-comments-modal.component.css'
})
export class TaskCommentsModalComponent {
  taskCommentsChanged = false

  commentControl = new FormControl('', [Validators.required])

  @ViewChild('commentInput') commentInputRef!: ElementRef<HTMLInputElement>

  readonly _task: ITask = inject(DIALOG_DATA)

  readonly _dialogRef: DialogRef<boolean> = inject(DialogRef)

  onAddComment() {
    const newComment: IComment = {
      id: generateUniqueIdWithTimestamp(),
      description: this.commentControl.value ? this.commentControl.value : ''
    }

    this._task.comments.unshift(newComment)

    this.commentControl.reset()

    this.taskCommentsChanged = true

    this.commentInputRef.nativeElement.focus();
  }

  onRemoveModal(commentId: string) {
    console.log(this._task.comments)

    const currentListComment = this._task.comments.filter((comment) => comment.id !== commentId)

    this._task.comments = [...currentListComment]

    console.log(this._task.comments)

    this.taskCommentsChanged = true

  }

  onCloseModal() {
    this._dialogRef.close(this.taskCommentsChanged)
  }
}
