import { PropostaModel } from './proposta-model';
import { NotaAtendimentoModel } from './notaatendimento-model';

export class AtendimentoModel{

    id: number;

    seq: number;

    proposta: PropostaModel;

    dtRealizado: string;

    nota: NotaAtendimentoModel;

}