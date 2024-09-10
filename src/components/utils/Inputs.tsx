"use client"
import Style from './Inputs.module.css'
import { ClassAttributes, forwardRef, InputHTMLAttributes, useState } from 'react'
import { CrossIcon, EyeIcon } from './Icons'

type InputProps = {
  type?: InputHTMLAttributes<HTMLInputElement>['type']
  placeholder?: InputHTMLAttributes<HTMLInputElement>['placeholder']
  required?: InputHTMLAttributes<HTMLInputElement>['required']
  onChange?: InputHTMLAttributes<HTMLInputElement>['onChange']
  onClick?: InputHTMLAttributes<HTMLInputElement>['onClick']
  onFocus?: InputHTMLAttributes<HTMLInputElement>['onFocus']
  onBlur?: InputHTMLAttributes<HTMLInputElement>['onBlur']
  value?: InputHTMLAttributes<HTMLInputElement>['value']
  maxLength?: InputHTMLAttributes<HTMLInputElement>['maxLength']
  id?: InputHTMLAttributes<HTMLInputElement>['id']
  name?: string
  className?: string
  onKeyDown?: InputHTMLAttributes<HTMLInputElement>['onKeyDown']
  ref?: ClassAttributes<HTMLInputElement>['ref']
  disabled?: boolean
}


export const CText = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type,
      onChange,
      placeholder,
      required,
      value,
      className,
      maxLength,
      name,
      id,
      disabled,
      onKeyDown,
      onClick,
      onFocus,
      onBlur
      
    },
    ref,
  ) => {
    if (type === 'password')
      return (
        <CPassword
          type={type}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          value={value}
          className={className}
          maxLength={maxLength}
          name={name}
          id={id}
          onKeyDown={onKeyDown}
          ref={ref}
          disabled={disabled}
        />
      )
    return (
      <input
        type={type}
        value={value}
        onChange={onChange}
        onClick={onClick}
        onFocus={onFocus}
        onBlur={onBlur}
        required={required}
        placeholder={placeholder}
        maxLength={maxLength}
        name={name}
        className={Style.textInput + ' ' + className}
        id={id}
        onKeyDown={onKeyDown}
        ref={ref}
        disabled={disabled}
      />
    )
  },
)

export const CPassword = forwardRef<HTMLInputElement, InputProps>(
  (
    { type, onChange, placeholder, required, value, className, maxLength, name, id, onKeyDown },
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState(false)
    return (
      <div className={Style.passwordBox}>
        <input
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          maxLength={maxLength}
          name={name}
          id={id}
          className={Style.textInput + ' ' + className}
        />
        <EyeIcon showPassword={showPassword} setShowPassword={setShowPassword} />
      </div>
    )
  },
)

type TextFilterProps = {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onClear: () => void
  placeholder?: string
  className?: string
} & InputProps
export const CTextFilter: React.FC<TextFilterProps> = ({
  value,
  onChange,
  placeholder,
  className,
  disabled,
  id,
  maxLength,
  name,
  onKeyDown,
  required,
  type,
  onClear,
}) => {
  return (
    <div className={Style.TextFilter}>
      <CText
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={Style.textInput + ' ' + className}
        disabled={disabled}
        id={id}
        maxLength={maxLength}
        name={name}
        onKeyDown={onKeyDown}
        required={required}
      />
      <CrossIcon onClick={() => onClear()} width={24} />
    </div>
  )
}


