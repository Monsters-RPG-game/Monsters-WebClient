import type { ISocketMessage, ISocketNewMessage } from '../types';
import { ESocketType } from '../enums';
import { saveLog } from '../communication';
import { sleep } from '../tools';

export default class Controller {
  private readonly _add: (target: string, message: string, send?: boolean) => Promise<void>;

  constructor(add: (target: string, message: string, notSend?: boolean) => void) {
    this._add = (target: string, command: string, notSend?: boolean): Promise<void> =>
      this.prepareAdd(add, target, command, notSend);
  }

  private _heartbeat: NodeJS.Timeout | undefined;

  private get heartbeat(): NodeJS.Timeout {
    return this._heartbeat as NodeJS.Timeout;
  }

  private set heartbeat(value: NodeJS.Timeout) {
    this._heartbeat = value;
  }

  private _retries: number = 0;

  private get retries(): number {
    return this._retries;
  }

  private set retries(value: number) {
    this._retries = value;
  }

  private _client: WebSocket | undefined;

  private get client(): WebSocket {
    return this._client as WebSocket;
  }

  private set client(value: WebSocket) {
    this._client = value;
  }

  private get add(): (target: string, message: string, notSend?: boolean) => Promise<void> {
    return this._add;
  }

  init(): void {
    const server = import.meta.env.VITE_API_WS_BACKEND as string;
    this.client = new WebSocket(server);

    this.startListeners();
    this.initHeartbeat();
  }

  async close(reason?: string): Promise<void> {
    if (!this._client) return;
    this._client.close();
    this._client = undefined;

    if (reason) {
      let r: { type: 'error'; payload: Record<string, unknown> } | string = reason;
      try {
        r = JSON.parse(r) as { type: 'error'; payload: Record<string, unknown> };
      } catch (err) {
        // ignored
      }

      await this.add('System', 'Connection with server closed. Retrying', true);
      console.log('Socket closed');
      console.log(r);

      await this.reconnect();
    }
  }

  private async reconnect(): Promise<void> {
    console.log('reconnecting');
    if (this.client.readyState !== 3) {
      await this.add('System', 'Server reconnected', true);
      return;
    }
    if (this.retries === 10) {
      await this.add(
        'System',
        'Could not reconnect to server after 10 retries. Connection that died is used to handle live updates and messages. Try to refresh this page after 2-3m',
        true,
      );
      return;
    }

    const server = import.meta.env.VITE_API_WS_BACKEND as string;
    this.client = new WebSocket(server);
    this.retries++;
    await sleep(5000);
    await this.reconnect();
  }

  private initHeartbeat(): void {
    this.heartbeat = setInterval(() => {
      this.ping();
    }, 5000);
  }

  private ping(): void {
    if (this.retries === 10) {
      this.add(
        'System',
        'Server disconnected. Connection that got destroyed is used to handle live updates and messages. Try to refresh this page after 2-3m',
        true,
      ).catch((err) => {
        console.log("Couldn't add data");
        console.log(err);
      });
      clearInterval(this.heartbeat);
    } else {
      this.retries++;
      this.client?.send('ping');
    }
  }

  private startListeners(): void {
    this.client.onopen = (): void => {
      console.log('websocket connected');
    };
    this.client.onerror = (err): void => {
      console.log(err);
    };
    this.client.onmessage = (msg: MessageEvent<unknown>): void => {
      this.handleMessage(msg.data as string).catch((err) => {
        console.log('Got error with websocket message', err);
      });
    };
    this.client.onclose = async (e): Promise<void> => this.close(e.reason);
  }

  private async handleMessage(msg: string): Promise<void> {
    let parsed: ISocketMessage | Record<string, string> = {};

    try {
      parsed = JSON.parse(msg) as ISocketMessage;
    } catch (err) {
      console.log("Couldn't parse socket message");
      console.log('err');
      console.log(err);
    }

    switch (parsed.type as ESocketType) {
      case ESocketType.Message:
        await this.handleUserMessage(parsed.payload as ISocketNewMessage);
        break;
      default:
        console.log('Unknown websocket message');
        console.log(parsed);
        break;
    }
  }

  private async handleUserMessage(message: ISocketNewMessage): Promise<void> {
    await this.add('System', 'Received new message');
    await this.add(message.sender, message.body);
  }

  private async prepareAdd(
    add: (target: string, command: string) => void,
    target: string,
    input: string,
    notSend?: boolean,
  ): Promise<void> {
    add(target, input);
    if (!notSend) {
      await saveLog(target, input);
    }
  }
}
