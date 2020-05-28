import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../core/base-entity';
import { SUPPORTED_ROLES } from './role.constants';

@Entity()
export class Role extends BaseEntity {

    @Column()
    name: SUPPORTED_ROLES;

}
