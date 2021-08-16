import { AriaButtonProps } from '@react-types/button'
import clsx from 'clsx'
import { useRef } from 'react'
import { useButton } from 'react-aria'

type Props = AriaButtonProps<'div'> & {
  text: string
  className?: string
}

const Button = ({ text, className, ...props }: Props) => {
  const ref = useRef<HTMLDivElement>(null)
  const { buttonProps, isPressed } = useButton(props, ref)

  return (
    <div
      {...buttonProps}
      className={clsx(
        className,
        isPressed && 'brightness-125',
        'flex items-center justify-center h-16 rounded-md cursor-pointer'
      )}
      ref={ref}
    >
      {text}
    </div>
  )
}

export default Button
