
import { icons } from '../../../assets';
import Icon from '../Icon/Icon';
import styles from './balance.module.css';

export const Balance = ({balance}) => {
	return (
		<div className={styles.balanceCont}>
			<div className={styles.balanceText}>
				<Icon  src={icons.balance}  width={17} height={15.7} /> <p>Баланс</p>
			</div>
			<p className={styles.balance}>{balance} $</p>
		</div>
	);
};
