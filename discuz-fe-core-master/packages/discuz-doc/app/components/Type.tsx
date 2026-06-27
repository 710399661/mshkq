import React, { Fragment } from 'react';
import { show } from './ApiModal';
import ApiDoc from './ApiDoc';
import allDoc from '!!props-loader!@discuzq/design/../tsconfig.json';

// import { Bubble } from '@app/../../tdesign-component/src';

export interface TypeBase {
  name: string;
}

export type Type =
  | ArrayType
  | IntersectionType
  | UnionType
  | IntrinsicType
  | InterfaceType
  | CallSignaturesType
  | TupleType;

interface ArrayType extends TypeBase {
  kind: 'array';
  arrayType: Type;
}

interface IntersectionType extends TypeBase {
  kind: 'intersection';
  intersectionTypes: Type[];
}

interface UnionType extends TypeBase {
  kind: 'union';
  unionTypes: Type[];
}

interface IntrinsicType extends TypeBase {
  kind: 'intrinsic';
}

interface InterfaceType extends TypeBase {
  kind: 'interface';
  typeArguments: Type[];
  interfaceKey: string;
  template: string[];
}

interface CallSignaturesType extends TypeBase {
  kind: 'callSignatures';
  signatures: {
    parameters: {
      name: string;
      type: Type;
    }[];
    returnType: Type;
  }[];
}

interface TupleType extends TypeBase {
  kind: 'tuple';
  elements: Type[];
}

const join = (array, mark) => {
  const res = [];
  array.forEach((c, index) => {
    if (index !== 0) {
      return res.push(mark, c);
    }
    res.push(c);
  });
  return (
    <>
      {res.map((c, index) => (
        <Fragment key={index}>{c}</Fragment>
      ))}
    </>
  );
};

export function TypeDisplay(props: { type: Type }): JSX.Element {
  const { type } = props;
  if (type.kind === 'array') {
    const { arrayType } = type;
    const elementTypeElement = <TypeDisplay type={arrayType} />;
    if (arrayType.kind === 'union' || arrayType.kind === 'intersection') {
      return <>({elementTypeElement})[]</>;
    }
    return <>{elementTypeElement}[]</>;
  }

  if (type.kind === 'intersection') {
    const { intersectionTypes } = type;
    const names = intersectionTypes.map((type, index) => <TypeDisplay key={index} type={type} />);
    return join(names, ' & ');
  }

  if (type.kind === 'intrinsic') {
    return <>{name}</>;
  }

  if (type.kind === 'interface') {
    const { name, typeArguments, interfaceKey, template = [] } = type;
    let typeArgs = null;
    if (typeArguments.length) {
      typeArgs = (
        <>
          &lt;
          {join(
            typeArguments.map((type, index) => <TypeDisplay key={index} type={type} />),
            ', ',
          )}
          &gt;
        </>
      );
    }
    if (interfaceKey && allDoc[interfaceKey]) {
      return (
        <>
          {template[0] || ''}
          <i
            className="detail"
            onClick={() =>
              show({
                content: <ApiDoc id={interfaceKey} />,
              })
            }
            title="点击查看接口详情"
          >
            {name}
            {typeArgs}
          </i>
          {template[1] || ''}
        </>
      );
    }
    return (
      <>
        {template[0] || ''}
        {name}
        {typeArgs}
        {template[1] || ''}
      </>
    );
  }

  if (type.kind === 'callSignatures') {
    const { signatures, name } = type;

    let signatureElement: JSX.Element = null;

    // function
    if (signatures.length) {
      const { parameters, returnType } = signatures[0];
      const paramsStr = parameters
        ? join(
            parameters.map(({ name, type }) => (
              <>
                {name}: {<TypeDisplay type={type} />}
              </>
            )),
            ', ',
          )
        : null;
      signatureElement = (
        <span className="signature-zone">
          ({paramsStr}) => {<TypeDisplay type={returnType} />}
        </span>
      );
    }

    // if (name && signatureElement) {
    //   return <Bubble placement="left" content={name}>{signatureElement}</Bubble>;
    // }

    return signatureElement || <>{name}</>;
  }

  if (type.kind === 'tuple') {
    const { elements } = type;
    const names = elements.map((type, index) => <TypeDisplay key={index} type={type} />);
    return <>[{join(names, ', ')}]</>;
  }

  if (type.kind === 'union') {
    const { unionTypes } = type;
    return join(
      unionTypes.map((type, index) => <TypeDisplay key={index} type={type} />),
      ' | ',
    );
  }

  return <>{type.name}</>;
}
