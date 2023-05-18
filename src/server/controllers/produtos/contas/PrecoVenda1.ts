import { Request, Response } from 'express';

export const precoVenda1 = async (req: Request, res: Response) => {

    const precoCompra = parseFloat(req.body.precoCompra);
    const margemLucro1 = parseFloat(req.body.margemLucro1);

    // Realizar a soma
    const precoVenda1 = precoCompra + (precoCompra * (margemLucro1 / 100));

    // Retornar o resultado
    res.json({ precoVenda1: precoVenda1 });
};