import { forwardRef, useEffect, useRef, useState } from "react";
import styles from "./input.module.scss";
import { useStoreon } from "storeon/react";

interface IInput
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  id: string;
  type: string;
  iconLeft?: React.ReactElement;
  iconRight?: React.ReactElement;
  label?: string;
  errorText?: string;
  styleWrap?: React.CSSProperties;
  onValueChange?: (value: string) => void; // 👈 кастомное
  onChange?: React.ChangeEventHandler<HTMLInputElement>; // вернуть нативный onChange
  className?: string;
  wrapClassName?: string;
  leftText?: string;
  isSpanWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, IInput>(function Input(
  {
    style,
    iconLeft,
    label,
    leftText,
    errorText,
    min,
    max,
    id,
    styleWrap,
    type = "text",
    placeholder = "",
    wrapClassName,
    isSpanWidth,
    className,
    iconRight,
    value,
    ...props
  },
  ref
) {
  const spanRef = useRef<HTMLSpanElement>(null);
  const [inputValue, setInputValue] = useState(value || "");
  const [errorInput, setErrorInput] = useState<string>("");

  const handleErrorInput = (error = "") => {
    setErrorInput(error);
    setTimeout(() => setErrorInput(""), 1600);
  };

  useEffect(() => {
    if (spanRef.current && isSpanWidth && typeof inputValue === "string") {
      const spanWidth = spanRef.current.offsetWidth;
      if (ref && typeof ref === "object" && ref.current) {
        ref.current.style.width = `${spanWidth + 30}px`;
      }
    }
  }, [inputValue, isSpanWidth, ref]);

 const handlerChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
   const { value } = e.target;

   if (value === "") {
     setInputValue("");
     props.onValueChange?.("");
     props.onChange?.(e); // 👈 вызываем нативный onChange
     return;
   }

   if (type === "number") {
     const numberValue = +value;
     if (min !== undefined && numberValue < +min) {
       handleErrorInput("Минимальное значение: " + min);
       return;
     }
     if (max !== undefined && numberValue > +max) {
       handleErrorInput("Максимальное значение: " + max);
       return;
     }
   }

   setInputValue(value);
   props.onValueChange?.(value);
   props.onChange?.(e); // 👈 важно
 };

  return (
    <div className={wrapClassName || styles.inputCont}>
      {label && (
        <label htmlFor={id} className={errorText ? styles.error : ""}>
          {label}
        </label>
      )}
      <div className={styles.inputWrap} style={styleWrap}>
        {iconLeft}
        {leftText}
        <input
          className={`${errorText ? styles.error : ""} ${className || ""}`}
          ref={ref}
          type={type}
          id={id}
          placeholder={placeholder}
          value={value}
          style={{
            paddingRight: iconRight ? 35 : 25,
            ...style,
          }}
          min={min}
          max={max}
          {...props}
          onChange={handlerChangeInput}
        />
        {/* Призрачный span для измерения ширины текста */}
        <span
          ref={spanRef}
          style={{
            position: "absolute",
            visibility: "hidden",
            whiteSpace: "pre",
            fontSize: "14px",
            fontFamily: "inherit",
            fontWeight: "inherit",
          }}
        >
          {inputValue || placeholder || ""}
        </span>
        {iconRight}
      </div>

      {(!!errorInput || !!errorText) && (
        <div className={styles["input__error-container"]}>
          {errorInput || errorText}
        </div>
      )}
    </div>
  );
});
Input.displayName = "Input";