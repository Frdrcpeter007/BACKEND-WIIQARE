import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from '../../common/decorators/public.decorator';
import {
  AuthorizeVoucherTransferDto,
  ProviderValidateEmailDto,
  RegisterProviderDto,
} from './dto/provider.dto';
import { ProviderService } from './provider-svc.service';
import { Roles } from '../../common/decorators/user-role.decorator';
import { UserRole } from '../../common/constants/enums';

@ApiTags('Provider')
@Controller('provider')
export class ProviderController {
  constructor(private providerService: ProviderService) {}

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
  @Get('provider-voucher-details')
  @Roles(UserRole.PROVIDER)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary:
      'API endpoint is used to retrieve the voucher details  by TxNo shortened hash, It sends also the transaction verification code to patient',
  })
  getVoucherDetailsByTxNoShortenedHash(
    @Query('shortenHash') shortenHash: string,
  ): Promise<Record<string, any>> {
    return this.providerService.getTransactionByShortenHash(shortenHash);
  }

  @Post('provider-authorize-voucher-transfer')
  @Roles(UserRole.PROVIDER)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary:
      'API endpoint is used to voucher transfer from Patient to Provider',
  })
  providerAuthorizeVoucherTransfer(
    @Body() payload: AuthorizeVoucherTransferDto,
  ): Promise<Record<string, any>> {
    const { shortenHash, providerId, securityCode } = payload;
    return this.providerService.authorizeVoucherTransfer(
      shortenHash,
      providerId,
      securityCode,
    );
  }
}
