import { Injectable } from '@nestjs/common';
import { ConsultaDto } from './dtos/integraContador.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { readFileSync } from 'fs';
import { join } from 'path';
import * as https from 'https';
import { AxiosRequestConfig } from 'axios';

@Injectable()
export class IntegraContadorService {
  constructor(private readonly http: HttpService) {}

  async autenticar() {
    const url = 'https://autenticacao.sapi.serpro.gov.br/authenticate';
    const certPath = join(process.cwd(), 'src', 'certs', 'simplescon_cert.pfx');
    const certBuffer = readFileSync(certPath);
    const certPassword = '123456';

    const httpsAgent = new https.Agent({
      pfx: certBuffer,
      passphrase: certPassword,
    });

    const key = '7d9lWdxTgEBUFz64aG0_gFmg2VMa';
    const secret = 'dy4YsuUimzsCTQTUApCxbh0xUWsa';

    const base64 = Buffer.from(`${key}:${secret}`).toString('base64');
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${base64}`,
      'role-type': 'TERCEIROS',
    };
    const body = new URLSearchParams();
    body.append('grant_type', 'client_credentials');

    const config: AxiosRequestConfig = {
      httpsAgent,
      headers,
    };

    const request = this.http.post(url, body.toString(), config);
    const response = await firstValueFrom(request);
    const auth = response.data;
    return auth;
  }

  async consultar(dto: ConsultaDto) {
    const { cnpj, serviceCode } = dto;
    const auth = await this.autenticar();
    const token = auth.access_token;
    const jwt = auth.jwt_token;
    const baseUrl = 'https://gateway.apiserpro.serpro.gov.br/integra-contador/v1'
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'jwt_token': jwt,
    }



    const body = {
      contratante: {
        numero: '54563262000193',
        tipo: 2,
      },
      autorPedidoDados: {
        numero: '54563262000193',
        tipo: 2,
      },
      contribuinte: {
        numero: '37558352000177',
        tipo: 2,
      },
      pedidoDados: {
        idSistema: 'PGDASD',
        idServico: 'GERARDAS12',
        versaoSistema: '1.0',
        dados: "{\"anoCalendario\":\"2023\"}",
      },
    };

    let servicePath = '';

    switch (serviceCode) {
      case '1':
        servicePath = '/Emitir';
        break;
      case '2':
        servicePath = '/Consultar';
        break;
      case '3':
        servicePath = '/Declarar';
        break;
      default:
        break;
    }

    const url = `${baseUrl}${servicePath}`;
    const request = this.http.post(url, body, { headers });
    const response = await firstValueFrom(request);
    const data = response.data;
    return data;

  }
}
