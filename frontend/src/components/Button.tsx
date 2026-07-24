import { AwesomeButton } from '@rcaferati/react-awesome-button';
import '@rcaferati/react-awesome-button/styles.css';
import type { ReactNode } from 'react';

interface ButtonProps {
  selectedId: number | null;
  answerId: number;
  children: ReactNode;
}

function Button({ selectedId, answerId, children }: ButtonProps) {

  const onPressHandler = () => {
    if (selectedId == null) {
      console.log('No building selected');
      return;
    }
    const correct = selectedId === answerId;
    console.log(correct ? 'Correct!' : 'Wrong');
  };

  return (
    <AwesomeButton type="primary" size="medium" onPress={onPressHandler}>
      {children}
    </AwesomeButton>
  )
}

export default Button