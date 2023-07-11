import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  async post(url: string, data: any) {
    const headers = await this.getHeaders();

    return this.http.post(url, data, headers)
      .pipe(
        catchError(this.handleError('Something Went wrong'))
      );
  }

  async postWithoutHeaders(url: string, data: any) {
    return this.http.post(url, data)
      .pipe(
        catchError(this.handleError('Something Went wrong'))
      );
  }

  async getWithoutHeaders(url: string) {
    return this.http.get(url)
      .pipe(
        catchError(this.handleError('Something Went wrong'))
      );
  }

  convertFileToBlob(file: File): Promise<Blob> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);

      reader.onload = () => {
        const result = reader.result;
        if (result !== null) {
          const blob = new Blob([result], { type: file.type });
          resolve(blob);
        } else {
          reject(new Error('Failed to read file'));
        }
      };

      reader.onerror = () => {
        reject(reader.error);
      };
    });
  }

  async uploadResume(url: string, data: any) {

    const formData = new FormData();

    try {
      const blob = await this.convertFileToBlob(data.file);
      formData.append('photo', blob);
    } catch (error) {
      console.error('Error converting file to blob:', error);
      throw new Error('Error converting file to blob');
    }

    const headers = new HttpHeaders().set('_method', 'POST')
      .set('fileFormat', data.fileFormat)
      .set('imageType', 'resume')
      .set('mobile', data.mobile)
      .set('userId', `c2c${data.mobile}`);

    return this.http.post(url, formData, { headers: headers })
      .pipe(
        catchError(this.handleError('uploadResume'))
      );
  }

  async get(url: string, params?: any) {
    const headers = await this.getHeaders(params);
    return this.http.get(url, headers)
      .pipe(
        catchError(this.handleError('Something Went wrong'))
      );
  }

  async getHeaders(params?: undefined) {

    // const auth_token = localStorage.getItem('AUTH_TOKEN');

    const headersObj: any = {
      'Content-Type': 'application/json',
      'App-Id': 'WEBSITE',
      'Client-Type': 'WEB',
    };

    // if (auth_token) {
    //   headersObj.Authorization = 'Basic' + auth_token;
    // }

    const mainHeaders: any = {
      headers: new HttpHeaders(headersObj)
    };

    if (params) {
      mainHeaders.params = params;
    }

    return mainHeaders;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

}
