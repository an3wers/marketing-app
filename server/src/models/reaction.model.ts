import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
  DataTypes
} from 'sequelize'
import { sequelize } from '../db/db'

interface ReactionModel
  extends Model<
    InferAttributes<ReactionModel>,
    InferCreationAttributes<ReactionModel>
  > {
  id: CreationOptional<number>
  reaction: string
}

const Reaction = sequelize.define<ReactionModel>('Reaction', {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true
  },
  reaction: {
    type: DataTypes.STRING
  }
})

export { Reaction }
