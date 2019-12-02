import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Subject } from "rxjs/Subject";

@Injectable()
export class AmigoService {
  public amigosChange: Subject<any> = new Subject();
  public amigosEdit: Subject<any> = new Subject();

  private url = `${environment.urlbase}/amigos`;

  constructor(private http: Http) {}

  public buscarAmigo(id: number): Observable<any> {
    return this.http.get(`${this.url}/id/${id}`);
  }

  public criarAmigo(amigo: any): Observable<any> {
    return this.http.post(this.url, amigo);
  }

  public editarAmigo(amigo: any): Observable<any> {
    return this.http.put(`${this.url}/id/${amigo.id}`, amigo);
  }

  public listarAmigos(): Observable<any> {
    return this.http.get(this.url);
  }

  public deletarAmigo(id: number): Observable<any> {
    return this.http.delete(`${this.url}/id/${id}`);
  }
}
