import { Request, Response } from 'express';

export const margemLucro5 = async (req: Request, res: Response) => {

    const precoCompra = parseFloat(req.body.precoCompra);
    const precoVenda5 = parseFloat(req.body.precoVenda5);

    // Realizar a soma
    const margemLucro5 = ((precoVenda5 - precoCompra) / precoCompra) * 100;

    // Retornar o resultado
    res.json({ margemLucro5: margemLucro5 });
};