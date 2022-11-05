import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleResolver } from './role.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Role, RoleSchema } from './role.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Role.name,
        schema: RoleSchema,
      },
    ]),
  ],
  providers: [RoleResolver, RoleService],
  exports: [RoleService],
})
export class RoleModule {}
