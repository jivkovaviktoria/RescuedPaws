import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogService } from 'src/app/services/common/dialog.service';
import { RpTranslateService } from 'src/app/services/rp-translate.service';
import { BaseComponent } from '../../base/base.component';
import { LanguageService } from 'src/app/services/language.service';
import { Action } from 'src/app/utilities/enums/actions.enum';

@Component({
  selector: 'rp-dialog',
  templateUrl: './rp-dialog.component.html',
  styleUrls: ['./rp-dialog.component.css']
})
export class RpDialogComponent extends BaseComponent {
  protected title!: string;

  @Input() public cancelButtonText: Action = Action.Cancel;
  @Input() public saveButtonText: Action = Action.Save;
  @Input() public mode: Action | undefined = undefined;

  @Output() public onSave: EventEmitter<any> = new EventEmitter<any>();
  @Output() public onDelete: EventEmitter<any> = new EventEmitter<any>();

  protected _dialogService: DialogService;
  protected _translateService: RpTranslateService;

  /**
   * Creates an instance of RpDialogComponent.
   * @param dialogRef Reference to the dialog containing this component.
   * @param dialogService Service for dialog operations.
   * @param translateService Service for translations.
   * @param languageService Service for language operations.
   * @param data Data passed into the dialog.
   */
  constructor(
    public dialogRef: MatDialogRef<RpDialogComponent>,
    dialogService: DialogService,
    translateService: RpTranslateService,
    languageService: LanguageService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super(languageService);
    this._dialogService = dialogService;
    this._translateService = translateService;

    this.title = data.title;

    if (data.mode) this.mode = data.mode;
    if (data.saveButtonText) this.saveButtonText = data.saveButtonText;
    if (data.cancelButtonText) this.cancelButtonText = data.cancelButtonText;
  }

  /** 
   * Determines if the dialog is in view mode.
  */
  public isViewMode(): boolean {
    return this.mode === Action.View;
  }

  /**
   * Determines if the dialog is in edit or add mode.
   */
  public isEditMode(): boolean {
    return this.mode === Action.Edit;
  }

  /**
   * Determines if the dialog is in delete mode.
   */
  public isDeleteMode(): boolean {
    return this.mode === Action.Delete;
  }

  /**
   * Determines if the dialog is in add mode.
   */
  public isAddMode(): boolean {
    console.log(this.mode);
    
    return this.mode === Action.Add;
  }

  /**
   * Closes the dialog without saving.
   */
  protected onNoClick(): void {
    this.dialogRef.close();
  }

  /**
   * Emits the save event and closes the dialog.
   */
  protected onSaveClick(): void {
    this.onSave.emit();
    this._dialogService.save();
    this.dialogRef.close();
  }

  /**
   * Emits the delete event and closes the dialog.
   */
  protected onDeleteClick(): void {
    this.onDelete.emit();
    this._dialogService.delete();
    this.dialogRef.close();
  }
}
