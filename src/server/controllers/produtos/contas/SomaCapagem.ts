import { Request, Response } from 'express';

export const somaCapagem = async (req: Request, res: Response) => {

    const precoCusto = parseFloat(req.body.precoCusto);
    const capagem = parseFloat(req.body.capagem);

    // Realizar a soma
    const precoCompra = precoCusto + (precoCusto * (capagem / 100));

    // Retornar o resultado
    res.json({ precoCompra: precoCompra });
};