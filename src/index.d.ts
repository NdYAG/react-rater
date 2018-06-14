// TypeScript Version: 2.3

import { Component } from 'react'

interface StarProps {
    isActive?: boolean
    isActiveHalf?: boolean
    willBeActive?: boolean
    isDisabled?: boolean
}

export class Star extends Component<StarProps> {
}

interface RaterProps {
    total?: number
    rating?: number
    interactive?: boolean
    onRate?(event:any): void
    onRating?(event:any): void
    onCancelRate?(event:any): void
}

export default class Rater extends Component<RaterProps> {
}
