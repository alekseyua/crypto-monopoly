import React from 'react';
import styles from './styles/balance-header.module.scss';

const BalanceHeader = () => {
  return (
  <header className={`${  styles['header__balance-container']} wrapper`}>
        {/* <div className={cls.headerTitle}>
          <Button
            to='/rules'
            component='link'
            className={cls.backBtn}
            type='filled'
            variant='rounded'>
            <Icon  src={BackArrow}  width={16} height={16} />
          </Button>
          <h2>«‎Основной режим»‎</h2>
        </div>
        <div className={cls.headerButtons}>
          <div className={cls.search}>
            <input type='text' placeholder='Как часто можно ходить...' />
            <button>
              <Icon src={SearchIcon} width={14} height={14} />
            </button>
          </div>
          <Button variant='rounded' type='gradient'>
            Описание правил
          </Button>
          <Button variant='rounded' type='filled'>
            Описание интерфейса
          </Button>
        </div> */}
      </header>)
};

export default BalanceHeader;