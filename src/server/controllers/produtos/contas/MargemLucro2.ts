import { Request, Response } from 'express';

export const margemLucro2 = async (req: Request, res: Response) => {

    const precoCompra = parseFloat(req.body.precoCompra);
    const precoVenda2 = parseFloat(req.body.precoVenda2);

    // Realizar a soma
    const margemLucro2 = ((precoVenda2 - precoCompra) / precoCompra) * 100;

    // Retornar o resultado
    res.json({ margemLucro2: margemLucro2 });
};