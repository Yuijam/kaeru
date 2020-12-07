import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};



export type Query = {
  __typename?: 'Query';
  records?: Maybe<Array<Record>>;
};

export type Record = {
  __typename?: 'Record';
  id: Scalars['Int'];
  lineId: Scalars['Int'];
  statusCd: Scalars['String'];
  message: Scalars['String'];
  msgId: Scalars['String'];
  deletedAt?: Maybe<Scalars['String']>;
  createdAt: Scalars['String'];
};

export type GetRecordsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetRecordsQuery = (
  { __typename?: 'Query' }
  & { records?: Maybe<Array<(
    { __typename?: 'Record' }
    & Pick<Record, 'id' | 'msgId' | 'lineId' | 'message' | 'statusCd' | 'createdAt' | 'deletedAt'>
  )>> }
);

export const GetRecordsDocument = gql`
    query GetRecords {
  records {
    id
    msgId
    lineId
    message
    statusCd
    createdAt
    deletedAt
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetRecordsGQL extends Apollo.Query<GetRecordsQuery, GetRecordsQueryVariables> {
    document = GetRecordsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }