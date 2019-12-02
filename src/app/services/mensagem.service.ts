import { Injectable } from "@angular/core";
import { ToasterService } from "angular2-toaster";

@Injectable()
export class MensagemService {
  constructor(private toasterService: ToasterService) {}

  public exibirErros(erros: any[]) {
    this.toasterService.clear();

    erros.map(err => {
      this.toasterService.pop("error", "Ops!", err.mensagemUsuario);
    });
  }

  public exibirSucesso(msg) {
    this.toasterService.clear();
    this.toasterService.pop("success", "Sucesso!", msg);
  }
}
