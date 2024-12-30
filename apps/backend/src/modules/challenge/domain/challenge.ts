export class Challenge {
  id: string | undefined;
  title: string;

  private constructor(params: { id?: string; name: string }) {
    this.id = params.id;
    this.name = params.name;
  }

  static create(params: { name: string }): Challenge {
    return new Challenge({
      ...params,
    });
  }

  static update(params: { name: string }): Challenge {
    return new Challenge({
      ...params,
    });
  }

  static toEntity(params: { id: string; name: string }): Challenge {
    return new Challenge({
      ...params,
    });
  }
}
