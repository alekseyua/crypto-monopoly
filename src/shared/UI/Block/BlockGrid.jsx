import cls from './styles/block-grid.module.scss';

const BlockGrid = ({
    style={},
    children,
}) => {
  return (
    <div
        className={cls.blockGrid}
        style={style}
    >{children}</div>
  )
}

export default BlockGrid