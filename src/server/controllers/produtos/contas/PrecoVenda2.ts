import { Request, Response } from 'express';

export const precoVenda2 = async (req: Request, res: Response) => {

    const precoCompra = parseFloat(req.body.precoCompra);
    const margemLucro2 = parseFloat(req.body.margemLucro2);

    // Realizar a soma
    const precoVenda2 = precoCompra + (precoCompra * (margemLucro2 / 100));

    // Retornar o resultado
    res.json({ precoVenda2: precoVenda2 });
};