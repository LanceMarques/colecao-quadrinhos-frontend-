import { Component, OnInit, ViewChild, ElementRef, Input } from "@angular/core";

import { FormGroup, FormControl, Validators } from "@angular/forms";

import { AmigoService } from "app/services/amigo.service";

import { ToasterService } from "angular2-toaster";

import { MensagemService } from "app/services/mensagem.service";

@Component({
  selector: "mt-criar-amigo",
  templateUrl: "./criar-amigo.component.html",
  styleUrls: ["./criar-amigo.component.css"]
})
export class CriarAmigoComponent implements OnInit {
  @ViewChild("openbutton") public openbutton: ElementRef;
  @ViewChild("closebutton") public closebutton: ElementRef;

  public loading = false;

  public form: FormGroup;

  constructor(
    private amigoService: AmigoService,
    private toasterService: ToasterService,
    private msgService: MensagemService
  ) {}

  ngOnChanges() {}

  ngOnInit() {
    this.form = new FormGroup({
      nome: new FormControl(null, Validators.required),
      apelido: new FormControl(null, Validators.required),
      celular: new FormControl(null, Validators.required)
    });
  }

  public onCadastrar(): void {
    if (!this.form.valid) return;

    const amigo = this.form.value;
    this.loading = true;

    this.amigoService.criarAmigo(amigo).subscribe(
      () => {
        this.msgService.exibirSucesso("Um novo amigo foi cadastrado.");
        this.loading = false;

        this.form.reset();
        this.amigoService.amigosChange.next(null);
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
  }
}
