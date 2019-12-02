import { Component, OnInit } from "@angular/core";
import { ColecaoService } from "app/services/colecao.service";
import { Subscription } from "rxjs/Subscription";
import { MensagemService } from "app/services/mensagem.service";

@Component({
  selector: "mt-colecoes",
  templateUrl: "./colecoes.component.html",
  styleUrls: ["./colecoes.component.css"]
})
export class ColecoesComponent implements OnInit {
  public colecoes: any[] = [];
  public subChange: Subscription;
  exibir = false;

  constructor(
    private colecaoService: ColecaoService,
    private msgService: MensagemService
  ) {}

  ngOnInit() {
    this.carregarColecoes();

    this.subChange = this.colecaoService.change.subscribe(() => {
      this.carregarColecoes();
    });
  }

  public excluir(id: number) {
    this.colecaoService.deletar(id).subscribe(
      () => {
        this.msgService.exibirSucesso("Coleção foi removida.");
        this.carregarColecoes();
      },
      err => {
        this.msgService.exibirErros(err.json());
      }
    );
  }

  private carregarColecoes() {
    this.colecaoService.listar().subscribe(res => {
      this.colecoes = res.json();

      if (!this.colecoes.length) {
        this.exibir = true;
      }
    });
  }

  ngOnDestroy() {
    this.subChange.unsubscribe();
  }
}
