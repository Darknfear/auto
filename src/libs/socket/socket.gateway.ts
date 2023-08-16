import { JwtService } from '@nestjs/jwt';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { WsException } from '@nestjs/websockets';
import { sumBy } from 'lodash';
import { SignOptions } from 'jsonwebtoken';
import { ConfigurationsEnum } from '@configs/configurations.enum';
import { ConfigurationsService } from '@configs/configurations.service';

interface IUserSocketIO {
  socketId: string;
  accountId: string;
  client: Socket;
  profileId?: string;
  practitionerClientId?: string;
  clientId?: string;
}

interface TokenPayload {
  accountId: string;
  email: string;
  clientId: string;
}

@WebSocketGateway({ namespace: '', cors: { origin: '*' } })
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private readonly jwtOptions: SignOptions;
  private readonly jwtKey: string;
  constructor(
    private jwtService: JwtService,
    private readonly configurationsService: ConfigurationsService,
    private readonly accountRepository: any,
    private readonly userRoomRepository: any,
    private readonly profileRepository: any,
    private readonly practitionerClientRepository: any,
  ) {
    this.jwtOptions = {
      expiresIn:
        configurationsService.get(ConfigurationsEnum.JWT_EXPIRE_IN) ||
        30 * 60 * 1000,
    };
    this.jwtKey = configurationsService.get(ConfigurationsEnum.JWT_SECRET);
  }

  @WebSocketServer()
  server: Server;

  users: IUserSocketIO[] = [];

  async handleConnection(client: Socket): Promise<void> {
    try {
      let profile: any = null,
        practitionerClient: any = null;
      const accessToken: string = client.handshake.query.accessToken as string;
      const profileId: string = client.handshake.query.profileId as string;

      const payload: TokenPayload = this.jwtService.verify(accessToken, {
        secret: this.jwtKey,
      });
      const account = await this.accountRepository.findOneBy({
        id: payload.accountId,
      });
      if (payload.clientId) {
        practitionerClient = await this.practitionerClientRepository.findOneBy({
          profileId,
          clientId: payload.clientId,
        });
      } else {
        profile = await this.profileRepository.findOneBy({ id: profileId });
      }
      if (!account && (!profile || !practitionerClient))
        throw new WsException('Invalid credentials.');

      this.users.push({
        socketId: client.id,
        accountId: account.id,
        client,
        profileId: profileId,
        practitionerClientId: practitionerClient?.id || null,
        clientId: practitionerClient?.clientId || null,
      });
      return;
    } catch (e) {
      console.error('Have error on socket handleConnection', e.message);
      return;
    }
  }

  async handleDisconnect(client: Socket): Promise<void> {
    this.users = this.users.filter((user) => user.socketId !== client.id);
  }

  sendNotification(groupName: string, chanel: string, data): void {
    this.server.to(groupName).emit(chanel, data);
  }

  createRoom(groupName: string, chanel: string, data): void {
    this.server.to(groupName).emit(chanel, data);
  }

  sendMessage(groupName: string, chanel: string, data): void {
    this.server.to(groupName).emit(chanel, data);
  }

  sendOnlineProfile(groupName: string, chanel: string, data): void {
    this.server.to(groupName).emit(chanel, data);
  }

  @SubscribeMessage('userTyping')
  onUserTyping(client: Socket, message: string): void {
    client.broadcast.emit('userTyping', message);
  }

  @SubscribeMessage('joinRoom')
  async onUserJoinRoom(client: Socket, room: string): Promise<void> {
    const profileId: string = client.handshake.query.profileId as string;
    void client.join(String(room));
    const user = this.users.find((user) => user.socketId === client.id);
    if (user && `PROFILE-${profileId || user.practitionerClientId}` === room) {
      this.sendOnlineProfile(
        `PROFILE-${user.profileId || user.practitionerClientId}`,
        'listProfileOnline',
        this.users.map((user) => ({ profileId: user.profileId })),
      );
      const totalUnreadMessage =
        await this.userRoomRepository.getAllRoomUnreadMessage(
          user.profileId,
          user.practitionerClientId,
        );
      this.sendMessage(
        `PROFILE-${user.profileId || user.practitionerClientId}`,
        'totalUnreadMessage',
        {
          totalUnreadMessage:
            Number(sumBy(totalUnreadMessage, 'totalUnreadMessage')) || 0,
        },
      );
    }
  }

  @SubscribeMessage('leaveRoom')
  onUserLeaveRoom(client: Socket, room: string): void {
    void client.leave(String(room));
  }
}
