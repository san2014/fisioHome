import { PropostaModel } from './proposta-model';

export class DetalheNotificacao{
    
    tipo: string;
    
    oneSignalId: string;

    msg: string

    proposta?: PropostaModel;
    
}