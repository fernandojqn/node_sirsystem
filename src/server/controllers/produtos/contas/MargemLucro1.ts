import { Request, Response } from 'express';

export const margemLucro1 = async (req: Request, res: Response) => {
    
    const precoCompra = parseFloat(req.body.precoCompra);
    const precoVenda1 = parseFloat(req.body.precoVenda1);

    // Realizar a soma
    const margemLucro1 = ((precoVenda1 - precoCompra) / precoCompra) * 100;

    // Retornar o resultado
    res.json({ margemLucro1: margemLucro1 });
};