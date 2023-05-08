import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from '../../common/decorators/public.decorator';
import {
  ProviderValidateEmailDto,
  RegisterProviderDto,
} from './dto/provider.dto';
import { ProviderService } from './provider-svc.service';

@ApiTags('Provider')
@Controller('provider')
export class ProviderController {
  constructor(private providerService: ProviderService) { }

  @Post()
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('logo'))
  @ApiBody({
    description: 'The required payload',
    type: RegisterProviderDto,
  })
  @ApiOperation({ summary: 'API endpoint for registering provider' })
  registerNewProvider(
    @UploadedFile() logo: Express.Multer.File,
    @Body() registerProviderDto: RegisterProviderDto,
  ): Promise<Record<string, any>> {
    return this.providerService.registerNewProvider(logo, registerProviderDto);
  }

  @Post('send-email-verification')
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'API endpoint for Provider to verify email' })
  verifyProviderEmail(
    @Body() providerValidateEmailDto: ProviderValidateEmailDto,
  ): Promise<void> {
    return this.providerService.providerVerifyEmail(providerValidateEmailDto);
  }
}
