const gradientHues: Record<string, number[]> = {
  rainbow: [0, 48, 110, 160, 220, 275, 320],
  aurora: [125, 155, 185, 215, 245, 275, 305],
  sunset: [285, 310, 335, 360, 385, 410, 435],
}
const paintCache = new WeakMap<
  CanvasRenderingContext2D,
  { width: number; height: number; paints: Map<string, CanvasGradient> }
>()

export function isPatternGradient(color: string) {
  return color in gradientHues
}

export function patternColor(
  color: string,
  alpha: number,
  position = 0.5,
  strength = 1,
) {
  const opacity = Math.min(alpha * strength, 0.85)
  const hues = gradientHues[color]
  if (hues) {
    const huePosition = Math.min(Math.max(position, 0), 1) * (hues.length - 1)
    const lowerIndex = Math.floor(huePosition)
    const upperIndex = Math.min(lowerIndex + 1, hues.length - 1)
    const hue =
      hues[lowerIndex]! +
      (hues[upperIndex]! - hues[lowerIndex]!) * (huePosition - lowerIndex)
    return `hsla(${hue}, 92%, 64%, ${opacity})`
  }
  return `rgba(${color}, ${opacity})`
}

export function patternPaint(
  ctx: CanvasRenderingContext2D,
  color: string,
  width: number,
  height: number,
  alpha: number,
  strength = 1,
): string | CanvasGradient {
  if (!isPatternGradient(color))
    return patternColor(color, alpha, 0.5, strength)

  let cache = paintCache.get(ctx)
  if (!cache || cache.width !== width || cache.height !== height) {
    cache = { width, height, paints: new Map() }
    paintCache.set(ctx, cache)
  }
  const paintAlpha = Math.round(alpha * 50) / 50
  const key = `${color}:${paintAlpha}:${strength}`
  const cachedPaint = cache.paints.get(key)
  if (cachedPaint) return cachedPaint

  const gradient = ctx.createLinearGradient(0, 0, width, height)
  for (let stop = 0; stop <= 6; stop++) {
    gradient.addColorStop(
      stop / 6,
      patternColor(color, paintAlpha, stop / 6, strength),
    )
  }
  cache.paints.set(key, gradient)
  return gradient
}
