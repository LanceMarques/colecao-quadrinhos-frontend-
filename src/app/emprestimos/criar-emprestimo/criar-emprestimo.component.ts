import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { FormGroup, FormControl, FormArray, Validators } from "@angular/forms";
import { AmigoService } from "app/services/amigo.service";
import { VolumeService } from "app/services/volume.service";
import { EmprestimoService } from "app/services/emprestimo.service";
import { MensagemService } from "app/services/mensagem.service";

@Component({
  selector: "mt-criar-emprestimo",
  templateUrl: "./criar-emprestimo.component.html",
  styleUrls: ["./criar-emprestimo.component.css"]
})
export class CriarEmprestimoComponent implements OnInit {
  @ViewChild("openbutton") public openbutton: ElementRef;
  @ViewChild("closebutton") public closebutton: ElementRef;

  form: FormGroup;

  amigos: any[];

  volumes: any[];

  amigo = { nome: "" };

  amigosFiltrados: any[];

  volumesFiltrados: any[];

  public loading: boolean;

  constructor(
    private amigoService: AmigoService,
    private volumeService: VolumeService,
    private emprestimoService: EmprestimoService,
    private msgService: MensagemService
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      amigo: new FormControl(null, Validators.required),
      emprestimoTemQuadrinho: new FormControl(null, Validators.required)
    });

    this.amigoService.listarAmigos().subscribe(res => {
      this.amigos = res.json();
    });

    this.volumeService.listar().subscribe(res => {
      this.volumes = res.json();
    });
  }

  onCadastrar() {
    if (!this.form.valid) {
      return;
    }

    const { emprestimoTemQuadrinho } = this.form.value;

    const emprestimoFormatado = emprestimoTemQuadrinho.map(e => {
      return {
        quadrinho: {
          id: e.id
        }
      };
    });

    const emprestimo = {
      amigo: this.amigo,
      quadrinhos: emprestimoFormatado
    };

    this.emprestimoService.criar(emprestimo).subscribe(
      () => {
        this.msgService.exibirSucesso("Um novo emprestimo foi cadastrado");
        this.loading = false;

        this.form.reset();
        this.emprestimoService.change.next(null);
        this.closebutton.nativeElement.click();
      },
      err => {
        this.msgService.exibirErros(err.json());
        this.loading = false;
      }
    );
  }

  onAmigoSelecionado(amigo) {
    this.amigo = amigo;
  }

  onConsultarAmigo(event) {
    this.amigosFiltrados = this.amigos;

    this.amigosFiltrados = this.amigosFiltrados.filter(a =>
      a.nome.toLowerCase().includes(event.query.toLowerCase())
    );
  }

  onCancelar() {
    this.form.reset();
    this.amigo = { nome: "" };
    this.volumesFiltrados = [];
    this.amigosFiltrados = [];
  }

  onConsultarVolume(event) {
    this.volumesFiltrados = this.volumes;

    this.volumesFiltrados = this.volumesFiltrados.filter(v =>
      v.titulo.titulo.toLowerCase().includes(event.query.toLowerCase())
    );
  }
}
