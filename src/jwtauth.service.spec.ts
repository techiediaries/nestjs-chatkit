import { Test, TestingModule } from '@nestjs/testing';
import { JwtauthService } from './jwtauth.service';

describe('JwtauthService', () => {
  let service: JwtauthService;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JwtauthService],
    }).compile();
    service = module.get<JwtauthService>(JwtauthService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
