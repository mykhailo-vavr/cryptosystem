import { FC, useState } from 'react';
import { Input } from '@/components/UI/atoms';
import { FormItem } from '@/components/UI/molecules';
import { CipherForm } from '@/components/UI/organisms';
import { useAsyncWrapper, useForm, useFormFieldsSchema, useYupSchema } from '@/hooks';
import { vigenere } from '@/ciphers';
import { ActionsEnum, CipherFunction, FieldData } from '@/types';
import { testVigenere } from '@/tests';
import { VigenereForm } from './types';

const Vigenere: FC = () => {
  const [form] = useForm<VigenereForm>();
  const [cipherFunctions, setCipherFunction] = useState<Record<ActionsEnum, CipherFunction | undefined>>({
    encode: undefined,
    decode: undefined,
  });
  const asyncWrapper = useAsyncWrapper();

  const { string, getRequiredFieldSchema } = useFormFieldsSchema();

  const schema = useYupSchema({
    motto: getRequiredFieldSchema(
      string.test({
        test: (motto) => {
          if (!motto) {
            return false;
          }

          const { alphabet } = form.getFieldsValue();
          for (let i = 0; i < motto.length; i++) {
            if (alphabet.indexOf(motto[i]) === -1) {
              return false;
            }
          }

          return true;
        },
        message: 'The value contains forbidden character',
      }),
    ),
  });

  const onChange = asyncWrapper(async (changedFields: FieldData[]) => {
    const name = String(changedFields[0].name);
    const { action, motto } = form.getFieldsValue();

    if (name === 'motto') {
      try {
        await form.validateFields();
      } catch {
        return;
      }
    }

    const cipherFunction = (text: string, alphabet: string) => vigenere[action](text, String(motto), alphabet);

    setCipherFunction((prevState) => ({
      ...prevState,
      [action]: cipherFunction,
    }));
  });

  return (
    <CipherForm
      title="Vigenere cipher"
      form={form}
      onChange={onChange}
      encode={cipherFunctions.encode}
      decode={cipherFunctions.decode}
      test={testVigenere}
    >
      <div className="row">
        <FormItem name="motto" label="Motto" initialValue="crypto" schema={schema}>
          <Input />
        </FormItem>
      </div>
    </CipherForm>
  );
};

export default Vigenere;
