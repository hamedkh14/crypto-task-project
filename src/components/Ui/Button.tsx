import Link from "next/link"
import { ComponentProps } from "react"
import { twMerge } from "tailwind-merge"

export type ButtonProps = ComponentProps<'button'> & {
  text: string
  className: string,
  href: string
}

export const Button = ({text, className, href, ...props}: ButtonProps) => {
  return (
    <Link href={href}><button className={twMerge("h-8 px-3 rounded-md transition-opacity duration-75 hover:opacity-80", className)} {...props}>{text}</button></Link>
  )
}
