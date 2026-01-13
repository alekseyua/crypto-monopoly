import React from "react";
import { getPadding } from "../../../helpers/helper";

interface OffsetProps {
    mb?: number;
    mt?: number;
    ml?: number;
    mr?: number;
    minWidth?: number; // минимальная ширина экрана для масштабирования
    maxWidth?: number; // максимальная ширина экрана для масштабирования
    minScale?: number; // минимальный коэффициент (при маленьком экране)
    maxScale?: number; // максимальный коэффициент (при большом экране)
}

const Offset: React.FC<OffsetProps> = ({
    mb,
    mt,
    ml,
    mr,
    minWidth = 768,
    maxWidth = 1920,
    minScale = 0,
    maxScale = 1,
}) => {

    const styleCostume: React.CSSProperties = {
        marginBottom: getPadding(mb),
        marginTop: getPadding(mt),
        marginLeft: getPadding(ml),
        marginRight: getPadding(mr),
        transition: "all 0.2s ease", // плавный переход при изменении размера окна
    };

    return <div style={styleCostume} data-name="padding"></div>;
};

export { Offset };
