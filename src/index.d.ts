// TypeScript Version: 2.3

import { Component, SyntheticEvent } from 'react'

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
    onRate?(rating:number, event:SyntheticEvent<number>): void
}

export default class Rater extends Component<RaterProps> {
}
