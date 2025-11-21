import { Injectable } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';
import { BcPingResponse } from './dto/bc-ping-response';

@Injectable()
export class BcService {
  private readonly bcBaseUrl: string;
  private readonly username: string;
  private readonly password: string;

  constructor() {
    this.bcBaseUrl = process.env.BC_URL || '';
    this.username = process.env.BC_USER || '';
    this.password = process.env.BC_PASSWORD || '';
  }

  async ping(): Promise<BcPingResponse> {
    try {
      // axios.get<BcPingResponse> – jasne typowanie odpowiedzi
      const response: AxiosResponse = await axios.get(this.bcBaseUrl, {
        auth: {
          username: this.username,
          password: this.password,
        },
      });

      // teraz response.status ma typ: number → BŁĄD ZNIKA
      return {
        ok: true,
        status: response.status,
      };
    } catch (e: unknown) {
      let message = 'Unknown error connecting to BC';

      // najbezpieczniejsza wersja — klasyk Enterprise
      if (axios.isAxiosError(e)) {
        message = e.message;
      } else if (e instanceof Error) {
        message = e.message;
      }

      return {
        ok: false,
        error: message,
      };
    }
  }
}
