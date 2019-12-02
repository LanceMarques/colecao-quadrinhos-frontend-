import { Component, OnInit } from "@angular/core";

import { Subscription } from "rxjs/Subscription";

import { AmigoService } from "app/services/amigo.service";
import { MensagemService } from "app/services/mensagem.service";

@Component({
  selector: "mt-amigos",
  templateUrl: "./amigos.component.html",
  styleUrls: ["./amigos.component.css"]
})
export class AmigosComponent implements OnInit {
  public amigos: any[] = [];

  public amigo: any;

  public subChange: Subscription;

  constructor(
    private amigoService: AmigoService,
    private msgService: MensagemService
  ) {}

  ngOnInit() {
    this.carregarAmigos();

    this.subChange = this.amigoService.amigosChange.subscribe(() => {
      this.carregarAmigos();
    });
  }

  public excluirAmigo(id: number) {
    this.amigoService.deletarAmigo(id).subscribe(
      () => {
        this.msgService.exibirSucesso("Amigo foi removido.");
        this.carregarAmigos();
      },
      err => {
        this.msgService.exibirErros(err.json());
      }
    );
  }

  private carregarAmigos() {
    this.amigoService.listarAmigos().subscribe(res => {
      this.amigos = res.json();
    });
  }

  onEditar(amg) {
    this.amigoService.amigosEdit.next(amg);
  }

  ngOnDestroy() {
    this.subChange.unsubscribe();
  }
}
