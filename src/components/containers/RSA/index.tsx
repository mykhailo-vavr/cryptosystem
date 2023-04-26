import { FC, useCallback, useState } from 'react';
import { CipherForm } from '@/components/UI/organisms';
import { FormItem } from '@/components/UI/molecules';
import { Button, InputNumber } from '@/components/UI/atoms';
import { ActionsEnum, CipherFunction, FieldData } from '@/types';
import { useForm, useFormFieldsSchema, useYupSchema } from '@/hooks';
import { rsa } from '@/ciphers';
import { hasError, seqToNumArr } from '@/utils';
import { RSAWrapper } from './styles';
import { RSAForm } from './types';

const RSA: FC = () => {
  const [form] = useForm<RSAForm>();
  const [cipherFunctions, setCipherFunction] = useState<Record<ActionsEnum, CipherFunction | undefined>>({
    encode: undefined,
    decode: undefined,
  });
  const [disabled, setDisabled] = useState({
    [ActionsEnum.ENCODE]: false,
    [ActionsEnum.DECODE]: true,
  });
  const { number } = useFormFieldsSchema();

  const schema = useYupSchema({
    nValue: number,
    eValue: number,
    dValue: number,
  });

  const onClick = useCallback(() => {
    const { publicKey, privateKey } = rsa.getKeys();

    form.setFieldsValue({
      nValue: publicKey.n,
      eValue: publicKey.e,
      dValue: privateKey.d,
    });
  }, [form]);

  const onChange = useCallback(
    (changedFields: FieldData[]) => {
      const name = changedFields[0].name.toString();
      const { action, nValue, eValue, dValue } = form.getFieldsValue();

      if (hasError(form)) {
        return;
      }

      if (name === 'action') {
        setDisabled((prevState) => {
          const newState = { ...prevState };

          Object.keys(prevState).forEach((key) => {
            newState[key as ActionsEnum] = key !== action;
          });

          return newState;
        });
      }

      const cipherFunction = {
        [ActionsEnum.ENCODE]: (text: string) => rsa.encode(text, nValue, eValue).join(','),
        [ActionsEnum.DECODE]: (text: string) => rsa.decode(seqToNumArr(text), nValue, dValue),
      }[action];

      setCipherFunction((prevState) => ({
        ...prevState,
        [action]: cipherFunction,
      }));
    },
    [form],
  );

  return (
    <RSAWrapper>
      <CipherForm
        form={form}
        title="RSA cryptosystem"
        onChange={onChange}
        encode={cipherFunctions.encode}
        decode={cipherFunctions.decode}
        fieldsToShow={{
          alphabet: false,
        }}
      >
        <div className="row">
          <FormItem label="N value" name="nValue" schema={schema} required={false}>
            <InputNumber min={0} />
          </FormItem>
          <FormItem label="E value" name="eValue" schema={schema} required={false}>
            <InputNumber min={0} disabled={disabled.encode} />
          </FormItem>
          <FormItem label="D value" name="dValue" schema={schema} required={false}>
            <InputNumber min={0} disabled={disabled.decode} />
          </FormItem>
        </div>
        <Button className="btn" onClick={onClick}>
          Generate keys
        </Button>
      </CipherForm>
    </RSAWrapper>
  );
};

export default RSA;
