import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Subscription } from "rxjs/Subscription";
import { ColecaoService } from "app/services/colecao.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MensagemService } from "app/services/mensagem.service";

@Component({
  selector: "mt-editar-colecao",
  templateUrl: "./editar-colecao.component.html",
  styleUrls: ["./editar-colecao.component.css"]
})
export class EditarColecaoComponent implements OnInit {
  @ViewChild("closebutton") public closebutton: ElementRef;

  public loading = false;

  public form: FormGroup;

  subEdit: Subscription;

  idColecao: number;

  public urlCapa: string;

  private urlDefault =
    "https://screenshotlayer.com/images/assets/placeholder.png";

  constructor(
    private colecaoService: ColecaoService,
    private msgService: MensagemService
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      titulo: new FormControl(null, Validators.required),
      editora: new FormControl(null, Validators.required),
      avaliacao: new FormControl(null),
      urlImagem: new FormControl(null),
      estadoColecao: new FormControl(null, Validators.required),
      tipoQuadrinho: new FormControl(null, Validators.required)
    });

    this.subEdit = this.colecaoService.edit.subscribe(colecao => {
      this.idColecao = colecao.id;
      this.urlCapa = colecao.urlImagem;
      this.form.patchValue({ ...colecao });
    });
  }

  onChangeUrl() {
    const { urlImagem } = this.form.value;
    this.urlCapa = urlImagem.length > 0 ? urlImagem : this.urlDefault;
  }

  onEditar() {
    if (!this.form.valid) return;

    let colecao = this.form.value;
    this.loading = true;

    colecao.id = this.idColecao;

    colecao.urlImagem =
      colecao.urlImagem.length > 0 ? colecao.urlImagem : this.urlDefault;

    this.colecaoService.editar(colecao).subscribe(
      () => {
        this.msgService.exibirSucesso("A coleção foi alterada");
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

  onCancelar() {
    this.form.reset();
    this.urlCapa = this.urlDefault;
  }

  ngOnDestroy() {
    this.subEdit.unsubscribe();
  }
}
