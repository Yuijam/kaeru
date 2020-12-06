// import {IResolvers, TPare} from 'graphql';
import {Resolver, Resolvers, StatusCd} from '../generated/graphql';

export const resolvers: Resolvers = {
  Query: {
    records: (parent, args, context) => [
      {
        id: '1',
        lineId: 1,
        statusCd: StatusCd.Normal,
        message: 'vvv',
        msgId: 'msgid',
        createdAt: 'crateat',
      },
    ],
  },
};
