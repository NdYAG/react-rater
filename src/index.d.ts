// TypeScript Version: 2.8

export interface StarProps {
  isActive?: boolean
  willBeActive?: boolean
  isDisabled?: boolean
  /** Fill ratio of the star, from 0 to 1 */
  fillRatio?: number
}

export declare const Star: React.FC<StarProps>

interface RaterProps {
  total?: number
  rating?: number
  interactive?: boolean
  onRate?(event: any): void
  onRating?(event: any): void
  onCancelRate?(event: any): void
  renderStar?(i: number, starProps: StarProps): React.ReactNode
}

declare const Rater: React.FC<RaterProps>

export default Rater
