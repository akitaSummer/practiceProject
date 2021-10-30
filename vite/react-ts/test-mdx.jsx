/* @jsxRuntime classic */ // 通过注释声明编译后结果
/* @jsx mdx */ // React.createElement => mdx
import Button from "Button";
export const a = 1;

const layoutProps = {
  a,
};
const MDXLayout = "wrapper";
export default function MDXContent({ components, ...props }) {
  return (
    <MDXLayout
      {...layoutProps}
      {...props}
      components={components}
      mdxType='MDXLayout'>
      <h1>{`Hello`}</h1>
      <blockquote>
        <p parentName='blockquote'>{`will this`}</p>
      </blockquote>
      <ul>
        <li parentName='ul'>{`first`}</li>
        <li parentName='ul'>{`second`}</li>
      </ul>
      <Button mdxType='Button'>Click me</Button>
    </MDXLayout>
  );
}

MDXContent.isMDXComponent = true;
