import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes
} from 'sequelize'
import { sequelize } from '../db/db'

interface PhotoModel
  extends Model<
    InferAttributes<PhotoModel>,
    InferCreationAttributes<PhotoModel>
  > {
  id: CreationOptional<number>
  title: string
  description: string
  path: string
  order: number
  like_qty?: number
  dislike_qty?: number
}

const Photo = sequelize.define<PhotoModel>('Photo', {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: true
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true
  },
  path: {
    type: DataTypes.STRING,
    allowNull: false
  },
  order: {
    type: DataTypes.INTEGER,
  },
  like_qty: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  dislike_qty: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
})

export { Photo }
