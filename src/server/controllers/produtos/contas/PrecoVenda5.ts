import { Request, Response } from 'express';

export const precoVenda5 = async (req: Request, res: Response) => {

    const precoCompra = parseFloat(req.body.precoCompra);
    const margemLucro5 = parseFloat(req.body.margemLucro5);

    // Realizar a soma
    const precoVenda5 = precoCompra + (precoCompra * (margemLucro5 / 100));

    // Retornar o resultado
    res.json({ precoVenda5: precoVenda5 });
};