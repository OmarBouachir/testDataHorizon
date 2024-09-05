import { Component, OnInit, ViewChild  } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from '../services/user.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AddUserComponent } from '../add-user/add-user.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-list-of-users',
  templateUrl: './list-of-users.component.html',
  styleUrls: ['./list-of-users.component.css']
})
export class ListOfUsersComponent implements OnInit {
  displayedColumns: string[] = ['id', 'firstName','lastName','email','contactNumber','age','dob', 'salary','avatar', 'actions'];
  dataSource = new MatTableDataSource<any>();
  visible: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _dialog: MatDialog,private userService:UserService,private confirmationService: ConfirmationService,private messageService: MessageService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe(data => {
      data.forEach(user => {
        user.avatar = this.generateAvatarUrl(user.firstName, user.lastName);
      });
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event): void {
    const input = event.target as HTMLInputElement;
    const filterValue = input.value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteUser(id: number): void {
    this.confirmationService.confirm({
      message: 'Do you want to delete this User?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass:"p-button-danger p-button-text",
      rejectButtonStyleClass:"p-button-text p-button-text",
      acceptIcon:"none",
      rejectIcon:"none",
      accept: () => {
        const index = this.dataSource.data.findIndex(use => use.id === id);
        if (index >= 0) {
          this.dataSource.data.splice(index, 1);
          this.dataSource._updateChangeSubscription();
          Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            title: 'User deleted',
            icon: 'success',
          })
        }
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' });
      }
    });

  }

  generateAvatarUrl(firstName: string, lastName: string): string {
    const name = `${firstName} ${lastName}`;
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff`;
  }

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(AddUserComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const index = this.dataSource.data.findIndex(user => user.id === result.id);
        if (index >= 0) {
          this.dataSource.data[index] = result;
        } else {
          this.dataSource.data.push(result);
        }
        this.dataSource._updateChangeSubscription();
      }
    });
  }

  openAddEditUserForm() {
    const dialogRef = this._dialog.open(AddUserComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dataSource.data.push(result);
        this.dataSource._updateChangeSubscription();
      }
    });
  }

      
}
