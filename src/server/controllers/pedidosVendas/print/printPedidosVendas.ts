
import { Request, Response } from 'express';
import puppeteer from 'puppeteer';
import type { PaperFormat } from 'puppeteer';
import ejs from 'ejs';
import path from 'path';
import { PedidosVendasProdutosProvider, PedidosVendasProvider } from '../../../database/providers';

export const printPedidosVendas = async (req: Request, res: Response) => {
    // Pegar os dados do pedido de vendas    
    const result = await PedidosVendasProvider.printById(req.body.id);
    
    // Vê se deu erro
    if (result instanceof Error) {
        console.error('Erro ao obter o pedido de vendas:', result);
        return res.status(500).send('Erro ao obter o pedido de vendas.');
    }

    // Pegar produtos
    let resultProdutos;
    if (result.pedidoId && result.empresaId) {
        resultProdutos = await PedidosVendasProdutosProvider.printGetAll(result.pedidoId.toString(), result.empresaId); 
    }

    // nome do arquivo para salvar e dar o link
    const nomeDoArquivo = `p${result.pedidoId?.toString() ?? ''}_e${result.empresaId?.toString() ?? ''}.pdf`;

    // Colocar Mascaras
    const telefoneFormatado = result.telefone ? result.telefone.replace(/(\d{2})(\d{4})(\d{4})/,'($1) $2-$3') : '';
    const empTelefoneFormatado = result.empTelefone ? result.empTelefone.replace(/(\d{2})(\d{4})(\d{4})/,'($1) $2-$3') : '';
    const celularFormatado = result.celular ? result.celular.replace(/(\d{2})(\d{5})(\d{4})/,'($1) $2-$3') : '';
    const documentoFormatado = result.documento ? result.documento.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4') : '';
    const venDocumentoFormatado = result.venDocumento ? result.venDocumento.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4') : '';
    const cepFormatado = result.cep ? result.cep.replace(/(\d{5})(\d{3})/, '$1-$2') : '';

    //Pegar data no sistema
    const dataAtual = new Date();
    const dia = dataAtual.getDate();
    const mes = dataAtual.getMonth() + 1; // Os meses são indexados de 0 a 11, então adicionamos 1 para obter o mês atual correto
    const ano = dataAtual.getFullYear();
    const dataFormatada = `${dia}/${mes}/${ano}`;

    // dá o nome verdadeiro para salvar e dá o caminho para o arquivo
    const filePath = path.join(__dirname, 'print.ejs');
    
    ejs.renderFile(filePath, {
        dataImpressao: dataFormatada,
        pedido: result.pedidoId,
        cliente: result.sufixo,
        contato: result.contato,
        telefone: telefoneFormatado,
        celular: celularFormatado,
        email: result.email,
        totalNota: result.totalNota,
        validadeProposta: result.validadeProposta,
        formaDePagamento: result.vistaPrazo,
        prazoEntrega: result.prazoEntrega,
        garantia: result.garantia,
        observacoes: result.mensagemImpressao,
        sufixo: result.sufixo,        
        empSufixo: result.empSufixo,
        documento: documentoFormatado,
        inscricaoEstadual: result.inscricaoEstadual,
        empTelefone: empTelefoneFormatado,
        empEmail: result.empEmail,
        endereco: result.endereco,
        numero: result.numero,
        complemento: result.complemento,
        bairro: result.bairro,
        cidade: result.cidade,
        uf: result.uf,
        cep: cepFormatado,
        venNome: result.nome,
        venDocumento: venDocumentoFormatado,
        venCelular: result.venCelular,

        resultProdutos: resultProdutos //dados para a tabela

    }, async (err, html) => {
        if (err) { // Erro com o print.ejs
            console.error('Erro na leitura do arquivo "print.ejs":', err);
            res.status(500).send('Erro na leitura do arquivo.');
        } else {
            try {
                const browser = await puppeteer.launch();
                const page = await browser.newPage();
                await page.setContent(html);

                // Adicionar o CSS no cabeçalho da página
                await page.addStyleTag({
                    content: `
                    .footer {
                        position: fixed;
                        bottom: 0;
                        left: 0;
                        right: 0;
                    }
                    `
                });

                const pdfOptions = {
                    path: nomeDoArquivo,
                    format: 'A4' as PaperFormat
                };

                await page.pdf(pdfOptions);
                await browser.close();

                const pdfPath = path.join(__dirname, nomeDoArquivo);
                // Enviar uma resposta JSON com o caminho do arquivo
                res.json({ filePath: pdfPath });
            } catch (error) {
                console.error('Erro na criação do arquivo PDF:', error);
                res.status(500).send('Erro na criação do arquivo PDF.');
            }
        }
    });
};


/**
import { Request, Response } from 'express';
import * as pdf from 'html-pdf';
import ejs from 'ejs';
import path from 'path';
import { PedidosVendasProdutosProvider, PedidosVendasProvider } from '../../../database/providers';

export const printPedidosVendas = async (req: Request, res: Response) => {
    // Pegar os dados do pedido de vendas    
    const result = await PedidosVendasProvider.printById(req.body.id);
    
    // Vê se deu erro
    if (result instanceof Error) {
        console.error('Erro ao obter o pedido de vendas:', result);
        return res.status(500).send('Erro ao obter o pedido de vendas.');
    }

    // Pegar produtos
    let resultProdutos;
    if (result.pedidoId && result.empresaId) {
        resultProdutos = await PedidosVendasProdutosProvider.printGetAll(result.pedidoId.toString(), result.empresaId); 
    }

    // nome do arquivo para salvar e dar o link
    const nomeDoArquivo = `p${result.pedidoId?.toString() ?? ''}_e${result.empresaId?.toString() ?? ''}.pdf`;

    // Colocar Mascaras
    const telefoneFormatado = result.telefone ? result.telefone.replace(/(\d{2})(\d{4})(\d{4})/,'($1) $2-$3') : '';
    const empTelefoneFormatado = result.empTelefone ? result.empTelefone.replace(/(\d{2})(\d{4})(\d{4})/,'($1) $2-$3') : '';
    const celularFormatado = result.celular ? result.celular.replace(/(\d{2})(\d{5})(\d{4})/,'($1) $2-$3') : '';
    const documentoFormatado = result.documento ? result.documento.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4') : '';
    const venDocumentoFormatado = result.venDocumento ? result.venDocumento.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4') : '';
    const cepFormatado = result.cep ? result.cep.replace(/(\d{5})(\d{3})/, '$1-$2') : '';

    //Pegar data no sistema
    const dataAtual = new Date();
    const dia = dataAtual.getDate();
    const mes = dataAtual.getMonth() + 1; // Os meses são indexados de 0 a 11, então adicionamos 1 para obter o mês atual correto
    const ano = dataAtual.getFullYear();
    const dataFormatada = `${dia}/${mes}/${ano}`;

    // dá o nome verdadeiro para salvar e dá o caminho para o arquivo
    const filePath = path.join(__dirname, 'print.ejs');
    
    ejs.renderFile(filePath, {
        dataImpressao: dataFormatada,
        pedido: result.pedidoId,
        cliente: result.sufixo,
        contato: result.contato,
        telefone: telefoneFormatado,
        celular: celularFormatado,
        email: result.email,
        totalNota: result.totalNota,
        validadeProposta: result.validadeProposta,
        formaDePagamento: result.vistaPrazo,
        prazoEntrega: result.prazoEntrega,
        garantia: result.garantia,
        observacoes: result.mensagemImpressao,
        sufixo: result.sufixo,        
        empSufixo: result.empSufixo,
        documento: documentoFormatado,
        inscricaoEstadual: result.inscricaoEstadual,
        empTelefone: empTelefoneFormatado,
        empEmail: result.empEmail,
        endereco: result.endereco,
        numero: result.numero,
        complemento: result.complemento,
        bairro: result.bairro,
        cidade: result.cidade,
        uf: result.uf,
        cep: cepFormatado,
        venNome: result.nome,
        venDocumento: venDocumentoFormatado,
        venCelular: result.venCelular,

        resultProdutos: resultProdutos //dados para a tabela

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
*/