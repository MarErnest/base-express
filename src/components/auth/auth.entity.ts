import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from '../../core/base-entity';
import { Role } from '../roles/role.entity';
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_SIGNITURE } from '../../common/configs/env.conf';

@Entity()
export class Auth extends BaseEntity {

  @Column()
  email: string;

  @Column()
  hashedPassword: string;

  @ManyToMany(type => Role)
  @JoinTable()
  roles: Role[];

  public async setPassword(value: string) {
    this.hashedPassword = await bcrypt.hashSync(value, 10);
  }

  public checkPassword(rawPassword: string): boolean {
    return bcrypt.compareSync(rawPassword, this.hashedPassword);
  }

  public toJWT(): string {
    return jwt.sign({
      email: this.email,
      roles: this.roles
    }, JWT_SIGNITURE);
  }

}
