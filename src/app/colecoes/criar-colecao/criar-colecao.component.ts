import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ColecaoService } from "app/services/colecao.service";
import { MensagemService } from "app/services/mensagem.service";

@Component({
  selector: "mt-criar-colecao",
  templateUrl: "./criar-colecao.component.html",
  styleUrls: ["./criar-colecao.component.css"]
})
export class CriarColecaoComponent implements OnInit {
  @ViewChild("openbutton") public openbutton: ElementRef;
  @ViewChild("closebutton") public closebutton: ElementRef;

  public loading = false;

  public form: FormGroup;

  public urlCapa: string;

  private urlDefault =
    "https://screenshotlayer.com/images/assets/placeholder.png";

  constructor(
    private colecaoService: ColecaoService,
    private msgService: MensagemService
  ) {}

  ngOnInit() {
    this.urlCapa = this.urlDefault;

    this.form = new FormGroup({
      titulo: new FormControl(null, Validators.required),
      editora: new FormControl(null, Validators.required),
      avaliacao: new FormControl(null),
      urlImagem: new FormControl(null),
      estadoColecao: new FormControl(null, Validators.required),
      tipoQuadrinho: new FormControl(null, Validators.required)
    });
  }

  onCadastrar() {
    if (!this.form.valid) return;

    let colecao = this.form.value;
    this.loading = true;

    colecao.avaliacao = 0;
    colecao.urlImagem = this.urlCapa;

    this.colecaoService.criar(colecao).subscribe(
      () => {
        this.msgService.exibirSucesso("Uma nova coleção foi cadastrada.");
        this.loading = false;

        this.form.reset();
        this.colecaoService.change.next(null);
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
