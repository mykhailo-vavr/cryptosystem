import { FC, useCallback } from 'react';
import caesar from '@/ciphers/caesar';
import { ActionsEnum, download, readFile } from '@/utils';
import { UploadChangeParam, RcFile } from 'antd/lib/upload';
import { Button, InputNumber, Select, Upload, TextArea } from '@/components/UI/atoms';
import { FormItem, RadioGroup } from '@/components/UI/molecules';
import { AttackResults, Form, FrequencyTable, TestResults } from '@/components/UI/organisms';
import { test } from '@/tests/caesar';
import { attack } from '@/attacks/caesar';
import { useToggleWrapper, useForm, useApp } from '@/hooks';
import { Wrapper, Title } from './styles';
import { CipherForm } from './types';
import { initialValues, actionOptions, saveAsOptions, selectOptions } from './settings';

const Caesar: FC = () => {
  const [form] = useForm<CipherForm>();
  const { modal } = useApp();
  const [toggleLoadingWrapper, loading] = useToggleWrapper();

  const beforeUpload = useCallback((file: RcFile) => file.size / 1024 ** 2 < 1, []);

  const openFile = toggleLoadingWrapper((info: UploadChangeParam) => {
    const file = info.file?.originFileObj;

    if (info.file.status !== 'done' || !file) {
      return;
    }

    readFile(file)
      .then((data) => {
        const { key, locale, action } = form.getFieldsValue();

        const actions = {
          [ActionsEnum.ENCODE]: (text: string) =>
            form.setFieldsValue({ cipher: caesar.encode(text, +key, locale), text }),
          [ActionsEnum.DECODE]: (text: string) =>
            form.setFieldsValue({ cipher: text, text: caesar.decode(text, +key, locale) }),
        };

        actions[action](String(data));
      })
      .catch(console.error);
  });

  const saveFile = toggleLoadingWrapper(() => {
    const { text, cipher, action, saveAs } = form.getFieldsValue();
    const data = action === ActionsEnum.ENCODE ? cipher : text;
    const name = `${action}d-${Date.now()}`;

    download(data, name, saveAs);
  });

  const onChange = useCallback(() => {
    const { text, key, cipher, locale, action } = form.getFieldsValue();

    const actions = {
      [ActionsEnum.ENCODE]: () => form.setFieldValue('cipher', caesar.encode(text, +key, locale)),
      [ActionsEnum.DECODE]: () => form.setFieldValue('text', caesar.decode(cipher, +key, locale)),
    };

    actions[action]();
  }, [form]);

  const showFrequencyTable = toggleLoadingWrapper(() => {
    const { text } = form.getFieldsValue();

    modal.info({
      content: <FrequencyTable text={text} />,
      icon: null,
      closable: true,
    });
  });

  const showTestResults = toggleLoadingWrapper(() => {
    const { encodingResults, decodingResults } = test();
    const results = [...encodingResults, ...decodingResults];

    modal.info({
      content: <TestResults results={results} />,
      icon: null,
      closable: true,
    });
  });

  const showAttackResults = toggleLoadingWrapper(() => {
    const { cipher } = form.getFieldsValue();
    const results = attack(cipher);

    modal.info({
      getContainer: 'Test',
      content: <AttackResults results={results} />,
      icon: null,
      closable: true,
    });
  });

  return (
    <Wrapper>
      <Title>Caesar cipher</Title>
      <Form layout="vertical" form={form} onFieldsChange={onChange} initialValues={initialValues} disabled={loading}>
        <FormItem name="action" label="Type">
          <RadioGroup options={actionOptions} />
        </FormItem>
        <FormItem name="text" label="Text">
          <TextArea rows={4} />
        </FormItem>
        <FormItem name="cipher" label="Encrypted text">
          <TextArea rows={4} />
        </FormItem>
        <div className="row">
          <FormItem name="key" label="Key">
            <InputNumber min={0} />
          </FormItem>
          <FormItem name="locale" label="Locale">
            <Select options={selectOptions} />
          </FormItem>
        </div>
        <FormItem name="saveAs" label="Save as">
          <RadioGroup options={saveAsOptions} />
        </FormItem>
      </Form>
      <div className="row">
        <Button onClick={saveFile}>Save file</Button>
        <Upload onChange={openFile} beforeUpload={beforeUpload} showUploadList={false} maxCount={1}>
          <Button disabled={loading}>Open file</Button>
        </Upload>
        <Button onClick={showFrequencyTable} disabled={loading}>
          Show frequency table
        </Button>
        <Button onClick={showTestResults} disabled={loading}>
          Test
        </Button>
        <Button onClick={showAttackResults} disabled={loading}>
          Attack
        </Button>
      </div>
    </Wrapper>
  );
};

export default Caesar;
