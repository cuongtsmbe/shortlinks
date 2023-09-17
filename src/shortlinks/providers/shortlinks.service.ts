import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ShortLinksEntity } from '../../entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ShortLinksService {
  constructor(
    @InjectRepository(ShortLinksEntity)
    private readonly ShortLinkRepository: Repository<ShortLinksEntity>,
  ) {}

  async getShortLink(shortLink: string): Promise<ShortLinksEntity | undefined> {
    return this.ShortLinkRepository.findOneBy({ shortlink: shortLink });
  }

  async getAllShortLinks(): Promise<ShortLinksEntity[]> {
    return this.ShortLinkRepository.find();
  }

  async updateShortLink(
    shortlink: string,
    longLink: string,
  ): Promise<ShortLinksEntity | undefined> {
    const existingShortLink = await this.ShortLinkRepository.findOneBy({
      shortlink: shortlink,
    });

    if (!existingShortLink) {
      throw new HttpException(
        'no-existing-short-link',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    // Merge the updated data into the existing ShortLink
    Object.assign(existingShortLink, { url: longLink, updatedAt: new Date() });

    return this.ShortLinkRepository.save(existingShortLink);
  }

  async deleteShortLink(shortlink: string): Promise<boolean> {
    const deleteResult = await this.ShortLinkRepository.delete({
      shortlink: shortlink,
    });
    return deleteResult.affected > 0;
  }

  async createShortLink(longLink: string): Promise<ShortLinksEntity[]> {
    const ShortLink: any = {
      shortlink: await this.randomUniqueShortlink(),
      url: longLink,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const newShortLink = this.ShortLinkRepository.create(ShortLink);
    return this.ShortLinkRepository.save(newShortLink);
  }

  async randomUniqueShortlink() {
    // Generate a random string of 6 characters.
    let shortlink = Math.random().toString(36).substring(7);
    // Check if the shortlink is already in use.
    while ((await this.getShortLink(shortlink)) != null) {
      shortlink = Math.random().toString(36).substring(7);
    }
    return shortlink;
  }
}
