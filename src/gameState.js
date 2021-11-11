import { modFox, modScene } from './ui'
import { RAIN_CHANCE, SCENES, NIGHT_LENGTH, DAY_LENGTH,getNextDieTime, getNextHungerTime } from './constants'

const gameState = {
  current: "INIT",
  clock: 1,
  wakeTime: -1,
  sleepTime: -1,
  scene: 0,
  hungryTime: -1,
  dieTime: -1,
  tick() {
    this.clock++
    console.log('clock', this.clock)

    if (this.wakeTime === this.clock) {
      this.wake()
    } else if (this.clock === this.sleepTime) {
      this.sleep()
    } else if (this.clock === this.hungryTime) {
      this.getHungry()
    } else if (this.clock === this.dieTime) {
      this.die()
    }

    return this.clock
  },
  startGame() {
    this.current = "HATCHING"
    this.wakeTime = this.clock + 3

    modFox('egg')
    modScene('day')
  },
  wake() {
    this.current = "IDLING"
    this.wakeTime = -1

    modFox('idling')
    this.scene = Math.random() > RAIN_CHANCE ? 0 : 1
    modScene(SCENES[this.scene])
    this.sleepTime = this.clock + DAY_LENGTH
    this.hungryTime = getNextHungerTime(this.clock)
  },
  handleUserAction(icon) {
    if (['SLEEP', 'FEEDING', 'CELEBRATIN', 'HATCHING'].includes(this.current)) {
      // do nothing
      return
    }
    if (this.current === "INIT" || this.current === "DEAD") {
      this.startGame()
      return
    }

    switch (icon) {
      case 'weather':
        this.changeWeather();
        break
      case 'poop':
        this.cleanUpPoot()
        break
      case 'fish':
        this.feed()
        break
    }
  },
  changeWeather() {
    console.log('change weather')
  },
  feed() {
    if (this.current !== 'HUNGRY') {
      return
    }
    this.current = 'FEEDING'
    this.dieTime = -1
    this.poopTime = getNextPoopTime(this.clock)
    modFox('eating')
    this.timeToCelebrate = this.clock + 2
  },
  cleanUpPoot() {
    console.log('clean poop')
  },
  sleep() {
    this.current = 'SLEEP'
    modFox('sleep')
    modScene('night')
    this.wakeTime = this.clock + NIGHT_LENGTH
  },
  getHungry() {
    this.current = 'HUNGRY'
    this.dieTime = getNextDieTime(this.clock)
    this.hungryTime = -1
    modFox('hungry')
  },
  die() {

  }
}

export const handleUserAction = gameState.handleUserAction.bind(gameState)
export default gameState
