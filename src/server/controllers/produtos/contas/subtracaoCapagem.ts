import { Request, Response } from 'express';

export const subtracaoCapagem = async (req: Request, res: Response) => {

    const precoCompra = parseFloat(req.body.precoCompra);
    const capagem = parseFloat(req.body.capagem);

    // Realizar a soma
    const precoCusto = precoCompra - (precoCompra * (capagem / 100));

    // Retornar o resultado
    res.json({ precoCusto: precoCusto });
};