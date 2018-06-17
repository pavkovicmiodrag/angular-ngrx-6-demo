import {
  ChangeDetectionStrategy,
  Component,
  Inject
} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Action, Store } from "@ngrx/store";
import * as fromStore from '../../state/reducers';

// @Component({
//   changeDetection: ChangeDetectionStrategy.OnPush,
//   selector: 'app-delete-confirm-dialog',
//   templateUrl: 'delete-confirm-dialog.component.html',
//   styleUrls: ['delete-confirm-dialog.component.scss']
// })
// export class DeleteConfirmDialogComponent {
//   //
//   // constructor(
//   //   @Inject(MD_DIALOG_DATA) public data: {
//   //     cancel?: Action,
//   //     delete: Action,
//   //     text: string,
//   //     title: string
//   //   },
//   //   private mdDialogRef: MdDialogRef<DeleteConfirmDialogComponent>,
//   //   private store: Store<IState>
//   // ) { }
//
//   animal: string;
//   name: string;

//   constructor(public dialog: MatDialog, private store: Store<IState>) {
//   }
//
//   openDialog(data : any): void {
//     let dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
//       width: '250px',
//       data: data
//     });
//
//     dialogRef.afterClosed().subscribe(result => {
//       console.log('The dialog was closed');
//       this.animal = result;
//     });
//   }
// }

@Component({
  selector: 'app-delete-confirm-dialog',
  templateUrl: 'delete-confirm-dialog.component.html',
  styleUrls: ['delete-confirm-dialog.component.scss']
  })
  export class DeleteConfirmDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteConfirmDialogComponent>,private store: Store<fromStore.IState>,
    @Inject(MAT_DIALOG_DATA) public data: any) { console.log('data ', data.payload.text)}

  onNoClick(): void {
    this.dialogRef.close();
  }
  public delete() {
    console.log('this.data.delete', this.data.payload.delete);
    this.store.dispatch(this.data.payload.delete);

    this.dialogRef.close();
  }
}
