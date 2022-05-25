import React from 'react'

type Props = {
	children: JSX.Element | JSX.Element[] | null;
}

const Board:React.FC<Props> = ({children}) => {
  return (
	<section className="grid grid-cols-6 h-full gap-2">
		{children}
	</section>
  )
}

export default Board