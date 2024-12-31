export class UserEntity {
  id: string | undefined;
  name: string;

  private constructor(params: { id: string | undefined; name: string }) {
    this.id = params.id;
    this.name = params.name;
  }

  static create(params: { name: string }): UserEntity {
    return new UserEntity({
      id: undefined,
      ...params,
    });
  }

  update(params: { name: string }): UserEntity {
    return new UserEntity({
      id: this.id,
      ...params,
    });
  }

  static toEntity(params: { id: string; name: string }): UserEntity {
    return new UserEntity({
      ...params,
    });
  }
}
