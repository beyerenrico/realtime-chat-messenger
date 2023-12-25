import { ReactNode } from 'react';

type TypographyProps = {
  children: ReactNode;
}

const Heading1 = ({ children }: TypographyProps) => {
  return <h1 className='text-4xl font-bold mb-4'>{children}</h1>;
};

const Heading2 = ({ children }: TypographyProps) => {
  return <h2 className='text-3xl font-bold mb-2'>{children}</h2>;
};

const Heading3 = ({ children }: TypographyProps) => {
  return <h3 className='text-2xl font-semibold'>{children}</h3>;
};

const Heading4 = ({ children }: TypographyProps) => {
  return <h4 className='text-xl font-semibold'>{children}</h4>;
};

const Heading5 = ({ children }: TypographyProps) => {
  return <h5 className='text-lg font-medium'>{children}</h5>;
};

const Heading6 = ({ children }: TypographyProps) => {
  return <h6 className='text-base font-bold'>{children}</h6>;
};

const Paragraph = ({ children }: TypographyProps) => {
  return <p className='text-base'>{children}</p>;
};

export {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Paragraph,
};
