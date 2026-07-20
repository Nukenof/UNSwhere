import { AwesomeButton } from '@rcaferati/react-awesome-button';
import '@rcaferati/react-awesome-button/styles.css';

function Button({ children, onPressHandler }) {
  return (
    <AwesomeButton type="primary" size="medium" onPress={onPressHandler}>
      {children}
    </AwesomeButton>
  )
}

export default Button