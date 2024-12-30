export class User {
  id: string | undefined;
  name: string;

  private constructor(params: { id?: string; name: string }) {
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
