import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { BcPingResponse } from './dto/bc-ping-response';

@Injectable()
export class BcService {
  private readonly bcBaseUrl: string;

  constructor() {
    this.bcBaseUrl = process.env.BC_API_BASE || '';
    console.log('BC_API_BASE loaded:', this.bcBaseUrl);
  }

  async ping(): Promise<BcPingResponse> {
    try {
      // jeszcze bez tokena, tylko test URL
      const response = await axios.get(this.bcBaseUrl, {
        validateStatus: () => true, // pozwala odczytać 401 bez wyjątku
      });

      // jeśli URL poprawny, ale brak tokena → BC zwróci 401
      return {
        ok: response.status >= 200 && response.status < 300,
        status: response.status,
        message: 'Request sent successfully',
      };
    } catch (e) {
      let msg = 'Unknown error';

      if (axios.isAxiosError(e) && e.message) msg = e.message;
      else if (e instanceof Error) msg = e.message;

      return {
        ok: false,
        error: msg,
      };
    }
  }
}
