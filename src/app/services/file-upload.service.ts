import { Injectable } from '@angular/core'
import { environment } from 'src/environments/environment'
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  constructor(private http: HttpClient) {}

  uploadImage(data: any) {
    console.log('image', data)

    const formData = new FormData()
    formData.append('image', data)

    return this.http.post<any>(environment.api_url + 'upload/images', formData)
  }
}
