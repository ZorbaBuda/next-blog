import { useMDXComponent } from 'next-contentlayer/hooks';
import NextImage, { ImageProps } from 'next/image';
import TableOfContents from './TableOfContents';


interface MdxProps {
  code: string;
}

const components = {
  TableOfContents,
  Image: (props: ImageProps) => <NextImage {...props} />,
  
};

const Mdx: React.FC<MdxProps> = ({ code }) => {
  const Component = useMDXComponent(code);

  return <Component components={components} />;
};

export default Mdx;
