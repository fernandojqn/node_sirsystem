import { Request, Response } from 'express';

export const precoVenda3 = async (req: Request, res: Response) => {

    const precoCompra = parseFloat(req.body.precoCompra);
    const margemLucro3 = parseFloat(req.body.margemLucro3);

    // Realizar a soma
    const precoVenda3 = precoCompra + (precoCompra * (margemLucro3 / 100));

    // Retornar o resultado
    res.json({ precoVenda3: precoVenda3 });
};