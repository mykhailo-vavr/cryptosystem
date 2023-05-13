import { FC, useCallback, useState } from 'react';
import caesar from '@/ciphers/caesar';
import { InputNumber } from '@/components/UI/atoms';
import { FormItem } from '@/components/UI/molecules';
import { CipherForm } from '@/components/UI/organisms';
import { useForm } from '@/hooks';
import { ActionsEnum, CipherFunction } from '@/types';
import { attackCaesar } from '@/attacks';
import { testCaesar } from '@/tests';
import { CaesarForm } from './types';

const Caesar: FC = () => {
  const [form] = useForm<CaesarForm>();
  const [cipherFunctions, setCipherFunction] = useState<Record<ActionsEnum, CipherFunction | undefined>>({
    encode: undefined,
    decode: undefined,
  });

  const onChange = useCallback(() => {
    const { key, action } = form.getFieldsValue();

    const cipherFunction = (text: string, alphabet: string) => caesar[action](text, key, alphabet);

    setCipherFunction((prevState) => ({
      ...prevState,
      [action]: cipherFunction,
    }));
  }, [form]);

  return (
    <CipherForm
      title="Caesar cipher"
      form={form}
      onChange={onChange}
      encode={cipherFunctions.encode}
      decode={cipherFunctions.decode}
      test={testCaesar}
      attack={attackCaesar}
    >
      <FormItem name="key" label="Key">
        <InputNumber min={0} />
      </FormItem>
    </CipherForm>
  );
};

export default Caesar;
