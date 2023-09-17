import { Column, Entity, PrimaryColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
@Entity('ShortLinks')
export class ShortLinksEntity {
  @ApiProperty()
  @PrimaryColumn({ type: 'varchar', length: 255 })
  shortlink!: string;

  @ApiProperty()
  @Column('varchar', { length: 255 })
  url!: string;

  @ApiProperty()
  @Column('timestamp', { nullable: true })
  createdAt?: Date;

  @ApiProperty()
  @Column('timestamp', { nullable: true })
  updatedAt?: Date;
}
