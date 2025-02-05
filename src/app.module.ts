import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './users/user.entity';
import { Report } from './reports/report.entity';

import { AppService } from './app.service';
import { AppController } from './app.controller';

import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [
        User,
        Report
      ],
      synchronize: true
    }),
    MessagesModule, UsersModule, ReportsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
