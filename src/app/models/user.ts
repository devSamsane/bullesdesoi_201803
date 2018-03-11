export class User {
  constructor(
    public email: string,
    public firstName: string,
    public lastName: string,
    public displayName: string,
    public phone: string,
    public created: Date,
    public password?: string,
    public id?: string,
    public updated?: Date,
    public hasResetInProgress?: boolean,
    public isActive?: boolean,
    public seances?: string[]
  ) {}
}
