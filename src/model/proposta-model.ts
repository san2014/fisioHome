import { ProfissionalModel } from './profissional-model';
import { ClienteModel } from './cliente-model';
import { TipoAtendimentoModel } from './tipoatendimento-model';

export class PropostaModel{

    id: number;

    tipoAtendimento: TipoAtendimentoModel;

    cliente: ClienteModel;

    profissional: ProfissionalModel;

    dataInicio: string;

    dataFim: string;

    qtd: number;

    avaliacaoCliente: string;

    avaliacaoProfissional: string;

}