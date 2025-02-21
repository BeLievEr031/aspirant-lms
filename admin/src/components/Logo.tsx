import { ILogo } from '../types'
import clsx from 'clsx'

function Logo({ src, className }: ILogo) {
    return (
        <div className='w-full px-4 mt-2 rounded-xl overflow-hidden'>
            <img className={clsx("w-full rounded-xl bg-cover", className)} src={src} />
        </div>
    )
}

export default Logo