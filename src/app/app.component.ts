import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppService } from './services/app-service.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'WebAPICall';

  constructor(public appService: AppService) {

  }

  ngOnInit(): void {
    this.getAllStudent();
  }

  getAllStudent() {
    this.appService.getAllStudents().subscribe((response: HttpResponse<any>) => {
      if (response.status === 200) {
        if (response.body) {
          console.log(response.body);
        }
        else {
          //this.messageService.add({ key: 'error_common', sticky: true, severity: 'error', summary: 'Invalid Login', detail: 'Combination of username/password is incorrect' });
          console.log('else');
        }
      }
      else {
        //this.messageService.add({ key: 'error_common', sticky: true, severity: 'error', summary: 'Invalid Login', detail: 'Combination of username/password is incorrect' });
        console.log('error');
      }
    },
      (err: HttpErrorResponse) => {
        if (err.status === 500) {
          //this.messageService.add({ key: 'error_common', sticky: true, severity: 'error', summary: 'Invalid Login', detail: 'Combination of username/password is incorrect' });
          console.log('error:500');
        }
        else {
          //this.messageService.add({ key: 'error_common', sticky: true, severity: 'error', summary: 'Invalid Login', detail: 'Combination of username/password is incorrect' });
          console.log('error:un');
        }
      });
  }


}
