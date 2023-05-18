import { Request, Response } from 'express';

export const margemLucro4 = async (req: Request, res: Response) => {

    const precoCompra = parseFloat(req.body.precoCompra);
    const precoVenda4 = parseFloat(req.body.precoVenda4);

    // Realizar a soma
    const margemLucro4 = ((precoVenda4 - precoCompra) / precoCompra) * 100;

    // Retornar o resultado
    res.json({ margemLucro4: margemLucro4 });
};