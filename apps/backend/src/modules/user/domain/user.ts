import { Injectable } from '@nestjs/common';

@Injectable()
export class User {
  id: string | undefined;
  name: string;

  constructor(params: { id?: string; name: string }) {
    this.id = params.id;
    this.name = params.name;
  }

  static create(params: { name: string }): User {
    return new User({
      ...params,
    });
  }

  static update(params: { name: string }): User {
    return new User({
      ...params,
    });
  }

  static toEntity(params: { id: string; name: string }): User {
    return new User({
      ...params,
    });
  }
}
