import { FC, useCallback, useEffect, useState } from 'react';
import { alphabet } from '@/settings';
import { TwoSquareVariant, twoSquare } from '@/ciphers';
import { CipherForm } from '@/components/UI/organisms';
import { FormItem } from '@/components/UI/molecules';
import { Input, Select, TextArea } from '@/components/UI/atoms';
import { ActionsEnum, CipherFunction, FieldData } from '@/types';
import { useForm, useFormFieldsSchema, useYupSchema } from '@/hooks';
import { chunk, formatMatrix, getDifference, hasError, removeDuplicates } from '@/utils';
import { TwoSquareWrapper } from './styles';
import { TwoSquareForm } from './types';
import { variantOptions } from './options';

const keywordToMatrix = (keyword: string, omitLetter: string) => {
  const filteredKeyword = removeDuplicates(keyword.toLowerCase());
  const deduplicateAlphabet = getDifference(alphabet.split(''), filteredKeyword);
  const filteredAlphabet = getDifference(deduplicateAlphabet, [omitLetter]);
  const matrix = chunk([...filteredKeyword, ...filteredAlphabet], 5).slice(0, 5);
  return matrix;
};

const TwoSquare: FC = () => {
  const [form] = useForm<TwoSquareForm>();
  const [cipherFunctions, setCipherFunction] = useState<Record<ActionsEnum, CipherFunction | undefined>>({
    encode: undefined,
    decode: undefined,
  });

  const { onlyLetters } = useFormFieldsSchema();

  const schema = useYupSchema({
    keywordA: onlyLetters,
    keywordB: onlyLetters,
    omitLetter: onlyLetters.max(1),
  });

  useEffect(() => {
    const keywordA = 'example';
    const keywordB = 'keyword';
    const omitLetter = 'q';

    const matrixA = keywordToMatrix(keywordA, omitLetter);
    const matrixB = keywordToMatrix(keywordB, omitLetter);

    form.setFieldsValue({
      keywordA,
      keywordB,
      matrixA: formatMatrix(matrixA),
      matrixB: formatMatrix(matrixB),
      variant: TwoSquareVariant.HORIZONTAL,
      omitLetter,
    });
  }, []);

  const onChange = useCallback(
    (changedFields: FieldData[]) => {
      const name = changedFields[0].name.toString();
      const { action, keywordA, keywordB, variant, omitLetter } = form.getFieldsValue();

      if (hasError(form)) {
        return;
      }

      const matrixA = keywordToMatrix(keywordA, omitLetter);
      const matrixB = keywordToMatrix(keywordB, omitLetter);

      if (name === 'omitLetter') {
        form.setFieldsValue({ matrixA: formatMatrix(matrixA), matrixB: formatMatrix(matrixB) });
      }

      if (name === 'keywordA') {
        form.setFieldsValue({ matrixA: formatMatrix(matrixA) });
      }

      if (name === 'keywordB') {
        form.setFieldsValue({ matrixB: formatMatrix(matrixB) });
      }

      const cipherFunction = {
        [ActionsEnum.ENCODE]: (text: string) => twoSquare.encode(text, matrixA, matrixB, variant),
        [ActionsEnum.DECODE]: (text: string) => twoSquare.decode(text, matrixA, matrixB, variant),
      }[action];

      setCipherFunction((prevState) => ({
        ...prevState,
        [action]: cipherFunction,
      }));
    },
    [form],
  );

  return (
    <TwoSquareWrapper>
      <CipherForm
        form={form}
        title="Two Square (Wheatstone) cipher"
        onChange={onChange}
        encode={cipherFunctions.encode}
        decode={cipherFunctions.decode}
        fieldsToShow={{
          alphabet: false,
        }}
      >
        <div className="row">
          <FormItem label="Variant" name="variant">
            <Select options={variantOptions} />
          </FormItem>
          <FormItem label="Letter to omit" name="omitLetter" schema={schema} required>
            <Input />
          </FormItem>
        </div>
        <div className="row">
          <FormItem label="Keyword A" name="keywordA" schema={schema} required>
            <Input />
          </FormItem>
          <FormItem label="Keyword B" name="keywordB" schema={schema} required>
            <Input />
          </FormItem>
        </div>
        <div className="row">
          <FormItem label="Matrix A" name="matrixA">
            <TextArea disabled autoSize />
          </FormItem>
          <FormItem label="Matrix B" name="matrixB">
            <TextArea disabled autoSize />
          </FormItem>
        </div>
      </CipherForm>
    </TwoSquareWrapper>
  );
};

export default TwoSquare;
