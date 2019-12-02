import { Component, OnInit, Input } from "@angular/core";
import { ColecaoService } from "app/services/colecao.service";
import { MensagemService } from "app/services/mensagem.service";

@Component({
  selector: "mt-colecao",
  templateUrl: "./colecao.component.html",
  styleUrls: ["./colecao.component.css"]
})
export class ColecaoComponent implements OnInit {
  @Input() colecao: any;

  constructor(
    private colecaoService: ColecaoService,
    private msgService: MensagemService
  ) {}

  ngOnInit() {}

  onEditar(colecao) {
    this.colecaoService.edit.next(colecao);
  }

  public excluir(id: number) {
    this.colecaoService.deletar(id).subscribe(
      () => {
        this.msgService.exibirSucesso("Coleção foi removida");
        this.colecaoService.change.next(null);
      },
      err => {
        this.msgService.exibirErros(err.json());
      }
    );
  }
}
