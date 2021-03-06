/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */


import type { Context } from "./../Context"
import type { Query } from "./../Query"
import type { Planter } from "./../Planter"
import type { Feeding } from "./../Feeding"
import type { core } from "nexus"
declare global {
  interface NexusGenCustomInputMethods<TypeName extends string> {
    /**
     * The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf).
     */
    json<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "JSON";
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    dateTime<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "DateTime";
  }
}
declare global {
  interface NexusGenCustomOutputMethods<TypeName extends string> {
    /**
     * The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf).
     */
    json<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "JSON";
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    dateTime<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "DateTime";
  }
}


declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  PlanterFeedInput: { // input type
    date?: string | null; // String
    planterId?: string | null; // String
  }
}

export interface NexusGenEnums {
  PlanterModels: "bountyelite" | "harvest360"
  PlanterSizes: "nine" | "six"
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
  DateTime: any
  JSON: any
}

export interface NexusGenObjects {
  App: {};
  Feeding: Feeding;
  Mutation: {};
  Planter: Planter;
  Query: Query;
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars & NexusGenEnums

export interface NexusGenFieldTypes {
  App: { // field return type
    planters: NexusGenRootTypes['Planter'][]; // [Planter!]!
  }
  Feeding: { // field return type
    feedAmount: number; // Int!
    id: string; // ID!
    interval: number | null; // Int
    nextDate: string; // String!
    overdue: boolean; // Boolean!
    shouldClean: boolean; // Boolean!
    times: number | null; // Int
  }
  Mutation: { // field return type
    feedPlanter: NexusGenRootTypes['Planter'][]; // [Planter!]!
  }
  Planter: { // field return type
    id: string; // ID!
    lastFeedDate: string; // String!
    model: NexusGenEnums['PlanterModels']; // PlanterModels!
    name: string; // String!
    nextFeeding: NexusGenRootTypes['Feeding']; // Feeding!
    schedule: NexusGenRootTypes['Feeding'][]; // [Feeding!]!
    size: NexusGenEnums['PlanterSizes']; // PlanterSizes!
    startDate: string; // String!
  }
  Query: { // field return type
    app: NexusGenRootTypes['App']; // App!
  }
}

export interface NexusGenFieldTypeNames {
  App: { // field return type name
    planters: 'Planter'
  }
  Feeding: { // field return type name
    feedAmount: 'Int'
    id: 'ID'
    interval: 'Int'
    nextDate: 'String'
    overdue: 'Boolean'
    shouldClean: 'Boolean'
    times: 'Int'
  }
  Mutation: { // field return type name
    feedPlanter: 'Planter'
  }
  Planter: { // field return type name
    id: 'ID'
    lastFeedDate: 'String'
    model: 'PlanterModels'
    name: 'String'
    nextFeeding: 'Feeding'
    schedule: 'Feeding'
    size: 'PlanterSizes'
    startDate: 'String'
  }
  Query: { // field return type name
    app: 'App'
  }
}

export interface NexusGenArgTypes {
  App: {
    planters: { // args
      planterId?: string | null; // String
    }
  }
  Mutation: {
    feedPlanter: { // args
      input?: NexusGenInputs['PlanterFeedInput'] | null; // PlanterFeedInput
    }
  }
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = keyof NexusGenInputs;

export type NexusGenEnumNames = keyof NexusGenEnums;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: Context;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}