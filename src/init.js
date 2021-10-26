const TICK_RATE = 3000

const tick = () => {
  console.log("tick", Date.now())
}

const init = async () => {
  console.log('started game')

  let tickTime = Date.now()

  const nextAnimationFrame = () => {
    const now = Date.now()

    if (tickTime <= now) {
      tick()

      tickTime = now + TICK_RATE
    }

    setTimeout(nextAnimationFrame, TICK_RATE)
  }

  nextAnimationFrame()
}

init()
