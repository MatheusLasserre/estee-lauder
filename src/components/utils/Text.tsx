import React from 'react'
import { CSS_VARS, CSS_VARS_OPTIONS } from './colors'
type FontFamilyOptions = 'Inter' | 'Lato' | 'Jomhuria'
type TextProps = {
  children: React.ReactNode
  className?: string
}
type OnClick = {
  onClick?: () => void
}
type TextPropsWithSizes = TextProps & {
  fontSize?: string
  marginTop?: string
  marginBottom?: string
  marginLeft?: string
  marginRight?: string
  letterSpacing?: string
  textAlign?: React.CSSProperties['textAlign']
  width?: string
  maxWidth?: string
  fontWeight?: '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900'
  color?: CSS_VARS_OPTIONS
  fontFamily?: FontFamilyOptions
  link?: boolean
  lineHeight?: string
}

export const CommonText: React.FC<TextPropsWithSizes & OnClick> = ({
  children,
  className,
  fontSize,
  marginBottom,
  marginLeft,
  marginRight,
  marginTop,
  textAlign,
  width,
  maxWidth,
  fontWeight,
  color,
  letterSpacing,
  fontFamily,
  lineHeight,
  onClick,
  link
}) => {
  return (
    <p
      style={{
        fontWeight: fontWeight || '400',
        fontFamily: fontFamily || 'Inter',
        fontSize: fontSize || '1.6rem',
        lineHeight: lineHeight || '1.9rem',
        marginTop: marginTop || '4px',
        marginBottom: marginBottom || '4px',
        marginLeft: marginLeft || '0',
        marginRight: marginRight || '0',
        textAlign: textAlign || 'left',
        width: width || '100%',
        maxWidth: maxWidth || '100%',
        padding: '0',
        color: CSS_VARS[color || 'neutral-900'],
        letterSpacing: letterSpacing || 'normal',
        cursor: (onClick || link) ? 'pointer' : 'inherit',
        textDecoration: link ? 'underline' : 'none',
      }}
      className={className}
      onClick={onClick}
    >
      {children}
    </p>
  )
}

