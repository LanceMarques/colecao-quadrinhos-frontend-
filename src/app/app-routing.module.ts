import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ColecoesComponent } from "./colecoes/colecoes.component";
import { ColecaoDetalheComponent } from "./colecao-detalhe/colecao-detalhe.component";
import { AmigosComponent } from "./amigos/amigos.component";
import { EmprestimosComponent } from "./emprestimos/emprestimos.component";

const routes = [
  { path: "", component: ColecoesComponent },
  {
    path: "colecoes/:id",
    component: ColecaoDetalheComponent
  },
  {
    path: "amigos",
    component: AmigosComponent
  },
  {
    path: "emprestimos",
    component: EmprestimosComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
