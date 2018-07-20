import { Perfil } from "./perfil.model";

export class UsuarioModel{
    
    id: number;

    login?: string;

    senha: string;

    cpf: number;

    rg: string;

    nome: string;

    nascimento: Date;

    cep: number;

    logradouro: string;

    bairro: string;

    cidade: string;

    porta: string;

    email: string;

    imgPerfil?: string;

    perfil: Perfil;

    sexo: number;

    facebookId: string;

    googleId: string;

    onesignalId: string;

    ativo: boolean;

}