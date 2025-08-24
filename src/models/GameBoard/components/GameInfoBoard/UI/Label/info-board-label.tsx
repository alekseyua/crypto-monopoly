import cls from './info-board-label.module.css';


interface IInfoBoardLabel {
    labelColor?: string;
    fillColor?: string;
    borderColor?: string;
		p?: string;
    children: React.ReactNode;
	center?: boolean;
}

export const InfoBoardLabel:React.FC<IInfoBoardLabel> = ({
	labelColor,
	fillColor = 'transparent',
	borderColor = '#ACBADB',
	p = '10px',
	center,
	children
}:IInfoBoardLabel) => {
	let stylesWrap:  Record<string,string> = {}
	stylesWrap = {
		...stylesWrap,
		'background': labelColor ?? '', 
		'--border-color': borderColor,
		'--fill-color': fillColor,
		'padding': p,
	}
	if(center) stylesWrap = {...stylesWrap,
		justifyContent	: "center"
	}
	return (
		<div
			style={stylesWrap}
			className={cls.label}>
			{children}
		</div>
	);
};
