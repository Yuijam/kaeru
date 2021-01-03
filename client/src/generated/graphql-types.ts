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
  troubleCounts?: Maybe<Array<TroubleCount>>;
};


export type QueryLineRecordsArgs = {
  date?: Maybe<Scalars['String']>;
};


export type QueryTroubleCountsArgs = {
  dateStart: Scalars['String'];
  dateEnd: Scalars['String'];
};

export type TroubleCount = {
  __typename?: 'TroubleCount';
  lineName: Scalars['String'];
  count: Scalars['Int'];
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

export type GetLineRecordsQueryVariables = Exact<{
  date?: Maybe<Scalars['String']>;
}>;


export type GetLineRecordsQuery = (
  { __typename?: 'Query' }
  & { lineRecords?: Maybe<Array<Array<(
    { __typename?: 'LineRecord' }
    & Pick<LineRecord, 'id' | 'msgId' | 'message' | 'createdAt' | 'statusCd' | 'lineId'>
  )>>> }
);

export type GetTroubleCountsQueryVariables = Exact<{
  dateStart: Scalars['String'];
  dateEnd: Scalars['String'];
}>;


export type GetTroubleCountsQuery = (
  { __typename?: 'Query' }
  & { troubleCounts?: Maybe<Array<(
    { __typename?: 'TroubleCount' }
    & Pick<TroubleCount, 'lineName' | 'count'>
  )>> }
);

export const GetLineRecordsDocument = gql`
    query GetLineRecords($date: String) {
  lineRecords(date: $date) {
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
export const GetTroubleCountsDocument = gql`
    query GetTroubleCounts($dateStart: String!, $dateEnd: String!) {
  troubleCounts(dateStart: $dateStart, dateEnd: $dateEnd) {
    lineName
    count
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetTroubleCountsGQL extends Apollo.Query<GetTroubleCountsQuery, GetTroubleCountsQueryVariables> {
    document = GetTroubleCountsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }