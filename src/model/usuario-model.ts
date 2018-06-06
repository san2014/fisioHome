export class UsuarioModel{
    
    id: number;

    login?: string;

    senha: string;

    cpf: number;

    rg: string;

    nome: string;

    dt_nasc: Date;

    cep: number;

    logradouro: string;

    bairro: string;

    cidade: string;

    numero_local: string;

    email: string;

    imgperfil?: string;

    tipo?: number;

    sexo: number;

    facebook_id: number;

    google_id: number;

    onesignal_id: string;

    flag_ativo: number;

}