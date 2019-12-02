import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpModule } from "@angular/http";
import { RouterModule } from "@angular/router";

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { AppRoutingModule } from "./app-routing.module";
import { ColecoesComponent } from "./colecoes/colecoes.component";
import { ColecaoComponent } from "./colecoes/colecao/colecao.component";
import { ColecaoDetalheComponent } from "./colecao-detalhe/colecao-detalhe.component";
import { ItemVolumeComponent } from "./colecao-detalhe/item-volume/item-volume.component";
import { CriarVolumeComponent } from "./colecao-detalhe/criar-volume/criar-volume.component";
import { CriarColecaoComponent } from "./colecoes/criar-colecao/criar-colecao.component";
import { AmigosComponent } from "./amigos/amigos.component";
import { EmprestimosComponent } from "./emprestimos/emprestimos.component";
import { CriarEmprestimoComponent } from "./emprestimos/criar-emprestimo/criar-emprestimo.component";
import { CriarAmigoComponent } from "./amigos/criar-amigo/criar-amigo.component";
import { ReactiveFormsModule } from "@angular/forms";
import { AmigoService } from "./services/amigo.service";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CommonModule } from "@angular/common";
import { ToasterModule, ToasterService } from "angular2-toaster";
import { NgxLoadingModule } from "ngx-loading";

import { MensagemService } from "./services/mensagem.service";
import { EditarAmigoComponent } from "./amigos/editar-amigo/editar-amigo.component";
import { ColecaoService } from "./services/colecao.service";
import { EditarColecaoComponent } from "./colecoes/editar-colecao/editar-colecao.component";
import { VolumeService } from "./services/volume.service";
import { EditarVolumeComponent } from "./colecao-detalhe/editar-volume/editar-volume.component";

import { AutoCompleteModule } from "primeng/primeng";
import { ShortenPipe } from "./shared/shorten.pipe";
import { EmprestimoService } from "./services/emprestimo.service";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ColecoesComponent,
    ColecaoComponent,
    ColecaoDetalheComponent,
    ItemVolumeComponent,
    CriarVolumeComponent,
    CriarColecaoComponent,
    AmigosComponent,
    EmprestimosComponent,
    CriarEmprestimoComponent,
    CriarAmigoComponent,
    EditarAmigoComponent,
    EditarColecaoComponent,
    EditarVolumeComponent,
    ShortenPipe
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpModule,
    RouterModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AutoCompleteModule,
    ToasterModule,
    NgxLoadingModule.forRoot({})
  ],
  providers: [
    AmigoService,
    ColecaoService,
    ToasterService,
    VolumeService,
    MensagemService,
    EmprestimoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
