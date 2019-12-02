import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MensagemService } from "app/services/mensagem.service";
import { VolumeService } from "app/services/volume.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "mt-criar-volume",
  templateUrl: "./criar-volume.component.html",
  styleUrls: ["./criar-volume.component.css"]
})
export class CriarVolumeComponent implements OnInit {
  @ViewChild("openbutton") public openbutton: ElementRef;
  @ViewChild("closebutton") public closebutton: ElementRef;

  public loading = false;

  public form: FormGroup;

  public urlDefault =
    "https://screenshotlayer.com/images/assets/placeholder.png";

  public urlCapa: string;

  public idVolume: string;

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

    this.activatedRoute.params.subscribe(params => {
      if (!params.id) {
        this.router.navigate(["/"]);
      }

      this.idVolume = params.id;
    });
  }

  onCadastrar() {
    if (!this.form.valid) return;

    let volume = this.form.value;

    this.loading = true;

    volume.urlImagem = this.urlCapa;
    volume.titulo = { id: this.idVolume };

    this.volumeService.criar(volume).subscribe(
      () => {
        this.msgService.exibirSucesso("Um novo volume foi cadastrado");
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
}
