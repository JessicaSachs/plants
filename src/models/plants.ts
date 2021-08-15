import type { Planter } from './planter'

export enum Herbs {
  ROSEMARY,
  THYME,
  CHIVES,
  CILANTRO,
  OREGANO,
  MINT,
  LAVENDAR,
  THAI_BASIL,
  GENOVESE_BASIL,
}

export enum Vegetables {
  ICEBERG_LETTUCE,
  PARIS_ISLAND,
}

export class Plant implements PlantType {
  name: string = ''
  startDate? = Date.now()
  planter?: Planter
  height: PlantType['height'] = 0
  gestationPeriod: PlantType['gestationPeriod'] = 0
  kind: PlantType['kind']
  category: PlantType['category']

  constructor(options: Plant) {
    this.name = options.name
    this.kind = options.kind
    this.category = options.category
    this.planter = options.planter
    this.startDate = options.startDate
    this.height = options.height
    this.gestationPeriod = options.gestationPeriod
  }
}

export interface PlantType {
  height: number
  gestationPeriod: number
  category?: 'herbs' | 'vegetables'
  name: string
  kind?: Herbs | Vegetables
}
