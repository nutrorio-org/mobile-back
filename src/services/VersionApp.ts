import { prisma } from './prisma';

export class VersionApp {
  async addVersion() {
    await prisma.appVersion.upsert({
      update: { version: '2.2.4' },
      where: { indentify: 'mobile-version' },
      create: { version: '2.2.4' },
    });
  }
  async getVersion() {
    const data = await prisma.appVersion.findFirst({
      where: { indentify: 'mobile-version' },
    });
    return data?.version ?? '2.2.4';
  }
}
