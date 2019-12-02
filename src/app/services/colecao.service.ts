import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { Subject } from "rxjs/Subject";
import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";

@Injectable()
export class ColecaoService {
  public change: Subject<any> = new Subject();
  public edit: Subject<any> = new Subject();

  private url = `${environment.urlbase}/titulos`;

  constructor(private http: Http) {}

  public buscar(id: number): Observable<any> {
    return this.http.get(`${this.url}/id/${id}`);
  }

  public criar(colecao: any): Observable<any> {
    return this.http.post(this.url, colecao);
  }

  public editar(colecao: any): Observable<any> {
    return this.http.put(`${this.url}/id/${colecao.id}`, colecao);
  }

  public listar(): Observable<any> {
    return this.http.get(this.url);
  }

  public deletar(id: number): Observable<any> {
    return this.http.delete(`${this.url}/id/${id}`);
  }
}
