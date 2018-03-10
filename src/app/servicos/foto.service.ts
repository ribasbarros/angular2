import { HttpClient, HttpHeaders } from "@angular/common/http";
import { FotoComponent } from "../foto/foto.component";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
// import { map } from "rxjs/operators";
import "rxjs/add/operator/map";

const url = 'http://localhost:3000/v1/fotos',
    cabecalho = {
        headers: new HttpHeaders({'Content-Type' : 'application/json'})
    }

@Injectable()
export class FotoService{

    constructor(private api: HttpClient){}

    listar(): Observable<FotoComponent[]>{
        return this.api.get<FotoComponent[]>(url)
    }

    cadastrar(foto: FotoComponent) : Observable<MensagensServico>{
        return this.api.post(url, foto, cabecalho)
                        .map(() => {
                            return new MensagensServico(`${foto.titulo} inserida com sucesso!`, `success`)
                        })
    }

    deletar(id: String) : Observable<MensagensServico>{
        return this.api.delete(`${url}/${id}`).map(() => {
            return new MensagensServico(`${id} excluido com sucesso!`, `success`)
        })
    }

    atualizar(foto: FotoComponent) : Observable<MensagensServico>{
        return this.api.put<FotoComponent>(`${url}/${foto._id}`, foto, cabecalho)
                    .map(() => {
                        return new MensagensServico(`${foto.titulo} alterado com sucesso!`, `warning`)
                    })
    }

    pesquisar(id: String) : Observable<FotoComponent> {
        return this.api.get<FotoComponent>(`${url}/${id}`)
    }
}

class MensagensServico {
    constructor(private _texto: string, 
                private _tipo: string){}

    get texto() : string{
        return this._texto
    }

    get tipo() : string{
        return this._tipo
    }
}