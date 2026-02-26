import { Module } from '@nestjs/common';
import { VerificationsController } from './verifications.controller';
import { VerificationsService } from './verifications.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Essay } from './entity/essay.entity';
import { ChallengePost } from './entity/challengePost.entity';
import { Verification } from './entity/verification.entity';
import { VerificationRule } from './entity/verificationRule.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Essay]),
    TypeOrmModule.forFeature([ChallengePost]),
    TypeOrmModule.forFeature([Verification]),
    TypeOrmModule.forFeature([VerificationRule]),
  ],
  controllers: [VerificationsController],
  providers: [VerificationsService],
})
export class VerificationsModule {}
