import { Usuario } from "./usuario.model";

export class Plan {
    _id: string;
    tipoPlan: string;
    valor:string;
    usuario:Usuario;
    //==========PLAN 1 ===========//
    amount: string;
    clientTransactionId:string;
    optionalParameter1: string;
    optionalParameter2: string;
    reference: string;
}