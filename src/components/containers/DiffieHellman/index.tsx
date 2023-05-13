import { FC, useCallback } from 'react';
import { Form } from '@/components/UI/organisms';
import { useForm, useFormFieldsSchema, useYupSchema } from '@/hooks';
import { FormItem } from '@/components/UI/molecules';
import { Button, InputNumber } from '@/components/UI/atoms';
import { modPow } from '@/utils';

type DiffieHellmanForm = {
  gValue: number;
  pValue: number;
  aPrivateKey: number;
  bPrivateKey: number;
  aPublicKey: number;
  bPublicKey: number;
  sPrivateKey: number;
};

const DiffieHellman: FC = () => {
  const [form] = useForm<DiffieHellmanForm>();

  const { number } = useFormFieldsSchema();
  const schema = useYupSchema({
    gValue: number,
    pValue: number,
    aPrivateKey: number,
    bPrivateKey: number,
  });

  const generatePrivateKey = useCallback(() => {
    const { gValue, pValue, aPrivateKey, bPrivateKey } = form.getFieldsValue();

    const aPublicKey = modPow(gValue, aPrivateKey, pValue);
    const bPublicKey = modPow(gValue, bPrivateKey, pValue);

    form.setFieldsValue({
      aPublicKey,
      bPublicKey,
      sPrivateKey: modPow(bPublicKey, aPrivateKey, pValue),
    });
  }, [form]);

  return (
    <Form form={form} layout="vertical">
      <h1 style={{ marginBottom: 10 }}>Diffie-Hellman key exchange</h1>
      <div className="row">
        <FormItem label="P value" name="pValue" schema={schema} required={false}>
          <InputNumber min={0} />
        </FormItem>
        <FormItem label="G value" name="gValue" schema={schema} required={false}>
          <InputNumber min={0} />
        </FormItem>
      </div>
      <div className="row">
        <FormItem label="a Private key value" name="aPrivateKey" schema={schema} required={false}>
          <InputNumber min={0} />
        </FormItem>
        <FormItem label="b Private key value" name="bPrivateKey" schema={schema} required={false}>
          <InputNumber min={0} />
        </FormItem>
      </div>
      <div className="row">
        <FormItem label="a Public key value" name="aPublicKey" schema={schema} required={false}>
          <InputNumber disabled />
        </FormItem>
        <FormItem label="b Public key value" name="bPublicKey" schema={schema} required={false}>
          <InputNumber disabled />
        </FormItem>
      </div>
      <FormItem label="s Private key value" name="sPrivateKey">
        <InputNumber disabled />
      </FormItem>
      <Button onClick={generatePrivateKey}>Get private key S</Button>
    </Form>
  );
};

export default DiffieHellman;
