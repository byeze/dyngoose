import { DynamoDB } from 'aws-sdk'
import { DynamoAttributeType } from '../../dyngoose'
import { AnyAttributeMetadata } from '../../metadata/attribute-types/any.metadata'
import { AttributeType } from '../../tables/attribute-type'
import { IAttributeType } from '../../interfaces'

type Value = any[]
type Metadata = AnyAttributeMetadata

export class ListAttributeType extends AttributeType<Value, Metadata> implements IAttributeType<Value> {
  type = DynamoAttributeType.List

  toDynamo(value: Value): DynamoDB.AttributeValue {
    const transformation = DynamoDB.Converter.marshall({
      list: value,
    })
    return transformation.list
  }

  fromDynamo(value: DynamoDB.AttributeValue): Value | null {
    const transformation = DynamoDB.Converter.unmarshall({
      list: value,
    })
    return transformation.list as Value
  }
}
