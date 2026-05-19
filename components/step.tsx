import { FC, ReactNode } from 'react'

interface StepProps {
  revealed: boolean
  children: ReactNode
}

const containerStyle = {
  width: '100%',
  overflow: 'scrollY' as const,
}

const hiddenStyle = {
  display: 'none' as const,
}

const Step: FC<StepProps> = ({ revealed, children }) => (
  <div style={revealed ? containerStyle : hiddenStyle}>{children}</div>
)

export default Step
