import { FC, useCallback, useState } from 'react';
import { InputNumber } from '@/components/UI/atoms';
import { FormItem, RadioGroup } from '@/components/UI/molecules';
import { CipherForm } from '@/components/UI/organisms';
import { useForm } from '@/hooks';
import { trithemius } from '@/ciphers';
import { ActionsEnum, CipherFunction } from '@/types';
import { testTrithemius } from '@/tests';
import { keyTypeOptions } from './settings';
import { KeyTypeEnum, TrithemiusForm } from './types';

const Trithemius: FC = () => {
  const [form] = useForm<TrithemiusForm>();
  const [cipherFunctions, setCipherFunction] = useState<Record<ActionsEnum, CipherFunction | undefined>>({
    encode: undefined,
    decode: undefined,
  });
  const [disabled, setDisabled] = useState({
    [KeyTypeEnum.LINEAR]: false,
    [KeyTypeEnum.NONLINEAR]: true,
  });

  const onChange = useCallback(() => {
    const { action, keyType, coefA, coefB, coefC } = form.getFieldsValue();

    setDisabled((prevState) => {
      const newState = { ...prevState };

      Object.keys(prevState).forEach((key) => {
        newState[key as KeyTypeEnum] = key !== keyType;
      });

      return newState;
    });

    const cipherFunction = {
      [KeyTypeEnum.LINEAR]: (text: string, alphabet: string) =>
        trithemius[action].linear(text, Number(coefA), Number(coefB), alphabet),

      [KeyTypeEnum.NONLINEAR]: (text: string, alphabet: string) =>
        trithemius[action].nonlinear(text, Number(coefA), Number(coefB), Number(coefC), alphabet),
    }[keyType];

    setCipherFunction((prevState) => ({
      ...prevState,
      [action]: cipherFunction,
    }));
  }, [form]);

  return (
    <CipherForm
      title="Trithemius cipher"
      form={form}
      onChange={onChange}
      encode={cipherFunctions.encode}
      decode={cipherFunctions.decode}
      test={testTrithemius}
    >
      <FormItem name="keyType" label="Key type" initialValue={KeyTypeEnum.LINEAR}>
        <RadioGroup options={keyTypeOptions} />
      </FormItem>
      <div className="row">
        <FormItem name="coefA" label="Coef A">
          <InputNumber disabled={disabled.linear === disabled.nonlinear} />
        </FormItem>
        <FormItem name="coefB" label="Coef B">
          <InputNumber disabled={disabled.linear === disabled.nonlinear} />
        </FormItem>
        <FormItem name="coefC" label="Coef C">
          <InputNumber disabled={disabled.nonlinear} />
        </FormItem>
      </div>
    </CipherForm>
  );
};

export default Trithemius;
