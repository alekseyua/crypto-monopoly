import cls from './game-info-board-corners.module.css';

interface IProps {
	isGrayBlur?: boolean;
}

export const GameInfoBoardCorners:React.FC<IProps> = ({
	isGrayBlur = false,
}:IProps) => {
	return (
		<div
			className={cls['conner__container']}
			style={{
				filter: isGrayBlur? 'blur(3px) grayscale(100%)' : ''
			}}	
		>
			<div
				style={{
					background:
						'linear-gradient(to bottom right, #71bde3 50%, #f08a74 50%)',

				}}
				className={`${cls.cornerGradient}`}>
				<div className={`${cls.corner}  ${cls.rightTop}`} />
			</div>
			<div
				style={{
					background:
						'linear-gradient(to bottom left, #99BF61 50%, #5B89D6 50%)',
				}}
				className={`${cls.cornerGradient}`}>
				<div className={`${cls.corner}  ${cls.leftTop}`} />
			</div>
			<div
				style={{
					background: 'linear-gradient(to top right, #DD8DBE 50%, #222222 50%)',
				}}
				className={`${cls.cornerGradient}`}>
				<div className={`${cls.corner}  ${cls.rightBottom}`} />
			</div>
			<div
				style={{
					background: 'linear-gradient(to top left, #65B99E 50%, #D8B551 50%)',
				}}
				className={`${cls.cornerGradient}`}>
				<div className={`${cls.corner}  ${cls.leftBottom}`} />
			</div>
			<div className={cls['conner__wrap-field']}></div>
		</div>
	);
};
