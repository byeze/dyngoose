import { expect } from 'chai'
import * as Dyngoose from '../..'

interface ITestList {
  user: string
}

@Dyngoose.$Table({
  name: `ListTest-${Math.random()}`,
  })
export class ListTestTable extends Dyngoose.Table {
  @Dyngoose.$PrimaryKey('id')
  public static readonly primaryKey: Dyngoose.Query.PrimaryKey<ListTestTable, number, void>

  @Dyngoose.$DocumentClient()
  public static readonly documentClient: Dyngoose.DocumentClient<ListTestTable>

  @Dyngoose.Attribute.Number()
  id: number

  @Dyngoose.Attribute.List({})
  public likes: ITestList[]
}

describe('AttributeType/List', () => {
  before(async () => {
    await ListTestTable.createTable()
  })

  after(async () => {
    await ListTestTable.deleteTable()
  })

  it('should store the array as a list', async () => {
    const record = ListTestTable.new({
      id: 1,
      likes: [
        {
          user: 'Ezequiel',
        },
        {
          user: 'Luciano',
        },
      ],
    })

    await record.save()

    const loaded = await ListTestTable.primaryKey.get(1)

    expect(loaded?.getAttributeDynamoValue('likes')).to.deep.eq({
      L: [
        {
          M: {
            user: {
              S: 'Ezequiel',
            },
          },
        },
        {
          M: {
            user: {
              S: 'Luciano',
            },
          },
        },
      ],
    })

    expect(loaded?.likes[0].user).to.eq('Ezequiel')

    expect(loaded?.getAttributeDynamoValue('likes')).to.deep.eq({
      L: [
        {
          M: {
            user: {
              S: 'Ezequiel',
            },
          },
        },
        {
          M: {
            user: {
              S: 'Luciano',
            },
          },
        },
      ],
    })

    expect(loaded?.toJSON()).to.deep.eq({
      id: 1,
      likes: [
        {
          user: 'Ezequiel',
        },
        {
          user: 'Luciano',
        },
      ],
    })
  })
})
