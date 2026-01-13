declare module "*.svg" {
  const content: string;
  export default content;
}

declare global {
  interface WebSocket {
    name?: string;
  }
}