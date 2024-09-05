export class User{
  id: number
  age: number
  dob: string
  email: string
  salary: number
  address: string
  lastName: string
  firstName: string
  contactNumber: string
  avatar:any

  constructor(id: number,age: number,dob: string,email: string,salary: number,address: string,lastName: string,firstName: string,contactNumber: string,avatar:any) {
    this.id = id;
    this.age = age;
    this.dob = dob;
    this.email = email;
    this.salary = salary;
    this.address = address;
    this.lastName = lastName;
    this.firstName = firstName;
    this.contactNumber = contactNumber;
    this.avatar=avatar
  }
}