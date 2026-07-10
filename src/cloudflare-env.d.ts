declare module "cloudflare:workers" {
  export const env: {
    EMAIL: {
      send(message: {
        from: string;
        to: string;
        subject: string;
        text?: string;
        html?: string;
      }): Promise<void>;
    };
  };
}
