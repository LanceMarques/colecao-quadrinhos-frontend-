import { Component, OnInit, Input } from "@angular/core";
import { VolumeService } from "app/services/volume.service";
import { MensagemService } from "app/services/mensagem.service";

@Component({
  selector: "mt-item-volume",
  templateUrl: "./item-volume.component.html",
  styleUrls: ["./item-volume.component.css"]
})
export class ItemVolumeComponent implements OnInit {
  @Input() volume: any = {};

  @Input() mostrarAcoes: boolean = true;

  constructor(
    private volumeService: VolumeService,
    private msgService: MensagemService
  ) {}

  ngOnInit() {}

  onEditar(volume) {
    this.volumeService.edit.next(volume);
  }

  onExcluir(id) {
    this.volumeService.deletar(id).subscribe(
      () => {
        this.msgService.exibirSucesso("Volume foi removido");
        this.volumeService.change.next(null);
      },
      err => {
        this.msgService.exibirErros(err.json());
      }
    );
  }
}
