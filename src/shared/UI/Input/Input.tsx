import { forwardRef, useEffect, useRef, useState } from "react";
import styles from "./input.module.scss";

interface IInput
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  id: string;
  type: string;
  iconLeft?: React.ReactElement | null;
  iconRight?: React.ReactElement | null;
  label?: string;
  errorText?: string;
  styleWrap?: React.CSSProperties;
  onValueChange?: (value: string) => void; // 👈 кастомное
  onChange?: React.ChangeEventHandler<HTMLInputElement>; // вернуть нативный onChange
  className?: string;
  wrapClassName?: string;
  leftText?: string;
  isSpanWidth?: boolean;
  error?: string;
  onEnter?: () => void;
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
    error,
    onEnter,
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onEnter?.();
    }
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
    const raw = e.target.value;

    if (raw === "") {
      setInputValue("");
      props.onValueChange?.("");
      props.onChange?.(e);
      return;
    }

    if (type === "number") {
      const isValidNumberString = /^-?\d*\.?\d*$/.test(raw);

      if (!isValidNumberString) return;

      const parsed = Number(raw);

      if (!isNaN(parsed)) {
        if (min !== undefined && parsed < Number(min)) {
          handleErrorInput("Минимальное значение: " + min);
        }

        if (max !== undefined && parsed > Number(max)) {
          handleErrorInput("Максимальное значение: " + max);
        }
      }
    }

    setInputValue(raw);
    props.onValueChange?.(raw);
    props.onChange?.(e);
  };

  useEffect(() => {
    !!errorText && handleErrorInput(errorText);
  }, [errorText]);

  return (
    <div className={wrapClassName || styles.inputCont}>
      {label && (
        <label
          htmlFor={id}
          className={errorText || !!error?.length ? styles.error : ""}
        >
          {label}
        </label>
      )}
      <div
        className={`${errorText || !!error?.length ? styles.error : ""} ${styles.inputWrap
          }`}
        style={styleWrap}
      >
        {iconLeft}
        {leftText}
        <input
          className={`${className || ""}`}
          ref={ref}
          type={type}
          id={id}
          placeholder={placeholder}
          value={inputValue}
          style={{
            paddingRight: iconRight ? 35 : 25,
            ...style,
          }}
          min={min}
          max={max}
          {...props}
          onChange={handlerChangeInput}
          onKeyDown={handleKeyDown}
        />
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
