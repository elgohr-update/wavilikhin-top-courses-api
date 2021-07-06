import { ConfigService } from '@nestjs/config';
import { TypegooseModuleOptions } from 'nestjs-typegoose';

export const getMongoConfig = async (
    configService: ConfigService,
): Promise<TypegooseModuleOptions> => {
    return {
        uri: getMongoString(configService),
        ...getMongoOptions(),
    };
};

const getMongoString = (configService: ConfigService) => {
    switch (configService.get('CI')) {
        case true:
            console.log(
                `\n\n######################\nUSING MONGO FOR CI, CI=${configService.get(
                    'CI',
                )}`,
            );
            return (
                'mongodb://' +
                configService.get('MONGO_HOST') +
                ':' +
                configService.get('MONGO_PORT') +
                '/' +
                configService.get('MONGO_AUTHDATABASE')
            );
        default:
            console.log(
                `\n\n######################\nUSING MONGO FOR PROD, CI=${configService.get(
                    'CI',
                )}`,
            );
            return (
                'mongodb://' +
                configService.get('MONGO_LOGIN') +
                ':' +
                configService.get('MONGO_PASSWORD') +
                '@' +
                configService.get('MONGO_HOST') +
                ':' +
                configService.get('MONGO_PORT') +
                '/' +
                configService.get('MONGO_AUTHDATABASE')
            );
    }
};

const getMongoOptions = () => ({
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});
