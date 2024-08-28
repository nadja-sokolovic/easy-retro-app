import { Report } from './../models/report.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const API_URL = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient) { }

  getAllSprints() {
    return this.http.get(`${API_URL}/report/sprints`);
  }

  loadReportForSprint(sprint: number): Observable<Report> {
    return this.http.get<Report>(`${API_URL}/report/${sprint}`);
  }

  createNewReport(report: Report): Observable<Report> {
    return this.http.post<Report>(`${API_URL}/report`, report);
  }
}
