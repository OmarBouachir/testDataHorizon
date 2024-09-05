import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../models/User';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  userForm: FormGroup;
  public userData: any;

  constructor( @Inject(MAT_DIALOG_DATA) public data: any,private _dialogRef: MatDialogRef<AddUserComponent>,private _fb: FormBuilder) { 
    this.userData = data;
    this.userForm = this._fb.group({
       firstName: [''],
      lastName: [''],
      email: [''],
      dob: ['Invalid date'],
      salary: [''],
      age: [''],
      contactNumber: [''],
      address: ['']
    });
   }
   
  ngOnInit(): void {
    this.userForm.patchValue(this.data);
  }

  generateAvatarUrl(firstName: string, lastName: string): string {
    const name = `${firstName} ${lastName}`;
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff`;
  }

  onFormSubmit():void{
    if (this.userForm.valid) {
      const formValue = this.userForm.value;
      const newUser = new User(
        this.userData ? this.userData.id : Math.floor(Math.random() * 1000),
        formValue.age,
        formValue.dob,
        formValue.email,
        formValue.salary,
        formValue.address,
        formValue.lastName,
        formValue.firstName,
        formValue.contactNumber,
        this.generateAvatarUrl(formValue.firstName,formValue.lastName)
        
      );
      if (this.userData) {
        Swal.fire({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          title: 'User updated successfully',
          icon: 'success',
        }).then(() => {
          this._dialogRef.close(newUser);
        });
      } else {
        Swal.fire({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          title: 'User added successfully',
          icon: 'success',
        }).then(() => {
          this._dialogRef.close(newUser);
        });
      }
    }
      
  }

}
