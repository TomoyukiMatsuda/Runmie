export class UserEntity {
  id: string | undefined;
  name: string;
  supabaseId: string;

  private constructor(params: {
    id: string | undefined;
    name: string;
    supabaseId: string;
  }) {
    this.id = params.id;
    this.name = params.name;
    this.supabaseId = params.supabaseId;
  }

  static create(params: { name: string; supabaseId: string }): UserEntity {
    return new UserEntity({
      id: undefined,
      ...params,
    });
  }

  update(params: { name: string }): UserEntity {
    return new UserEntity({
      id: this.id,
      supabaseId: this.supabaseId,
      ...params,
    });
  }

  static toEntity(params: {
    id: string;
    name: string;
    supabaseId: string;
  }): UserEntity {
    return new UserEntity({
      ...params,
    });
  }
}
