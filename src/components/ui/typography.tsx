type TypographyProps = {
  type: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
  children: React.ReactNode;
}

const Typography = ({type, children}: TypographyProps) => {
  return (
    <>
      {type === 'h1' && <h1 className="text-4xl font-bold">{children}</h1>}
      {type === 'h2' && <h2 className="text-3xl font-bold">{children}</h2>}
      {type === 'h3' && <h3 className="text-2xl font-semibold">{children}</h3>}
      {type === 'h4' && <h4 className="text-xl font-semibold">{children}</h4>}
      {type === 'h5' && <h5 className="text-lg font-medium">{children}</h5>}
      {type === 'h6' && <h6 className="text-base font-bold">{children}</h6>}
      {type === 'p' && <p className="text-base">{children}</p>}
    </>
  );
}

export default Typography;
