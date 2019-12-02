import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { EmprestimoService } from "app/services/emprestimo.service";
import { MensagemService } from "app/services/mensagem.service";
import { VolumeService } from "app/services/volume.service";
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: "mt-emprestimos",
  templateUrl: "./emprestimos.component.html",
  styleUrls: ["./emprestimos.component.css"]
})
export class EmprestimosComponent implements OnInit {
  @ViewChild("openbutton") public openbutton: ElementRef;
  emprestimos: any[] = [];

  volumes: any[] = [];

  public loading: boolean;

  public subChange: Subscription;

  constructor(
    private emprestimoService: EmprestimoService,
    private msgService: MensagemService
  ) {}

  ngOnInit() {
    this.carregarEmprestimos();

    this.subChange = this.emprestimoService.change.subscribe(() => {
      this.carregarEmprestimos();
    });
  }

  public devolver(id) {
    this.emprestimoService.devolver(id).subscribe(
      () => {
        this.msgService.exibirSucesso("O emprestimo foi devolvido");
        this.loading = false;
        this.carregarEmprestimos();
      },
      err => {
        this.msgService.exibirErros(err.json());
        this.loading = false;
      }
    );
  }

  public excluir(id) {
    this.emprestimoService.deletar(id).subscribe(
      () => {
        this.msgService.exibirSucesso("O emprestimo foi removido");
        this.loading = false;
        this.carregarEmprestimos();
      },
      err => {
        this.msgService.exibirErros(err.json());
        this.loading = false;
      }
    );
  }
  public onDetalhesEmprestimo(volumes) {
    const volumesFormatados = volumes.map(v => {
      return { ...v.quadrinho };
    });
    this.volumes = volumesFormatados;
  }

  private carregarEmprestimos() {
    this.emprestimoService.listar().subscribe(res => {
      this.emprestimos = res.json();
    });
  }

  ngOnDestroy() {
    this.subChange.unsubscribe();
  }
}
