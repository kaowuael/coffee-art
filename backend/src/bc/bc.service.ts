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

  private accessToken?: string;
  private tokenExpiresAt?: number;

  private async getToken(): Promise<string> {
    const now = Date.now();

    // gdy mamy token i nadal ważny → zwracamy jako string
    if (this.accessToken && this.tokenExpiresAt && now < this.tokenExpiresAt) {
      return this.accessToken;
    }

    const tokenUrl = `https://login.microsoftonline.com/${process.env.AZURE_TENANT_ID}/oauth2/v2.0/token`;

    const params = new URLSearchParams();
    params.append('client_id', process.env.AZURE_CLIENT_ID || '');
    params.append('client_secret', process.env.AZURE_CLIENT_SECRET || '');
    params.append('grant_type', 'client_credentials');
    params.append('scope', 'https://api.businesscentral.dynamics.com/.default');

    const response = await axios.post(tokenUrl, params, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });

    const { access_token, expires_in } = response.data;

    // >>> tu ustawiamy token i zawsze zwracamy STRING
    this.accessToken = access_token;
    this.tokenExpiresAt = now + (expires_in - 60) * 1000;

    return this.accessToken!; // <- gwarantuje STRING, nigdy null
  }

  async pingAuth() {
    try {
      const token = await this.getToken();

      const res = await axios.get(this.bcBaseUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        validateStatus: () => true,
      });

      return {
        ok: res.status >= 200 && res.status < 300,
        status: res.status,
      };
    } catch (e) {
      return { ok: false, error: e.message };
    }
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
