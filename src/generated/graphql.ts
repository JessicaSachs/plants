/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
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
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
};







export type PlanterFeedInput = {
  readonly date: Maybe<Scalars['String']>;
  readonly planterId: Maybe<Scalars['String']>;
};

export type PlanterModels =
  | 'bountyelite'
  | 'harvest360';

export type PlanterSizes =
  | 'nine'
  | 'six';


export type GetPlantersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPlantersQuery = { readonly __typename?: 'Query', readonly app: { readonly __typename?: 'App', readonly planters: ReadonlyArray<(
      { readonly __typename?: 'Planter', readonly nextFeeding: (
        { readonly __typename?: 'Feeding' }
        & FeedingDetailsFragment
      ), readonly schedule: ReadonlyArray<(
        { readonly __typename?: 'Feeding' }
        & FeedingDetailsFragment
      )> }
      & PlanterDetailsFragment
    )> } };

export type FeedingDetailsFragment = { readonly __typename?: 'Feeding', readonly times: Maybe<number>, readonly feedAmount: number, readonly overdue: boolean, readonly shouldClean: boolean, readonly nextDate: string, readonly interval: Maybe<number>, readonly id: string };

export type PlanterDetailsFragment = { readonly __typename?: 'Planter', readonly startDate: string, readonly id: string, readonly name: string, readonly size: PlanterSizes, readonly lastFeedDate: string };

export type PlanterFeedMutationVariables = Exact<{
  input: Maybe<PlanterFeedInput>;
}>;


export type PlanterFeedMutation = { readonly __typename?: 'Mutation', readonly feedPlanter: ReadonlyArray<{ readonly __typename?: 'Planter', readonly id: string, readonly name: string, readonly schedule: ReadonlyArray<{ readonly __typename?: 'Feeding', readonly id: string, readonly nextDate: string, readonly shouldClean: boolean }> }> };

export const FeedingDetailsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FeedingDetails"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Feeding"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"times"}},{"kind":"Field","name":{"kind":"Name","value":"feedAmount"}},{"kind":"Field","name":{"kind":"Name","value":"overdue"}},{"kind":"Field","name":{"kind":"Name","value":"shouldClean"}},{"kind":"Field","name":{"kind":"Name","value":"nextDate"}},{"kind":"Field","name":{"kind":"Name","value":"interval"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]} as unknown as DocumentNode<FeedingDetailsFragment, unknown>;
export const PlanterDetailsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlanterDetails"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Planter"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"lastFeedDate"}}]}}]} as unknown as DocumentNode<PlanterDetailsFragment, unknown>;
export const GetPlantersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPlanters"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"app"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"planters"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlanterDetails"}},{"kind":"Field","name":{"kind":"Name","value":"nextFeeding"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FeedingDetails"}}]}},{"kind":"Field","name":{"kind":"Name","value":"schedule"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FeedingDetails"}}]}}]}}]}}]}},...PlanterDetailsFragmentDoc.definitions,...FeedingDetailsFragmentDoc.definitions]} as unknown as DocumentNode<GetPlantersQuery, GetPlantersQueryVariables>;
export const PlanterFeedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"PlanterFeed"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PlanterFeedInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"feedPlanter"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"schedule"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"nextDate"}},{"kind":"Field","name":{"kind":"Name","value":"shouldClean"}}]}}]}}]}}]} as unknown as DocumentNode<PlanterFeedMutation, PlanterFeedMutationVariables>;