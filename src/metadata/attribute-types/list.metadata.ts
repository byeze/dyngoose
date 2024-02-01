import { AttributeMetadata } from '../attribute'

export type ListType = [
  {
    [propertyName: string]: any
  } |
  any
]

export interface ListAttributeMetadata extends Partial<AttributeMetadata<ListType>> {}
