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
  lineRecords?: Maybe<Array<Array<LineRecord>>>;
};


export type QueryLineRecordsArgs = {
  date?: Maybe<Scalars['String']>;
};

export type LineRecord = {
  __typename?: 'LineRecord';
  id: Scalars['Int'];
  lineId: Scalars['Int'];
  statusCd: Scalars['String'];
  message: Scalars['String'];
  msgId: Scalars['String'];
  createdAt: Scalars['String'];
};

export type GetLineRecordsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetLineRecordsQuery = (
  { __typename?: 'Query' }
  & { lineRecords?: Maybe<Array<Array<(
    { __typename?: 'LineRecord' }
    & Pick<LineRecord, 'id' | 'msgId' | 'message' | 'createdAt' | 'statusCd' | 'lineId'>
  )>>> }
);

export const GetLineRecordsDocument = gql`
    query GetLineRecords {
  lineRecords {
    id
    msgId
    message
    createdAt
    statusCd
    lineId
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetLineRecordsGQL extends Apollo.Query<GetLineRecordsQuery, GetLineRecordsQueryVariables> {
    document = GetLineRecordsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }