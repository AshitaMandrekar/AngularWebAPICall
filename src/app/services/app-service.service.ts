import { HttpClient } from '@angular/common/http';
import { Injectable} from '@angular/core';
import { StudentDTO } from '../models/domain/student/StudentDTO';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private _http: HttpClient) { }
  _userUrl = 'https://localhost:7014/api/Student';

  getAllStudents() {
    return this._http.get<StudentDTO[]>(this._userUrl , { observe: 'response' });
  }
}
