import cls from './mini-info-board.module.css';

export const MiniInfoBoard = ({
	field,
	handleSelectField
}) => {
	return (
		<div 
			className={`${cls.board}  ${field?.activeField && cls['active-field']}  ${field?.selectField && cls['select-field']}`}
			onClick={()=>handleSelectField(field?.id)}
		>
			<div className={cls.boardContent}>

				<div className={cls.center}>
					<h4 className={`${cls.centerTitle} ${field?.activeField && cls['active-field']}`}>№{field?.title}</h4>
					<p className={cls.centerSubTitle}>
						{
							field?.activeField
								? 'Активное поле'
								: field?.selectField
									?'Выбранное поле' 
									:''
						}
					</p>
					
				</div>

				<div className={`${cls['corner-field']} ${cls.leftTop}`} />
				<div className={`${cls['corner-field']} ${cls.rightTop}`} />
				<div className={`${cls['corner-field']} ${cls.leftBottom}`} />
				<div className={`${cls['corner-field']} ${cls.rightBottom}`} />
				
				<div className={cls.topFields}>
					<div className={`${cls.topField} ${cls.empty}`} />
					<div className={`${cls.topField} ${cls.none}`} />
					<div className={`${cls.topField} ${cls.empty}`} />
					<div className={`${cls.topField} ${cls.oponent}`} />
					<div className={`${cls.topField} ${cls.empty}`} />
					<div className={`${cls.topField} ${cls.own}`} />
					<div className={`${cls.topField} ${cls.oponent}`} />
					<div className={`${cls.topField} ${cls.empty}`} />
					<div className={`${cls.topField} ${cls.own}`} />
				</div>
				<div className={cls.rightFields}>
					<div className={`${cls.rightField} ${cls.oponent}`} />
					<div className={`${cls.rightField} ${cls.empty}`} />
					<div className={`${cls.rightField} ${cls.none}`} />
					<div className={`${cls.rightField} ${cls.own}`} />
					<div className={`${cls.rightField} ${cls.empty}`} />
					<div className={`${cls.rightField} ${cls.none}`} />
					<div className={`${cls.rightField} ${cls.oponent}`} />
					<div className={`${cls.rightField} ${cls.none}`} />
					<div className={`${cls.rightField} ${cls.empty}`} />
				</div>
				<div className={cls.bottomFields}>
					<div className={`${cls.bottomField} ${cls.empty}`} />
					<div className={`${cls.bottomField} ${cls.none}`} />
					<div className={`${cls.bottomField} ${cls.empty}`} />
					<div className={`${cls.bottomField} ${cls.none}`} />
					<div className={`${cls.bottomField} ${cls.empty}`} />
					<div className={`${cls.bottomField} ${cls.own}`} />
					<div className={`${cls.bottomField} ${cls.none}`} />
					<div className={`${cls.bottomField} ${cls.empty}`} />
					<div className={`${cls.bottomField} ${cls.own}`} />
				</div>
				<div className={cls.leftFields}>
					<div className={`${cls.leftField} ${cls.empty}`} />
					<div className={`${cls.leftField} ${cls.oponent}`} />
					<div className={`${cls.leftField} ${cls.empty}`} />
					<div className={`${cls.leftField} ${cls.own}`} />
					<div className={`${cls.leftField} ${cls.empty}`} />
					<div className={`${cls.leftField} ${cls.own}`} />
					<div className={`${cls.leftField} ${cls.none}`} />
					<div className={`${cls.leftField} ${cls.empty}`} />
					<div className={`${cls.leftField} ${cls.own}`} />
				</div>
			</div>
		</div>
	);
};
