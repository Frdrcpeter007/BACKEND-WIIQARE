import {
  IsEmail,
  IsEnum,
  IsISO31661Alpha2,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { BusinessType } from '../../../common/constants/enums';

export class ContactPersonDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  occupation: string;

  @IsNotEmpty()
  @IsISO31661Alpha2()
  country: string;

  @IsOptional()
  @IsString()
  homeAddress?: string;
}

export class RegisterProviderDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  emailVerificationToken: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  postalCode: string;

  @IsNotEmpty()
  @IsString()
  nationalId: string;

  @IsNotEmpty()
  @IsNumber()
  businessRegistrationNo: number;

  @IsNotEmpty()
  @IsEnum(BusinessType)
  businessType: BusinessType;

  // contact person details
  @IsNotEmpty()
  @IsString()
  contactPersonFirstName: string;

  @IsNotEmpty()
  @IsString()
  contactPersonLastName: string;

  @IsNotEmpty()
  @IsString()
  contactPersonPhone: string;

  @IsNotEmpty()
  @IsEmail()
  contactPersonEmail: string;

  @IsNotEmpty()
  @IsString()
  contactPersonOccupation: string;

  @IsNotEmpty()
  @IsISO31661Alpha2()
  contactPersonCountry: string;

  @IsOptional()
  @IsString()
  contactPersonHomeAddress?: string;
  // end of contact person details
}

export class ProviderValidateEmailDto {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export class AuthorizeVoucherTransferDto {
  @IsNotEmpty()
  @IsString()
  shortenHash: string;

  @IsNotEmpty()
  @IsUUID()
  providerId: string;

  @IsNotEmpty()
  @IsString()
  securityCode: string;
}

export class SearchTransactionDto {
  @IsNotEmpty()
  @IsUUID()
  providerId: string;
}
