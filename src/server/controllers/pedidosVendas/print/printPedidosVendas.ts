import { Request, Response } from 'express';
import * as pdf from 'html-pdf';
import ejs from 'ejs';
import path from 'path';
import { PedidosVendasProvider } from '../../../database/providers';


export const printPedidosVendas = async (req: Request, res: Response) => {
    // pegar os dados do pedidos de vendas
    const result = await PedidosVendasProvider.getById(req.body.id);
    
    // Vê se deu erro
    if (result instanceof Error) {
        console.error('Erro ao obter o pedido de vendas:', result);
        return res.status(500).send('Erro ao obter o pedido de vendas.');
    }
    
    

    

    // nome do arquivo para salvar e dar o link
    const nomeDoArquivo = `${result.pedidoId?.toString() ?? ''}${result.empresaId?.toString() ?? ''}.pdf`;    
    // dá o nome verdadeiro para salvar e dá o caminho para o arquivo
    const filePath = path.join(__dirname, 'print.ejs');
    
    ejs.renderFile(filePath, { 
        nome: result.clienteId

    }, (err, html) => {
        if (err) { // Erro com o print.ejs
            console.error('Erro na leitura do arquivo "print.ejs":', err);
            res.status(500).send('Erro na leitura do arquivo.');
        } else {
            const options = {}; // Opções do pdf.create() aqui
            pdf.create(html, options).toFile(nomeDoArquivo, (err, pdfRes) => { // Criar o pdf
                if (err) { // erro em criar o pdf
                    console.error('Erro na criação do arquivo PDF:', err);
                    res.status(500).send('Erro na criação do arquivo PDF.');
                } else { // Enviar o link para o front
                    const pdfPath = path.join(__dirname, nomeDoArquivo);
                    // Enviar uma resposta JSON com o caminho do arquivo
                    res.json({ filePath: pdfPath });
                }
            });
        }
    });
};
