const gameState = {
  current: "INIT",
  clock: 1,
  wakeTime: -1,
  tick() {
    this.clock++
    console.log('clock', this.clock)
    if (this.wakeTime === this.clock) {
      this.wake()
    }
    return this.clock
  },
  startGame() {
    console.log('hatching')
    this.current = "HATCHING"
    this.wakeTime = this.clock + 3
  },
  wake() {
    console.log("awoken")
    this.current = "IDLING"
    this.wakeTime = -1
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
    console.log('feed')
  },
  cleanUpPoot() {
    console.log('clean poop')
  }
}

export const handleUserAction = gameState.handleUserAction.bind(gameState)
export default gameState
