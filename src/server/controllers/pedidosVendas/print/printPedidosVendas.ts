import { Request, Response } from 'express';
import * as pdf from 'html-pdf';
import ejs from 'ejs';
import path from 'path';

export const printPedidosVendas = async (req: Request, res: Response) => {
    console.log(req);

    const nome = 'Fernando Nunes';

    const filePath = path.join(__dirname, 'print.ejs');

    
    ejs.renderFile(filePath, { nome: nome }, (err, html) => {
        if (err) {
            console.error('Erro na leitura do arquivo "print.ejs":', err);
            res.status(500).send('Erro na leitura do arquivo.');
        } else {
            const options = {}; // Opções do pdf.create() aqui
            pdf.create(html, options).toFile('meuPDF.pdf', (err, pdfRes) => {
                if (err) {
                    console.error('Erro na criação do arquivo PDF:', err);
                    res.status(500).send('Erro na criação do arquivo PDF.');
                } else {
                    const pdfPath = path.join(__dirname, 'meuPDF.pdf');
                    // Enviar uma resposta JSON com o caminho do arquivo
                    res.json({ filePath: pdfPath });
                }
            });
        }
    });
};

/**
import { Request, Response } from 'express';
import * as pdf from 'html-pdf';
import ejs from 'ejs';
import path from 'path';

export const printPedidosVendas = async (req: Request, res: Response) => {
    console.log(req);

    const nome = 'Fernando';

    const filePath = path.join(__dirname, 'print.ejs');

    
    ejs.renderFile(filePath, { nome: nome }, (err, html) => {
        if (err) {
            console.error('Erro na leitura do arquivo "print.ejs":', err);
            res.status(500).send('Erro na leitura do arquivo.');
        } else {
            console.log(html);
            const options = {}; // Opções do pdf.create() aqui
            pdf.create(html, options).toFile('meuPDF.pdf', (err, pdfRes) => {
                if (err) {
                    console.error('Erro na criação do arquivo PDF:', err);
                    res.status(500).send('Erro na criação do arquivo PDF.');
                } else {
                    const pdfPath = path.join(__dirname, 'meuPDF.pdf');
                    res.download(pdfPath, 'meuPDF.pdf', (err) => {
                        if (err) {
                            console.error('Erro ao enviar o arquivo para download:', err);
                            res.status(500).send('Erro ao enviar o arquivo para download.');
                        } else {
                            // Após o download exclui o arquivo
                            // fs.unlinkSync(pdfPath);
                        }
                    });
                }
               
            });
        }
    });
    
};
 */

/**
import { Request, Response } from 'express';
import * as pdf from 'html-pdf';
import ejs from 'ejs';
import path from 'path';

export const printPedidosVendas = async (req: Request, res: Response) => {
    console.log(req);

    const nome = 'Fernando';

    const filePath = path.join(__dirname, 'print.ejs');

    ejs.renderFile(filePath, { nome: nome }, (err, html) => {
        if (err) {
            console.error('Erro na leitura do arquivo "print.ejs":', err);
            res.status(500).send('Erro na leitura do arquivo.');
        } else {
            console.log(html);
            const options = {}; // Opções do pdf.create() aqui
            pdf.create(html, options).toFile('testePDF.pdf', (err, pdfRes) => {
                if (err) {
                    console.error('Erro na criação do arquivo PDF:', err);
                    res.status(500).send('Erro na criação do arquivo PDF.');
                } else {
                    console.log(pdfRes);
                    res.send('PDF criado com sucesso.');
                }
            });
        }
    });
};
*/


/**
import { Request, Response, response } from 'express';
import path from 'path';
import ejs from 'ejs';
import * as pdf from 'html-pdf';

export const printPedidosVendas = async (req: Request, res: Response) => {
    const passageiros = [
        {
            nome: 'Antonio',
            voo: '133'
        },
        {
            nome: 'Carlos',
            voo: '134'
        }
    ];

    const filePath = path.join(__dirname, 'print.ejs'); // Caminho para o arquivo print.ejs

    ejs.renderFile(filePath, { passageiros }, (err, html) => {
        if (err) {
            console.error('Erro na leitura do arquivo:', err);
            return res.send('Erro na leitura do arquivo');
        } 

        const options = {
            height: '11.251in',
            width: '8.1in',
            header: {
                height: '20mm'
            },
            footer: {
                height: '20mm'
            }
        };

        // criar o pdf
        pdf.create(html, options).toFile('report.pdf', (err, data) => {
            if (err) {
                console.error('Erro ao gerar o pdf:', err);
                return res.send('Erro ao gerar o pdf');
            }
            // enviar para o front
            return response.send(html);
        });

        // enviar para o front
        return response.send(html);

        // Use o conteúdo renderizado do arquivo 'print.ejs' conforme necessário
        console.log('Conteúdo renderizado:', html);
    });    
};
*/

/**
import { Request, Response } from 'express';
import PdfPrinter from 'pdfmake';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import fs from 'fs';

export const printPedidosVendas = async (req: Request, res: Response) => {
    try {
        const fonts = {
            Roboto: {
                normal: 'fonts/Roboto-Regular.ttf',
                bold: 'fonts/Roboto-Medium.ttf',
                italics: 'fonts/Roboto-Italic.ttf',
                bolditalics: 'fonts/Roboto-MediumItalic.ttf'
            }
        };

        const printer = new PdfPrinter(fonts);

        // Construir formulário
        const docDefinitions: TDocumentDefinitions = {
            defaultStyle: { font: 'Roboto' },
            content: [
                { text: 'Meu vendas relatório' },
            ]
        };

        const pdfDoc = printer.createPdfKitDocument(docDefinitions);

        const chunks: Buffer[] = [];

        pdfDoc.on('data', (chunk) => {
            chunks.push(chunk);
        });

        pdfDoc.on('end', () => {
            const result = Buffer.concat(chunks);
            
            // Enviar o PDF como download
            res.setHeader('Content-Disposition', 'attachment; filename="relatorio.pdf"');
            res.setHeader('Content-Type', 'application/pdf');
            res.send(result);

            // Ou abrir o PDF em uma nova aba
            res.setHeader('Content-Type', 'application/pdf');
            res.send(result);
        });

        pdfDoc.end();
        
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao imprimir nota fiscal');
    }
};
 */