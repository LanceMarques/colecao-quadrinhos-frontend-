import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";
import { environment } from "environments/environment";
import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";

@Injectable()
export class EmprestimoService {
  public change: Subject<any> = new Subject();
  public edit: Subject<any> = new Subject();

  private url = `${environment.urlbase}/emprestimos`;

  constructor(private http: Http) {}

  public buscar(id: number): Observable<any> {
    return this.http.get(`${this.url}/id/${id}`);
  }

  public criar(emprestimo: any): Observable<any> {
    return this.http.post(this.url, emprestimo);
  }

  public devolver(id: any): Observable<any> {
    return this.http.patch(`${this.url}/id/${id}`, {});
  }

  public editar(emprestimo: any): Observable<any> {
    return this.http.put(`${this.url}/id/${emprestimo.id}`, emprestimo);
  }

  public listar(): Observable<any> {
    return this.http.get(this.url);
  }

  public deletar(id: number): Observable<any> {
    return this.http.delete(`${this.url}/id/${id}`);
  }
}
