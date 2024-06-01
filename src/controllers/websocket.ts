import type { ISocketMessage, ISocketOutMessage, ISocketNewMessage } from '../types';
import { ESocketType, ETokenNames } from '../enums';
import { Cookies } from '../tools';

export default class Controller {
  private readonly _add: (target: string, message: string) => Promise<void>;

  private _resolve: { action: ((val: void | PromiseLike<void>) => void), timer: NodeJS.Timeout | null } | undefined = undefined;

  constructor(add: (target: string, message: string) => void) {
    this._add = (target: string, command: string): Promise<void> => this.prepareAdd(add, target, command);
  }

  private _client: WebSocket | undefined;

  private _request: ((value: Promise<ISocketMessage> | ISocketMessage) => void) | undefined = undefined;

  private get resolve(): { action: (val: void | PromiseLike<void>) => void, timer: NodeJS.Timeout | null } {
    return this._resolve as { action: (val: void | PromiseLike<void>) => void, timer: NodeJS.Timeout | null };
  }

  private set resolve(val: { action: (val: void | PromiseLike<void>) => void, timer: NodeJS.Timeout | null }) {
    this._resolve = val;
  }

  private get client(): WebSocket {
    return this._client as WebSocket;
  }

  private set client(value: WebSocket) {
    this._client = value;
  }

  private get request(): ((value: Promise<ISocketMessage> | ISocketMessage) => void) | undefined {
    return this._request as ((value: Promise<ISocketMessage> | ISocketMessage) => void) | undefined;
  }

  private set request(value: ((value: Promise<ISocketMessage> | ISocketMessage) => void) | undefined) {
    this._request = value;
  }


  private get add(): (target: string, message: string) => Promise<void> {
    return this._add;
  }

  async init(): Promise<void> {
    // eslint-disable-next-line compat/compat
    return new Promise(resolve => {
      const server = import.meta.env.VITE_API_WS_BACKEND as string;
      this.client = new WebSocket(server);
      this.resolve = { action: resolve, timer: null };
      this.startListeners();
    });
  }

  close(reason?: string): void {
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
      console.log('Socket closed');
      console.log(r);
    }
  }

  async send(message: ISocketOutMessage): Promise<ISocketMessage> {
    // eslint-disable-next-line compat/compat
    return new Promise(resolve => {
      this.client.send(JSON.stringify(message));
      this.request = resolve;
    });
  }

  private startListeners(): void {
    this.client.onopen = (): void => {
      this.resolve.timer = setTimeout(() => {
        this.resolve.action();
      }, 2000);
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
    this.client.onclose = (e): void => this.close(e.reason);
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

    if (this.request) {
      this.request(parsed as ISocketMessage);
    }

    switch (parsed.type as ESocketType) {
      case ESocketType.Message:
        await this.handleUserMessage(parsed.payload as ISocketNewMessage);
        break;
      case ESocketType.Error:
        await this.handleError(parsed.payload as Error);
        break;
      default:
        console.log('Unknown websocket message');
        console.log(parsed);
        break;
    }
  }

  private async handleError(error: Error): Promise<void> {
    if (error.name === 'AwaitingAuthorizationError') {
      const cookies = new Cookies();
      const access = cookies.getToken(ETokenNames.Access);
      await this.send({
        target: 'authorization',
        subTarget: '',
        payload: {
          key: access
        }
      });
    } else {
      console.log('Got error from server', error);
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
  ): Promise<void> {
    add(target, input);
    // eslint-disable-next-line compat/compat
    await new Promise(resolve => {
      resolve('');
    });
  }
}

