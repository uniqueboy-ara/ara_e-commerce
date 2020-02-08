import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { api_result } from "../../model/api-result";
import { ServerRoutes } from '../../routesAndUrls';

@Injectable({
  providedIn: "root"
})
export class UploadService {
  constructor(private http: HttpClient) { }

  Upload(upload: File[], type: string): Observable<api_result> {
    var formData: any = new FormData();
    upload.forEach(f => formData.append(f.name, f));
    formData.append('type', type)
    return this.http.post<api_result>(
      ServerRoutes.AdminPanelMenu.File.POST,
      formData
    );
  }

  Delete(fileName, type): Observable<api_result> {
    return this.http.delete<api_result>(
      ServerRoutes.AdminPanelMenu.File.POST + '/' + fileName + '/' + type);
  }

}
