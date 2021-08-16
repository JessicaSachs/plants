import { App } from './App'
import { Planter } from './Planter'

export abstract class Context {
  abstract planters: Planter[]
  app = new App(this)
}
