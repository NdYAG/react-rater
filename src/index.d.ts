// TypeScript Version: 2.8

export interface StarProps {
  isActive?: boolean
  isActiveHalf?: boolean
  willBeActive?: boolean
  isDisabled?: boolean
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
