import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";
import { environment } from "environments/environment";
import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";

@Injectable()
export class VolumeService {
  public change: Subject<any> = new Subject();
  public edit: Subject<any> = new Subject();

  private url = `${environment.urlbase}/quadrinhos`;

  constructor(private http: Http) {}

  public buscar(id: number): Observable<any> {
    return this.http.get(`${this.url}/id/${id}`);
  }

  public buscarPorTitulo(id: number): Observable<any> {
    return this.http.get(`${this.url}/titulo/${id}`);
  }

  public criar(quadrinho: any): Observable<any> {
    return this.http.post(this.url, quadrinho);
  }

  public editar(quadrinho: any): Observable<any> {
    return this.http.put(`${this.url}/id/${quadrinho.id}`, quadrinho);
  }

  public listar(): Observable<any> {
    return this.http.get(this.url);
  }

  public deletar(id: number): Observable<any> {
    return this.http.delete(`${this.url}/id/${id}`);
  }
}
