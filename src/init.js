import gameState, { handleUserAction } from './gameState'
import { TICK_RATE } from './constants'
import initButtons from './buttons'

const init = async () => {
  console.log('started game')
  initButtons(handleUserAction)

  let tickTime = Date.now()

  const nextAnimationFrame = () => {
    const now = Date.now()

    if (tickTime <= now) {
      gameState.tick()

      tickTime = now + TICK_RATE
    }

    setTimeout(nextAnimationFrame, TICK_RATE)
  }

  nextAnimationFrame()
}

init()
