import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Redirect,
} from '@nestjs/common';
import { ShortLinksService } from '../providers';
import { ShortLinksEntity } from 'src/entity';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { ShortLinkDto } from '../dto/shortlinks.dto';

@Controller('shortlinks')
export class ShortLinksController {
  constructor(private readonly ShortLinkService: ShortLinksService) {}

  @Post()
  @ApiCreatedResponse({
    type: ShortLinksEntity,
  })
  @ApiOperation({ summary: 'Create shortlink' })
  async createShortLink(@Body() data: ShortLinkDto) {
    const createdShortLink = await this.ShortLinkService.createShortLink(
      data.url,
    );
    return createdShortLink;
  }

  @Delete(':shortLink')
  @ApiOperation({ summary: 'Delete shortlink' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Short link deleted successfully',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Short link not found',
  })
  async deleteShortLink(@Param('shortLink') shortLink: string) {
    const deletedShortLink = await this.ShortLinkService.deleteShortLink(
      shortLink,
    );
    if (!deletedShortLink) {
      throw new NotFoundException('Short link not found');
    }
    return 'Short link deleted successfully';
  }

  @Put(':shortLink')
  @ApiOperation({ summary: 'update shortlink' })
  @ApiOkResponse({
    type: ShortLinksEntity,
  })
  async updateShortLink(
    @Param('shortLink') shortLink: string,
    @Body() data: ShortLinkDto,
  ) {
    const updatedShortLink = await this.ShortLinkService.updateShortLink(
      shortLink,
      data.url,
    );
    return updatedShortLink;
  }

  @Get(':shortLink')
  @ApiOperation({ summary: 'Redirect shortlink' })
  @Redirect('https://docs.nestjs.com', 302)
  async RedirectShortLink(@Param('shortLink') shortLink: string) {
    const ShortLink = await this.ShortLinkService.getShortLink(shortLink);
    if (ShortLink == null) {
      throw new NotFoundException('Short link not found');
    }
    return { url: ShortLink.url };
  }

  @Get()
  @ApiOperation({ summary: 'Get all shortlinks' })
  async getAllShortLinks() {
    const ShortLinks = await this.ShortLinkService.getAllShortLinks();
    return ShortLinks;
  }
}
