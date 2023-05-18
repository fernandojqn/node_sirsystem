import { Request, Response } from 'express';

export const precoVenda4 = async (req: Request, res: Response) => {

    const precoCompra = parseFloat(req.body.precoCompra);
    const margemLucro4 = parseFloat(req.body.margemLucro4);

    // Realizar a soma
    const precoVenda4 = precoCompra + (precoCompra * (margemLucro4 / 100));

    // Retornar o resultado
    res.json({ precoVenda4: precoVenda4 });
};