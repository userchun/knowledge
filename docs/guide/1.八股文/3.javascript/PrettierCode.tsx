/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC } from 'react';
import prettier from 'prettier';
import * as parserBabel from 'prettier/parser-babel';
import * as prettierPluginEstree from 'prettier/plugins/estree';
type Props = {
  code: string;
  lines?: number[];
};

const PrettierCode: FC<Props> = ({ code = '', lines }) => {
  const [showCode, setShowCode] = React.useState('');

  const arr = showCode.split('\n');

  React.useEffect(() => {
    prettier
      .format(code, {
        semi: false,
        parser: 'babel-ts',
        plugins: [parserBabel, prettierPluginEstree as any],
      })
      .then((res) => {
        setShowCode(res);
      });
  }, [code]);

  return (
    <pre
      style={{ background: '#fafafbff', padding: '10px 15px', borderRadius: 5 }}
    >
      {arr.map((item, index) => (
        <React.Fragment key={index}>
          <span style={{ marginRight: 15, color: '#b2b5baff' }}>
            {index + 1}
          </span>
          <code
            style={
              lines?.includes(index + 1)
                ? { color: 'red', fontWeight: 600 }
                : {}
            }
          >
            {item}
          </code>
          <br />
        </React.Fragment>
      ))}
    </pre>
  );
};
export default PrettierCode;
