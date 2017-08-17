import { PropostaModel } from './proposta-model';

export class PropostaPagamentoModel{

    id: number;

    proposta: PropostaModel;

    valor: number;

    data: string;

    dataProcessamento: string;

    status: number;

    instituicao: number;

}