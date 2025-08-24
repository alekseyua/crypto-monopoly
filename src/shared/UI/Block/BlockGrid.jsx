import cls from './styles/block-grid.module.css';

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