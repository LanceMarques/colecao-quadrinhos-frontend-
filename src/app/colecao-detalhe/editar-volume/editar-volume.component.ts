import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { VolumeService } from "app/services/volume.service";
import { MensagemService } from "app/services/mensagem.service";
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Subscription } from "rxjs/Subscription";
@Component({
  selector: "mt-editar-volume",
  templateUrl: "./editar-volume.component.html",
  styleUrls: ["./editar-volume.component.css"]
})
export class EditarVolumeComponent implements OnInit {
  @ViewChild("openbutton") public openbutton: ElementRef;
  @ViewChild("closebutton") public closebutton: ElementRef;
  public loading = false;

  public form: FormGroup;

  public urlDefault =
    "https://screenshotlayer.com/images/assets/placeholder.png";

  public urlCapa: string;

  public idVolume: string;

  public idTitulo: string;

  private subEdit: Subscription;

  constructor(
    private volumeService: VolumeService,
    private msgService: MensagemService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.urlCapa = this.urlDefault;
    this.form = new FormGroup({
      volume: new FormControl(null, Validators.required),
      quantidade: new FormControl(null, Validators.required),
      valor: new FormControl(null, Validators.required),
      urlImagem: new FormControl(null),
      estadoConservacao: new FormControl(null, Validators.required)
    });
    this.subEdit = this.volumeService.edit.subscribe(volume => {
      this.idVolume = volume.id;
      this.urlCapa = volume.urlImagem;
      this.form.patchValue({ ...volume });
    });
    this.activatedRoute.params.subscribe(params => {
      if (!params.id) {
        this.router.navigate(["/"]);
      }
      this.idTitulo = params.id;
    });
  }

  onEditar() {
    if (!this.form.valid) return;
    let volume = this.form.value;
    this.loading = true;
    volume.urlImagem =
      volume.urlImagem.length > 0 ? volume.urlImagem : this.urlCapa;
    volume.titulo = { id: this.idTitulo };
    volume.id = this.idVolume;
    this.volumeService.editar(volume).subscribe(
      () => {
        this.msgService.exibirSucesso("O volume foi alterado");
        this.loading = false;
        this.form.reset();
        this.volumeService.change.next(null);
        this.closebutton.nativeElement.click();
      },
      err => {
        this.msgService.exibirErros(err.json());
        this.loading = false;
      }
    );
  }

  onChangeUrl() {
    const { urlImagem } = this.form.value;
    this.urlCapa = urlImagem.length > 0 ? urlImagem : this.urlDefault;
  }

  onCancelar() {
    this.form.reset();
    this.urlCapa = this.urlDefault;
  }

  ngOnDestroy() {
    this.subEdit.unsubscribe();
  }
}
