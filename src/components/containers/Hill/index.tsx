/* eslint-disable @typescript-eslint/no-shadow */
import { FC, useCallback, useEffect, useState } from 'react';
import { hill } from '@/ciphers';
import { CipherForm } from '@/components/UI/organisms';
import { FormItem } from '@/components/UI/molecules';
import { alphabet } from '@/settings';
import { Input, TextArea } from '@/components/UI/atoms';
import { ActionsEnum, CipherFunction, FieldData } from '@/types';
import { useForm, useFormFieldsSchema, useYupSchema } from '@/hooks';
import { calculateModDeterminant, chunk, formatMatrix, hasError, isCoprime, isMatrixInvertible } from '@/utils';
import { HillWrapper } from './styles';
import { HillForm } from './types';

const keywordToMatrix = (key: string, alphabet: string) => {
  const n = Math.sqrt(key.length);

  const transformedKey = key
    .split('')
    .map((letter) => alphabet.indexOf(letter))
    .filter((value) => value !== -1);
  return chunk(transformedKey, n);
};

const isValidKeyMatrix = (keyMatrix: number[][], alphabet: string) => {
  return true;
  return (
    isMatrixInvertible(keyMatrix) && isCoprime(calculateModDeterminant(keyMatrix, keyMatrix.length), alphabet.length)
  );
};
const Hill: FC = () => {
  const [form] = useForm<HillForm>();
  const [cipherFunctions, setCipherFunction] = useState<Record<ActionsEnum, CipherFunction | undefined>>({
    encode: undefined,
    decode: undefined,
  });

  const { string } = useFormFieldsSchema();

  const schema = useYupSchema({
    key: string
      .test(
        'is-perfect-square',
        'String length must be a perfect square',
        (value) => !!(value && Number.isInteger(Math.sqrt(value.length))),
      )
      .test(
        'is-valid-matrix',
        'Invalid key (D(M) should be > 0 and coprime with alphabet length)',
        (value) => !!(value && isValidKeyMatrix(keywordToMatrix(value, alphabet), alphabet)),
      ),
  });

  useEffect(() => {
    const key = 'gybnqkurp';

    form.setFieldsValue({
      key,
      keyMatrix: formatMatrix(keywordToMatrix(key, alphabet)),
    });
  }, []);

  const onChange = useCallback(
    (changedFields: FieldData[]) => {
      const name = changedFields[0].name.toString();
      const { action, key } = form.getFieldsValue();

      if (hasError(form)) {
        return;
      }

      const keyMatrix = keywordToMatrix(key, alphabet);

      if (name === 'key') {
        form.setFieldsValue({ keyMatrix: formatMatrix(keyMatrix) });
      }

      const cipherFunction = {
        [ActionsEnum.ENCODE]: (text: string) => hill.encode(text, keyMatrix, alphabet),
        [ActionsEnum.DECODE]: (text: string) => hill.decode(text, keyMatrix, alphabet),
      }[action];

      setCipherFunction((prevState) => ({
        ...prevState,
        [action]: cipherFunction,
      }));
    },
    [form],
  );

  return (
    <HillWrapper>
      <CipherForm
        form={form}
        title="Hill cipher"
        onChange={onChange}
        encode={cipherFunctions.encode}
        decode={cipherFunctions.decode}
        fieldsToShow={{
          alphabet: false,
        }}
      >
        <div className="row">
          <FormItem label="Key" name="key" schema={schema} required>
            <Input />
          </FormItem>
        </div>
        <div className="row">
          <FormItem label="Key Matrix" name="keyMatrix">
            <TextArea disabled autoSize />
          </FormItem>
        </div>
      </CipherForm>
    </HillWrapper>
  );
};

export default Hill;
