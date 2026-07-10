declare module "cloudflare:workers" {
  export const env: {
    EMAIL: {
      send(message: {
        from: string;
        to: string;
        subject: string;
        text?: string;
        html?: string;
        attachments?: Array<{
          filename: string;
          content: string;
          type?: string;
          disposition?: "attachment" | "inline";
        }>;
      }): Promise<void>;
    };
  };
}
