import { FC, useCallback, useState } from 'react';
import { CipherForm } from '@/components/UI/organisms';
import { FormItem } from '@/components/UI/molecules';
import { Input, InputNumber } from '@/components/UI/atoms';
import { ActionsEnum, CipherFunction, FieldData } from '@/types';
import { useForm, useFormFieldsSchema, useYupSchema } from '@/hooks';
import { knapsack } from '@/ciphers';
import { isSuperIncreasingSeq, isCoprime, hasError, seqToNumArr, arrSum, getCoprime } from '@/utils';
import { KnapsackWrapper } from './styles';
import { KnapsackForm } from './types';

const Knapsack: FC = () => {
  const [form] = useForm<KnapsackForm>();
  const [cipherFunctions, setCipherFunction] = useState<Record<ActionsEnum, CipherFunction | undefined>>({
    encode: undefined,
    decode: undefined,
  });
  const [disabled, setDisabled] = useState({
    [ActionsEnum.ENCODE]: false,
    [ActionsEnum.DECODE]: true,
  });
  const { string, number, required } = useFormFieldsSchema();

  const schema = useYupSchema({
    privateKey: string
      .test({
        test: (privateKey) => !!privateKey && isSuperIncreasingSeq(seqToNumArr(privateKey)),
        message: 'Private key should be super increasing sequence',
      })
      .matches(/^(?!,)(,?\d+)+$/g, 'Required format: 1234,123,12'),
    publicKey: string.matches(/^(?!,)(,?\d+)+$/g, 'Required format: 1234,123,12'),
    mValue: required(
      number
        .integer('Should be integer')
        .min(0, 'Should be greater than 0')
        .test({
          test: (mValue) => {
            const { action, privateKey } = form.getFieldsValue();

            if (action === ActionsEnum.DECODE) {
              return true;
            }

            return Number(mValue) > arrSum(seqToNumArr(privateKey));
          },
          message: 'Value should be greater than sum of private key numbers',
        }),
    ),
    nValue: required(
      number
        .integer('Should be integer')
        .min(0, 'Should be greater than 0')
        .test({
          test: (nValue) => {
            const mValue = Number(form.getFieldValue('mValue'));
            return isCoprime(mValue, Number(nValue));
          },
          message: 'Value should be coprime with m value',
        }),
    ),
  });

  const onChange = useCallback(
    (changedFields: FieldData[]) => {
      const name = changedFields[0].name.toString();
      const { action, publicKey, mValue, nValue, privateKey } = form.getFieldsValue();

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

      if (name === 'privateKey') {
        const newMValue = Math.floor(Math.random() * 100) + arrSum(seqToNumArr(privateKey));

        form.setFieldsValue({
          publicKey: knapsack.getPublicKey(seqToNumArr(privateKey), newMValue, nValue).join(','),
          mValue: newMValue,
          nValue: getCoprime(mValue),
        });
      }

      const cipherFunction = {
        [ActionsEnum.ENCODE]: (text: string) =>
          text &&
          knapsack
            .encode(
              text
                .split('')
                .map((char) => char.charCodeAt(0).toString(2))
                .join(''),
              seqToNumArr(publicKey),
            )
            .join(','),
        [ActionsEnum.DECODE]: (text: string) =>
          text &&
          knapsack
            .decode(seqToNumArr(text), mValue, nValue, seqToNumArr(privateKey))
            .map((item) => String.fromCharCode(parseInt(item, 2)))
            .join(''),
      }[action];

      setCipherFunction((prevState) => ({
        ...prevState,
        [action]: cipherFunction,
      }));
    },
    [form],
  );

  return (
    <KnapsackWrapper>
      <CipherForm
        form={form}
        title="Merkle-Hellman knapsack cryptosystem"
        onChange={onChange}
        encode={cipherFunctions.encode}
        decode={cipherFunctions.decode}
        fieldsToShow={{
          alphabet: false,
        }}
      >
        <FormItem
          label="Private key"
          name="privateKey"
          initialValue="2,7,11,21,42,89,180,354"
          schema={schema}
          required={false}
        >
          <Input disabled={disabled.encode} />
        </FormItem>
        <FormItem
          label="Public key"
          name="publicKey"
          initialValue="295,592,301,14,28,353,120,236"
          schema={schema}
          required={false}
        >
          <Input disabled={disabled.decode} />
        </FormItem>
        <FormItem label="M value" name="mValue" initialValue={881} schema={schema}>
          <InputNumber />
        </FormItem>
        <FormItem label="N value" name="nValue" initialValue={588} schema={schema}>
          <InputNumber />
        </FormItem>
      </CipherForm>
    </KnapsackWrapper>
  );
};

export default Knapsack;
