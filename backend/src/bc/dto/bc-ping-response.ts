export interface BcPingResponse {
  ok: boolean;
  status?: number;
  message?: string; // ← to dodajemy
  error?: string;
}
