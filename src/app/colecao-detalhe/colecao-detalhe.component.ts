import { Component, OnInit } from "@angular/core";
import { Route, ActivatedRoute, Router } from "@angular/router";

import { ColecaoService } from "app/services/colecao.service";
import { VolumeService } from "app/services/volume.service";
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: "mt-colecao-detalhe",
  templateUrl: "./colecao-detalhe.component.html",
  styleUrls: ["./colecao-detalhe.component.css"]
})
export class ColecaoDetalheComponent implements OnInit {
  colecao: any = {};

  volumes: any[] = [];

  exibir = false;

  idColecao: number;

  subChange: Subscription;

  constructor(
    private colecaoService: ColecaoService,
    private volumeService: VolumeService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      if (!params.id) {
        this.router.navigate(["/"]);
      }

      this.idColecao = params.id;

      this.colecaoService.buscar(this.idColecao).subscribe(
        res => {
          this.colecao = res.json();
        },
        () => {
          this.router.navigate(["/"]);
        }
      );

      this.carregarVolumes();

      this.subChange = this.volumeService.change.subscribe(() => {
        this.carregarVolumes();
      });
    });
  }

  private carregarVolumes() {
    this.volumeService.buscarPorTitulo(this.idColecao).subscribe(res => {
      this.volumes = res.json();

      if (!this.volumes.length) {
        this.exibir = true;
      }
    });
  }

  ngOnDestroy() {
    this.subChange.unsubscribe();
  }
}
