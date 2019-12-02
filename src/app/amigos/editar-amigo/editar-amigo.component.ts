import { Component, OnInit, ViewChild, ElementRef, Input } from "@angular/core";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { AmigoService } from "app/services/amigo.service";
import { ToasterService } from "angular2-toaster";
import { Subscription } from "rxjs/Subscription";
import { MensagemService } from "app/services/mensagem.service";

@Component({
  selector: "mt-editar-amigo",
  templateUrl: "./editar-amigo.component.html",
  styleUrls: ["./editar-amigo.component.css"]
})
export class EditarAmigoComponent implements OnInit {
  @ViewChild("closebutton") public closebutton: ElementRef;

  public loading = false;

  public form: FormGroup;

  public subEdit: Subscription;

  private idAmigo: number;

  constructor(
    private amigoService: AmigoService,
    private msgService: MensagemService
  ) {}

  ngOnChanges() {}

  ngOnInit() {
    this.form = new FormGroup({
      nome: new FormControl(null, Validators.required),
      apelido: new FormControl(null, Validators.required),
      celular: new FormControl(null, Validators.required)
    });

    this.subEdit = this.amigoService.amigosEdit.subscribe(amigo => {
      this.idAmigo = amigo.id;
      this.form.patchValue({ ...amigo });
    });
  }

  public onEditar(): void {
    if (!this.form.valid) return;

    const amigo = this.form.value;

    this.loading = true;

    amigo.id = this.idAmigo;

    this.amigoService.editarAmigo(amigo).subscribe(
      () => {
        this.msgService.exibirSucesso("O amigo foi alterado");

        this.loading = false;

        this.amigoService.amigosChange.next(null);
        this.closebutton.nativeElement.click();
      },
      err => {
        this.msgService.exibirErros(err.json());
        this.loading = false;
      }
    );
  }

  ngOnDestroy() {
    this.subEdit.unsubscribe();
  }
}
