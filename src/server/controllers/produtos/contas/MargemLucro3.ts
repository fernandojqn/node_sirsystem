import { Request, Response } from 'express';

export const margemLucro3 = async (req: Request, res: Response) => {

    const precoCompra = parseFloat(req.body.precoCompra);
    const precoVenda3 = parseFloat(req.body.precoVenda3);

    // Realizar a soma
    const margemLucro3 = ((precoVenda3 - precoCompra) / precoCompra) * 100;

    // Retornar o resultado
    res.json({ margemLucro3: margemLucro3 });
};